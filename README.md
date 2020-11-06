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

## Saved Value
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

## Deploying

Netlify has made this easy. If you click the deploy button below, it will guide you through the process of deploying it to Netlify and leave you with a copy of the repository in your GitHub account as well.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Kentico/kontent-custom-element-sample-bynder)

## Contributors

Originally contributed by [@kenticomartinh](https://github.com/kenticomartinh)

![Analytics](https://kentico-ga-beacon.azurewebsites.net/api/UA-69014260-4/Kentico/cloud-custom-element-sample-bynder?pixel)
