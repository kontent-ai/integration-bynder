[![Core integration][core-shield]](https://kontent.ai/integrations/bynder)
[![Gallery][gallery-shield]](https://kentico.github.io/kontent-custom-element-samples/gallery/)

![Last modified][last-commit]
[![Issues][issues-shield]][issues-url]
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![MIT License][license-shield]][license-url]

[![Stack Overflow][stack-shield]](https://stackoverflow.com/tags/kentico-kontent)
[![GitHub Discussions][discussion-shield]](https://github.com/Kentico/Home/discussions)

<p align="center">
<image src="docs/kk-logo.svg" alt="kontent logo" width="200" />
<image src="docs/bynder_logo.png" 
alt="commercetools logo" width="300">
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#demo">Demo</a> •
  <a href="#quick-deploy">Deploy</a> •
  <a href="#configuring-the-custom-element">Configuration</a> •
  <a href="#what-is-saved">Saved value</a> •
  <a href="#dat">DAT</a> •
  <a href="#contributors">Contributors</a> •
  <a href="#license">License</a> •
  <a href="#additional-resources">Resources</a>
</p>

This [custom element](https://docs.kontent.ai/tutorials/develop-apps/integrate/integrating-your-own-content-editing-features) extension for [Kontent by Kentico](https://kontent.ai) allows users to link selected assets from their [bynder](https://www.bynder.com/en/) asset library into their structured content.

## Features

- Editors can
  - Search for assets in their Bynder project
  - Link selected assets with their content items with preview directly inside of the Kontent editor
  

## Demo

![Demo Animation][product-demo]

## Quick Deploy

Netlify has made this easy. If you click the deploy button below, it will guide you through the process of deploying it to Netlify and leave you with a copy of the repository in your account as well.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Kentico/kontent-custom-element-bynder)


## Bynder configuration
You don't need to do anything special inside of your Bynder account in order to access the data through the custom element. Instead, you'll be prompted to login into your Bynder account to access your asset library (like seen in the demo animation above).

This element has been created by simply adding the official **Compact View** by Bynder. You can learn more about this integration component in [its official documentation](https://support.bynder.com/hc/en-us/articles/360014369640-Compact-View-overview-page) on Bynder's website.

> **⚠ WARNING: You have to have a Bynder account/credentials in order to use this extension** 

## Configuring the Custom Element
You will need to add the custom element to a content type filling in the hosted code URL and the following JSON parameters:

```json
{
  "bynderUrl": "https://<YOUR BYNDER URL>",
  "previewDerivative": "thumbnail",
  "webDerivative": "webImage"
}
```
All of the parameters are optional. 
If you don't provide bynder URL, the selector will prompt for it while logging in.
The derivative parameters can be used to alter which of the defined image derivatives will be used by the selector preview and output. More details in [the official documentation](https://support.bynder.com/hc/en-us/articles/360013871360#UUID-efe6ac1b-c1aa-62e5-f086-45cafead8b51).

## What is Saved

The custom element saves a list of asset objects that has been included into the content item through the element.
Example output:
```json
[
  {
    "id":"36AAB6D3-7DFE-41AB-A0B95A826D4C",
    "databaseId":"a8ad6713-8687-4356-b22f-d09334bdf7b2",
    "name": "test image",
    "description" : "test image description",
    "updatedAt":"2021-01-20T17:40:14Z",
    "bynderUrl":"https://support.getbynder.com/media/?mediaId=36AAB6D3-7DFE-41AB-A0B95A826D4C",
    "previewUrl":"https://support.bynder.com/4407064881426/test.jpg",
    "webUrl": "https://support.bynder.com/4407064881426/webimage-test.jpg",
    "files": [
      {"webImage" :  
        { "fileSize" : null, 
          "height": 399, 
          "url": "https://support.bynder.com/4407064881426/webimage-test.jpg", 
          "width": 800 },
      },
      {"thumbnail" : 
        { "fileSize" : null, 
          "height": 125, 
          "url": "https://support.bynder.com/4407064881426/thul-test.jpg", 
          "width": 250 },
      },
      {"transformBaseUrl" : 
        { "fileSize" : null, 
          "height": null, 
          "url": "https://datdemo.getbynder.com/transform/fb60f96f-ebf2-4a69-9ed8-8a828ef17283/Music", 
          "width": null }
      }
    ]}
]
```

# DAT
If you are using Bynder's **Dynamic Asset Transformation**, your public DAT URL will be included in the ``files`` property under ``transformBaseUrl`` (see example output above). You can use this URL to generate derivates you want on the fly. To learn more about DAT visit [Bynder's documentation](https://support.bynder.com/hc/en-us/articles/360018559260-Dynamic-Asset-Transformations-DAT).

## Contributors
We have collected notes on how to contribute to this project in [CONTRIBUTING.md](CONTRIBUTING.md).

<a href="https://github.com/Kentico/kontent-custom-element-bynder/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Kentico/kontent-custom-element-bynder" />
</a>

## License

[MIT](https://tldrlegal.com/license/mit-license)

## Additional Resources

- [Custom Element Gallery on github](https://kentico.github.io/kontent-custom-element-samples/gallery/)
- [Kontent's Integration documentation](https://docs.kontent.ai/tutorials/develop-apps/integrate/integrations-overview)
- [Custom Element documentation](https://docs.kontent.ai/tutorials/develop-apps/integrate/content-editing-extensions)
- [Custom Element API reference](https://docs.kontent.ai/reference/custom-elements-js-api)


[last-commit]: https://img.shields.io/github/last-commit/Kentico/kontent-custom-element-bynder?style=for-the-badge
[contributors-shield]: https://img.shields.io/github/contributors/Kentico/kontent-custom-element-bynder.svg?style=for-the-badge
[contributors-url]: https://github.com/Kentico/kontent-custom-element-bynder/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Kentico/kontent-custom-element-bynder.svg?style=for-the-badge
[forks-url]: https://github.com/Kentico/kontent-custom-element-bynder/network/members
[stars-shield]: https://img.shields.io/github/stars/Kentico/kontent-custom-element-bynder.svg?style=for-the-badge
[stars-url]: https://github.com/Kentico/kontent-custom-element-bynder/stargazers
[issues-shield]: https://img.shields.io/github/issues/Kentico/kontent-custom-element-bynder.svg?style=for-the-badge
[issues-url]: https://github.com/Kentico/kontent-custom-element-bynder/issues
[license-shield]: https://img.shields.io/github/license/Kentico/kontent-custom-element-bynder.svg?style=for-the-badge
[license-url]: https://github.com/Kentico/kontent-custom-element-bynder/blob/master/LICENSE
[core-shield]: https://img.shields.io/static/v1?label=&message=core%20integration&style=for-the-badge&color=FF5733
[gallery-shield]: https://img.shields.io/static/v1?label=&message=extension%20gallery&style=for-the-badge&color=51bce0
[stack-shield]: https://img.shields.io/badge/Stack%20Overflow-ASK%20NOW-FE7A16.svg?logo=stackoverflow&logoColor=white&style=for-the-badge
[discussion-shield]: https://img.shields.io/badge/GitHub-Discussions-FE7A16.svg?logo=github&style=for-the-badge
[product-demo]: docs/bynder.gif?raw=true
