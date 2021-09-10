var currentValue = null;
var isDisabled = true;
var config = null;

function updateDisabled(disabled) {
  const elements = $(".selector").add(".remove").add(".spacer");
  if (disabled) {
    elements.hide();
  } else {
    elements.show();
  }
  isDisabled = disabled;
  updateSize();
}

function remove(id) {
  const images = currentValue || [];
  const newImages = images.filter(image => image.id !== id);

  updateValue(newImages);
}

function renderSelected(images) {
  const $selected = $(".selected").empty();
  
  if (images && images.length) {
    for (var i = 0; i < images.length; i++) {
      const image = images[i];
      if (image && image.id && image.title) {
        imageTile($selected, image, remove);
      }
    }
  }
  else {
    $titleText.removeClass('title--selected')
  }
  updateSize();
}

function updateValue(images) {
  // Send updated value to Kentico (send null in case of the empty string => element will not meet required condition).
  console.log(images);
  if (!isDisabled) {
    if (images && images.length) {
      currentValue = images;
      CustomElement.setValue(JSON.stringify(images));
      renderSelected(images);
    }
    else {
      currentValue = null;
      CustomElement.setValue(null);
      renderSelected(null);
    }
  }
}

function imageTile($parent, item, remove) {
  const $tile = $(`<div class="asset-thumbnail"></div>`)
    .appendTo($parent);

  const $tileInside = $(`<div class="asset-preview"></div>`).appendTo($tile);
  
  const $actions = $('<div class="asset-thumbnail__actions-pane"></div>').appendTo($tileInside);

  if (item.webUrl) {
    $(`<a class="action" title="Download" href="${item.webUrl}" target="_blank"><i class="icon-arrow-down-line"></i></a>`)
      .appendTo($actions);
  }

  $(`<a class="remove" title="Remove"><i class="icon-times"></i></a>`)
    .appendTo($actions)
    .click(function () {
      remove(item.id);
    });

  if (item.previewUrl) {
    $(`<a href="${item.bynderUrl}" target="_blank"><img class="asset-thumbnail__image" src="${item.previewUrl}" /></a>`)
      .appendTo($tileInside)
      .on('load', updateSize);
  }
  else {
    $('<div class="noimage">No image available</div>')
      .appendTo($tileInside);
  }

  $(`<div class="asset-thumbnail__bottom">${item.title}</div>`).appendTo($tileInside);
  
  updateSize();
}

function setupSelector(value) {  
  if (value) {
    currentValue = JSON.parse(value);
    renderSelected(currentValue);
  }
  else {
    renderSelected(null);
  }
}

function openCompactView() {
  CustomElement.setHeight(800);
  
  BynderCompactView.open({
    defaultDomain: config.bynderUrl,
    mode: "MultiSelect",
    assetTypes: ["image"],
    onSuccess: function (selectedAssets) {
      let images = currentValue || [];
      for (const asset of selectedAssets) {
        console.log(asset);
        switch (asset.type) {
          case 'IMAGE':
            // Avoid duplicates
            images = images.filter(image => image.id !== asset.id);
            images.push({
              id: asset.id,
              previewUrl: asset.derivatives[config.previewDerivative || 'thumbnail'],
              webUrl: asset.derivatives[config.webDerivative || 'webImage'],
              title: asset.name,
              bynderUrl: asset.url,
              updatedAt: asset.updatedAt,
              description: asset.description
            });
            break;
        }
      }
      updateSize();
      updateValue(images);
    }
  })
}

function updateSize() {
  // Update the custom element height in the Kentico UI.
  const height = document.body.offsetHeight + 10;
  CustomElement.setHeight(height);
}

function initCustomElement() {
 
  try {
    CustomElement.init((element, _context) => {
      // Setup with initial value and disabled state
      config = element.config || {};

      updateDisabled(element.disabled);
      setupSelector(element.value);
      updateSize();
    });

    // React on disabled changed (e.g. when publishing the item)
    CustomElement.onDisabledChanged(updateDisabled);
  } catch (err) {
    // Initialization with Kentico Custom element API failed (page displayed outside of the Kentico UI)
    console.error(err);
    setupSelector();
    updateDisabled(true);
  }
}

initCustomElement();
