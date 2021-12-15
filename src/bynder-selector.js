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
  const assets = currentValue || [];
  const newAssets = assets.filter(asset => asset.id !== id);
  updateValue(newAssets);
}

function renderSelected(assets) {
  const $selected = $(".selected").empty();
  if (assets && assets.length) {
    for (var i = 0; i < assets.length; i++) {
      const asset = assets[i];
      if (asset) {
        assetTile($selected, asset, remove);
      }
    }
  }
  updateSize();
}

function updateValue(assets) {
  // Send updated value to Kentico (send null in case of the empty string => element will not meet required condition).
  if (!isDisabled) {
    if (assets && assets.length) {
      currentValue = assets;
      CustomElement.setValue(JSON.stringify(assets));
      renderSelected(assets);
    }
    else {
      currentValue = null;
      CustomElement.setValue(null);
      renderSelected(null);
    }
  }
}

function assetTile($parent, asset, remove) {
  const $tile = $(`<div class="asset-thumbnail"></div>`).appendTo($parent);
  const $tileInside = $(`<div class="asset-preview"></div>`).appendTo($tile);
  const $actions = $('<div class="asset-thumbnail__actions-pane"></div>').appendTo($tileInside);

  if (asset.webUrl) {
    $(`<a class="action" title="Download" href="${asset.webUrl}" target="_blank"><i class="icon-arrow-down-line"></i></a>`).appendTo($actions);
  }

  $(`<a class="remove" title="Remove"><i class="icon-times"></i></a>`).appendTo($actions).click(function () { remove(asset.id); });

  if (asset.previewUrl) {
    $(`<a href="${asset.bynderUrl}" target="_blank"><img class="asset-thumbnail__image" src="${asset.previewUrl}" /></a>`).appendTo($tileInside).on('load', updateSize);
  }

  else {
    $('<div class="noimage">No image available</div>').appendTo($tileInside);
  }

  $(`<div class="asset-thumbnail__bottom">${asset.name}</div>`).appendTo($tileInside);
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
    mode: config.selectionMode || "MultiSelect",
    assetTypes: config.assetTypes || ["image"],
    onSuccess: function (selectedAssets) {
      let assets = currentValue || [];
      for (const asset of selectedAssets) {
        // Avoid duplicates
        assets = assets.filter(item => item.id !== asset.id);
        assets.push({
          id: asset.id,
          databaseId: asset.databaseId,
          name: asset.name,
          bynderUrl: asset.url,
          originalUrl: asset.originalUrl,
          updatedAt: asset.updatedAt,
          description: asset.description,
          previewUrl: asset.derivatives[config.previewDerivative || 'thumbnail'],
          webUrl: asset.derivatives[config.webDerivative || "webImage"],
          files: asset.files,
        });
      }
      updateValue(assets);
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
