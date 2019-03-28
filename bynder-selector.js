import '../../shared/custom-module.css';
import './bynder-selector.less';
import './bynder_logo.png';
import $ from 'jquery';

var currentValue = null;
var isDisabled = true;
var config = null;

function updateDisabled(disabled) {
  var elements = $(".selector").add(".remove").add(".spacer");
  if (disabled) {
    elements.hide();
  } else {
    elements.show();
  }
  isDisabled = disabled;
  updateSize();
}

function remove(id) {
  var images = currentValue || [];
  var newImages = images.filter(image => image.id !== id);

  updateValue(newImages);
}

function renderSelected(images) {
  var $selected = $(".selected").empty();
  var $titleText = $(".title").find(".text");
  var $clear = $(".clearbtn").hide();

  if (images && images.length) {
    $titleText.text('Selected images');
    $titleText.addClass('title--selected');
    $clear.show();

    for (var i = 0; i < images.length; i++) {
      var image = images[i];
      if (image && image.id && image.title) {
        imageTile($selected, image, remove);
      }
    }
  }
  else {
    $titleText.text('No image selected');
    $titleText.removeClass('title--selected')
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
  var $tile = $(`<div class="tile" title="${item.title}"></div>`)
    .appendTo($parent);

  var $actions = $('<div class="actions"></div>').appendTo($tile);

  var $remove = $(`<div class="action remove" title="Remove"><i class="icon-remove"></i></div>`)
    .appendTo($actions)
    .click(function () {
      remove(item.id);
    });

  if (item.previewUrl) {
    var $preview = $('<div class="preview"></div>').appendTo($tile);

    $('<img draggable="false" class="thumbnail" />')
      .attr("src", item.previewUrl)
      .appendTo($preview)
      .on('load', updateSize);
  }
  else {
    $('<div class="noimage">No image available</div>')
      .appendTo($tile);
  }

  var $info = $(`<div class="info"></div>`).appendTo($tile)
  var $title = $(`<div class="name">${item.title}</div>`).appendTo($info);

  updateSize();
}

function setupSelector(value) {
  $('.clear').click(function() {
    updateValue(null);
  });

  if (value) {
    currentValue = JSON.parse(value);
    renderSelected(currentValue);
  }
  else {
    renderSelected(null);
  }

  window.addEventListener('resize', updateSize);

  document.addEventListener('BynderAddMedia', function (e) {
    // The selected assets are found in the event detail property
    var selectedAssets = e.detail;

    var images = currentValue || [];

    var asset;
    for (var i = 0; i < selectedAssets.length; i++) {
      asset = selectedAssets[i];
      switch (asset.type) {
        case 'image':
          // Avoid duplicates
          images = images.filter(image => image.id !== asset.id);
          images.push({
            id: asset.id,
            previewUrl: asset.thumbnails['webimage'],
            title: asset.name,
          });
          break;
      }
    }

    updateValue(images);
  });
}

function updateSize() {
  // Update the custom element height in the Kentico UI.
  const height = isDisabled ?
    Math.ceil($("html").height()) :
    window.screen.height - 300;

  CustomElement.setHeight(height);
}

function validateConfig() {
}

function initCustomElement() {
  try {
    CustomElement.init((element, _context) => {
      // Setup with initial value and disabled state
      config = element.config || {};
      validateConfig();
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
