# Bynder image selector for Kentico Cloud

This repository contains source code of Bynder image selector custom element for Kentico Cloud

# Use

If you want to use Bynder image selector in your project in Kentico Cloud, follow these steps:

* In Kentico Cloud open Content models tab
* Open / create a content model to which you want to add Bynder selector
* Add **Custom element** content element
* Open configuration of the content element
* Use following URL as Hosted code URL (HTTPS): https://kentico.github.io/custom-element-samples/Bynder/image-selector.html
* Optionally provide the following JSON parameters for the custom element

```
{
  "bynderUrl": "<YOUR BYNDER URL>",
  "previewDerivative": "webimage",
  "webDerivative": "webimage"
}
```

If you don't provide bynder URL, the selector will prompt for it while logging in.

The derivative parameters can be used to alter which of the defined image derivatives will be used by the selector and output. By default the web image URL is used. 

# Installation

If you want to adjust the implementation, first download [Kentico Cloud Custom Elements Devkit](https://github.com/kentico/custom-element-devkit). This repository should be positioned within `/client/custom-elements` folder. For further instructions on devkit implementation, please refer to [Custom Element Devkit README](https://github.com/Kentico/custom-element-devkit/blob/master/readme.md).

## Get started

Prerequisites:
* Node.js
* git

```
git clone https://github.com/Kentico/custom-element-devkit.git
cd custom-element-devkit
git clone https://github.com/kenticomartinh/kc-bynder.git ./client/custom-elements/kc-bynder
npm install --save jquery
npm start -- -hw
```
Browse: https://localhost:3000/custom-elements/kc-bynder/wrap
