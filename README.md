# Bynder image selector for Kentico Cloud

[![Stack Overflow](https://img.shields.io/badge/Stack%20Overflow-ASK%20NOW-FE7A16.svg?logo=stackoverflow&logoColor=white)](https://stackoverflow.com/tags/kentico-kontent)

This repository contains source code of Bynder image selector custom element for Kentico Kontent

## Setup

1. Deploy the code to a secure public host
    * See [deploying section](#Deploying) for a really quick option
1. Follow the instructions in the [Kentico Kontent documentation](https://docs.kontent.ai/tutorials/develop-apps/integrate/integrating-your-own-content-editing-features#a-3--displaying-a-custom-element-in-kentico-kontent) to add the element to a content model.
    * The `Hosted code URL` is where you deployed to in step 1
    * Configure the JSON parameters as detailed in the [JSON Parameters section](#json-parameters)

## JSON Parameters

All of the following JSON parameters are optional.

```json
{
  "bynderUrl": "<YOUR BYNDER URL>",
  "previewDerivative": "webimage",
  "webDerivative": "webimage"
}
```

If you don't provide bynder URL, the selector will prompt for it while logging in.

The derivative parameters can be used to alter which of the defined image derivatives will be used by the selector and output. By default the web image URL is used.

## Deploying

Netlify has made this easy. If you click the deploy button below, it will guide you through the process of deploying it to Netlify and leave you with a copy of the repository in your GitHub account as well.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Kentico/kontent-custom-element-sample-bynder)

## Contributors

Originally contributed by [@kenticomartinh](https://github.com/kenticomartinh)

![Analytics](https://kentico-ga-beacon.azurewebsites.net/api/UA-69014260-4/Kentico/cloud-custom-element-sample-bynder?pixel)
