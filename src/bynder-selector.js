var currentValue = null;
var isDisabled = true;
var config = null;

function updateDisabled(disabled) {
  const enabledElements = $(".selector").add(".remove");
  if (disabled) {
    enabledElements.hide();
  }
  else {
    enabledElements.show();  
  }
  
  isDisabled = disabled;
}

function updateSize() {
  const height = Math.ceil(Math.max($("html").height(), document.body.offsetHeight, 100));
  CustomElement.setHeight(height + 30);
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
      if (image) {
        imageTile($selected, image, remove);
      }
    }
  }
  updateSize();
}

function updateValue(images) {
  // Send updated value to Kentico (send null in case of the empty string => element will not meet required condition).
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
  const $tile = $(`<div class="asset-thumbnail"></div>`).appendTo($parent);
  const $tileInside = $(`<div class="asset-preview"></div>`).appendTo($tile);
  const $actions = $('<div class="asset-thumbnail__actions-pane"></div>').appendTo($tileInside);

  if (item.webUrl) {
    $(`<a class="action" title="Download" href="${item.webUrl}" target="_blank"><i class="icon-arrow-down-line"></i></a>`).appendTo($actions);
  }

  $(`<a class="remove" title="Remove"><i class="icon-times"></i></a>`).appendTo($actions).click(function () {remove(item.id);});

  if (item.previewUrl) {
    $(`<a href="${item.bynderUrl}" target="_blank"><img class="asset-thumbnail__image" src="${item.previewUrl}" /></a>`).appendTo($tileInside).on('load', updateSize);
  }

  else {
    $('<div class="noimage">No image available</div>').appendTo($tileInside);
  }

  $(`<div class="asset-thumbnail__bottom">${item.name}</div>`).appendTo($tileInside);
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
        switch (asset.type) {
          case 'IMAGE':
            // Avoid duplicates
            images = images.filter(image => image.id !== asset.id);
            images.push({
              id: asset.id,
              databaseId: asset.databaseId,
              name: asset.name,
              bynderUrl: asset.url,
              updatedAt: asset.updatedAt,
              description: asset.description,
              previewUrl: asset.derivatives[config.previewDerivative || 'thumbnail'],
              webUrl: asset.derivatives[config.webDerivative || "webImage"],
              files: asset.files
            });
            break;
        }
      }
      updateValue(images);
      updateSize();
    }
  })
}

$(document).ready(function () {
  CustomElement.init((element, _context) => {
    // Setup with initial value and disabled state
    config = element.config || {};
    setupSelector(element.value);
    updateDisabled(element.disabled);
    updateSize();
  });
});
