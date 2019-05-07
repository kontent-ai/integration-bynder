import '../../shared/custom-module.css';
import './bynder-selector.less';
import './bynder_logo.png';
import $ from 'jquery';

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
  const $titleText = $(".title").find(".text");
  const $clear = $(".clearbtn").hide();

  if (images && images.length) {
    $titleText.text('Selected images');
    $titleText.addClass('title--selected');
    $clear.show();

    for (var i = 0; i < images.length; i++) {
      const image = images[i];
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
  const $tile = $(`<div class="tile" title="${item.title}"></div>`)
    .appendTo($parent);

  const $actions = $('<div class="actions"></div>').appendTo($tile);

  if (item.webUrl) {
    $(`<a class="action download" title="Download" href="${item.webUrl}" target="_blank"><i class="icon-download"></i></a>`)
      .appendTo($actions);
  }

  $(`<div class="action remove" title="Remove"><i class="icon-remove"></i></div>`)
    .appendTo($actions)
    .click(function () {
      remove(item.id);
    });

  if (item.previewUrl) {
    const $preview = $('<div class="preview"></div>').appendTo($tile);

    $('<img draggable="false" class="thumbnail" />')
      .attr("src", item.previewUrl)
      .appendTo($preview)
      .on('load', updateSize);
  }
  else {
    $('<div class="noimage">No image available</div>')
      .appendTo($tile);
  }

  const $info = $(`<div class="info"></div>`).appendTo($tile)
  $(`<div class="name">${item.title}</div>`).appendTo($info);

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
    const selectedAssets = e.detail;

    var images = currentValue || [];

    for (var i = 0; i < selectedAssets.length; i++) {
      const asset = selectedAssets[i];
      switch (asset.type) {
        case 'image':
          // Avoid duplicates
          images = images.filter(image => image.id !== asset.id);
          images.push({
            id: asset.id,
            previewUrl: asset.thumbnails[config.previewDerivative || 'webimage'],
            webUrl: asset.thumbnails[config.webDerivative || 'webimage'],
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

function initCustomElement() {
  try {
    CustomElement.init((element, _context) => {
      // Setup with initial value and disabled state
      config = element.config || {};

      if (config.bynderUrl) {
        $('#bynder-compactview').attr('data-defaultEnvironment', config.bynderUrl);
      }
      $('body').append(
        '<script type="text/javascript" src="https://d8ejoa1fys2rk.cloudfront.net/modules/compactview/includes/js/client-1.4.0.min.js"></script>'
      );

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
