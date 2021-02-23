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
<image src="docs/01-kk-logo-main.svg" alt="kontent logo" width="300" />
<image src="docs/bynder_logo.png" 
alt="commercetools logo" width="300">
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#demo">Demo</a> •
  <a href="#quick-deploy">Deploy</a> •
  <a href="#configuring-the-custom-element">Configuration</a> •
  <a href="#what-is-saved">Saved value</a> •
  <a href="#contributors">Contributors</a> •
  <a href="#license">License</a> •
  <a href="#additional-resources">Resources</a>
</p>

This [custom element](https://docs.kontent.ai/tutorials/develop-apps/integrate/integrating-your-own-content-editing-features) extension for [Kentico Kontent](https://kontent.ai) allows users to link selected assets from their [bynder](https://www.bynder.com/en/) asset library into their structured content.

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
  "bynderUrl": "<YOUR BYNDER URL>",
  "previewDerivative": "webimage",
  "webDerivative": "webimage"
}
```
All of the parameters are optional. 
If you don't provide bynder URL, the selector will prompt for it while logging in.
The derivative parameters can be used to alter which of the defined image derivatives will be used by the selector and output. By default the web image URL is used - others might be, e.g. thumbnail, or mini. More details in [the official documentation](https://support.bynder.com/hc/en-us/articles/360013871360#UUID-efe6ac1b-c1aa-62e5-f086-45cafead8b51).

## What is Saved

The custom element saves a list of asset objects that has been included into the content item through the element.
Example output:
```json
[
  {
    "id":"36AAB6D3-7DFE-41AB-A0B95A826D4Ctest",
    "previewUrl":"https://d2csxpduxe849s.cloudfront.net/media/test.png",
    "webUrl":"https://d2csxpduxe849s.cloudfront.net/media/test.png",
    "title":"TestImage"
  }
]
```

## Live site implementation sample

If you want to see live site example of Bynder images displayed on the live site, browse to a [deployed sample site](https://kentico-cloud-sample-app-react-bynder.surge.sh/en-us/articles/cf106f4e-30a4-42ef-b313-b8ea3fd3e5c5).

See source code of the sample site implementation [here](https://github.com/Kentico/kontent-sample-app-react/commit/b4ae153a1acde2feb10b865dbf338eaca84f3c35)


## Contributors
We have collected notes on how to contribute to this project in [CONTRIBUTING.md](CONTRIBUTING.md).

Originally created by [@kenticomartinh](https://github.com/kenticomartinh)

<a href="https://github.com/Kentico/kontent-custom-element-bynder/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Kentico/kontent-custom-element-bynder" />
</a>

## License

[MIT](https://tldrlegal.com/license/mit-license)

## Additional Resources

- [Custom Element Gallery on github](https://kentico.github.io/kontent-custom-element-samples/gallery/)
- [Kentico Kontent's Integration documentation](https://docs.kontent.ai/tutorials/develop-apps/integrate/integrations-overview)
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
[product-demo]: docs/demo.gif?raw=true
