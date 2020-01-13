## Front Matter

### Platform Support

- **Browser:** We currently only support **Chromium** browsers. Firefox and Opera may or may not work.
- **OS:** We currently only support ***nix** environments. Windows may or may not work.

We will eventually support the same browsers and operating systems as the production MetaMask extension.

### Community
You can check out the community Telegram channel here: https://t.me/mmsnaps

## Installing the MetaMask Snaps Beta

To get started, you'll need to clone and build our special fork of MetaMask:

```bash
git clone git@github.com:MetaMask/metamask-snaps-beta.git
cd metamask-snaps-beta
yarn install
yarn start
```

`yarn start` will auto rebuild MetaMask on any file change. You can then [add your custom build to Chrome](https://metamask.zendesk.com/hc/en-us/articles/360016336611-Revert-Back-to-Earlier-Version-or-Add-Custom-Build-to-Chrome).

Chrome will auto-reload the extension when it detects a change, but this auto-reload is not perfectly reliable, so you may want to make a habit of navigating to `chrome://extensions` and clicking the reload icon next to your custom MetaMask:

![reload webextension](https://i.imgur.com/PAZW27F.png)

## Running Snap Dapps

A Snap has a few parts:

- A normal web front-end
- A `package.json` that defines the Snap and its permissions
- A source file bundle pointed to by `package.json`

To help you build those bundled files, we have a utility we call [snaps-cli](https://github.com/MetaMask/snaps-cli).

We recommend you clone that repository, and install it globally with `npm` to start:

```bash
git clone https://github.com/MetaMask/snaps-cli
cd snaps-cli
npm i -g snaps-cli
```

This gives you some tools you can use right away. You can read them by running `mm-snap --help`.

Let's try out an example. You can find several interesting examples in [the examples folder](https://github.com/MetaMask/snaps-cli/tree/master/examples). We'll start with the simplest example, `hello-snaps`.

```bash
cd examples/hello-snaps
mm-snap build
mm-snap serve
```

This should give you a message `Server listening on: http://localhost:8081`. That port, and the build target are configured in the `snap.config.json` file, or command line arguments. You can now visit that address in your browser, and if you have installed your Snap branch of MetaMask correctly, you should be able to:

1. Click the "Connect" button on the site.
2. Approve the site's permissions request (which includes the Snap installation!)
3. Approve the Snap's permissions request (which in this case is permission to show alerts to you, to send its message)
4. Click the "Send Hello" button to receive a greeting from the Snap.

The permissions the Snap initially requests are configured in its [`package.json`, under the `web3Wallet` key](https://github.com/MetaMask/snaps-cli/blob/5e21e385f497db567c2545bd40aca00766febf1e/examples/hello-snaps/package.json#L19-L27). This permissions request uses the same schema as an [EIP 2255 permissions request](https://github.com/ethereum/EIPs/issues/2255). ([TypeScript definition](https://github.com/MetaMask/json-rpc-capabilities-middleware/blob/d5dac0eb71009c047c3e94b101e933dfb337ab94/src/%40types/index.d.ts#L40))

If you look closely at the [`index.html`](https://github.com/MetaMask/snaps-cli/blob/master/examples/hello-snaps/index.html) file, you'll see that interacting with the Snap required two basic API calls:

- [Request to connect to or install the Snap](https://github.com/MetaMask/metamask-snaps-beta/wiki/Sequence-Diagrams#connecting-to--installing-a-plugin)
- [Calling the "hello" method on the Snap](https://github.com/MetaMask/metamask-snaps-beta/wiki/Sequence-Diagrams#calling-a-plugin-method)

And if you look in the [`index.js`](https://github.com/MetaMask/snaps-cli/blob/master/examples/hello-snaps/index.js) file, you can see just how easy it is to add API methods to connected websites from within a Snap.

You can edit the [`index.js`](https://github.com/MetaMask/snaps-cli/blob/master/examples/hello-snaps/index.js) freely, and just run `mm-snap build` again to rebuild the bundle. (There is also a `mm-snap watch` command to rebuild automatically.) MetaMask itself doesn't yet auto-detect updates to the Snap, so you'll have to reinstall the Snap when the bundle changes.

For starting your own Snap, you might want to just copy one of the examples to start!

Because we're in early beta, we still introduce breaking changes to Snap-related functionality from time to time. [This page](https://github.com/MetaMask/metamask-snaps-beta/wiki/Breaking-Change-Migrations) maintains a history of all breaking changes, and what you have to do to keep up.