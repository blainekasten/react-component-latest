# react-component-latest
_HOC to allow components to self-update themselves on the client_

This is an example implementation to suggest how we should re-architect Uniform components at Hudl.

### Current Uniform Components

Every page loads a set of js/css umd modules from S3 which expose uniform components on the `window` object. This comes with a few drawbacks:

**Cons**

* Loading uniform js/css blocks rendering by quite a heavy load.
  * This can be optimized in many ways, one of which is to remove the additional network requests by allowing the components to be bundled into one.
  * This has a tradeoff cost of not being able to cache the js/css individually.

* Innability to OS packages that depend on Uniform
  * Non-hudl sites could not use video-interface if it implements any uniform components in it's current state.
  
* Unit testing requires mocking the components onto a fake window object.

**Pros**

The Uniform components were built this way so they could maintain a uniform look to hudl's website accross a multiverse structure. This is a hard problem and the current solution works for that. The goal of any implementation should not forsake that goal.


### Proposal

This is a prototype to show a concept of changing uniform components to being strictly an npm package while still keeping the uniform goal in mind. Let me explain how it works, then how it addresses the *cons* of the current approach.

*The Flow*

> 1 - install the uniform package via npm

```bash
$ npm i --save hudl-uniform-components@2.0.4
```

> 2 - Utilize components in yoyur code

```js
import { Button } from 'hudl-uniform-components';

render() {
  return <div><Button /></div>
}
```

> 3 - Make a build

```bash
gulp webpack:build
```

> 4 - Client loads up page

```
The client makes 1 request for the built css
The client makes 1 request for the built js
The client renders the webpage
```

> 5 - After render, the Uniform components validate their version against a server endpoint

> for arguments sake, let's say 2.1.0 is the latest.

```js
// This is internal to Uniform.

const response = await fetch('/validate-uniform-is-latest?version=2.0.4')
console.log(response); // responds with the following
/* {
  latest: false,
  updatedEndpointJS: 'sc.hudl.com/uniform210.js',
  updatedEndpointCSS: 'sc.hudl.com/uniform210.css'
} */

if (response.latest === true) return // end here. We are latest, no need to do anything
else {
  createScriptTag(response.udpdatedEndpointJS);
  createStyleTag(response.udpdatedEndpointCSS);
  reRenderSelfWithUpdatedComponent();
}
```

**Pros**

* Built into the client build so less network requests
  * like mentioned before, this could lose benefits of caching DLLs but improve first visit time
  * Builds are therefore deterministic
* We can then open source our software as they have a public API that is not depending on an exposed window object
* Consumers can unit test as node can locate these modules since they are installed through NPM.

**NEW PRO!**

The current implementation means uniform components can never have a breaking change. Which is possibly not future-proof when hudl redesigns.

This concept gives us the ability to make breaking changes. I'm imagining that the server only let's components self-update themselves for minor/patch changes. For Major changes, it would simply require updating the npm version, which then gets a proper QA round and is safe.


# Server Endpoint

The server endpoint will get some special logic to it also. I imagine it doing the following:

1. Comparing version with latest version to decide if it can safely update to a newer minor/patch change.
2. Flag clusters who are behind in major versions.

*Ideal workflow*
If a cluster is behind in a major version, it would be awesome if we could automate creating a PR on that cluster, changing to the latest major and assigning to the owning squad to fix any major breaking bugs and deploy.


## Potential Optimizations

1. Cache the new version so self-updating is uber fast


# See it in action!

This PR is to show this working in a very crude prototype way. If you look in [`/src/modules`](https://github.com/blainekasten/react-component-latest/tree/master/src/modules) you'll see two different versions of Uniform components, `2.0.4` and `2.1.0`

The server validates and says `2.1.0` is latest. It has an intentional delay on it so you can see the change happen.

You can find the [`Wrap`](https://github.com/blainekasten/react-component-latest/blob/master/src/modules/Uniform204/Wrap.js#L25-L73) component where all the logic is for self-updating.

