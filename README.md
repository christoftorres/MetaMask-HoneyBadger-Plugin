### Browser Support

Similar to the original MetaMask Snaps Beta, we currently only support **Chromium** browsers. Firefox and Opera may or may not work.

## Installing MetaMask Snaps Beta

To get started, you'll need to build our fork of the MetaMask Snaps Beta:

```bash
cd MetaMask-Snaps-Beta
yarn install
yarn start
```

`yarn start` will auto rebuild MetaMask on any file change. You can then [add your custom build to Chrome](https://metamask.zendesk.com/hc/en-us/articles/360016336611-Revert-Back-to-Earlier-Version-or-Add-Custom-Build-to-Chrome).

Chrome will auto-reload the extension when it detects a change, but this auto-reload is not perfectly reliable, so you may want to make a habit of navigating to `chrome://extensions` and clicking the reload icon next to your custom MetaMask:

![reload webextension](https://i.imgur.com/PAZW27F.png)

## Running HoneyBadger MetaMask Plugin

To help you build the HoneyBadger MetaMask plugin, you need to have [snaps-cli](https://github.com/MetaMask/snaps-cli) installed.

```bash
npm i -g snaps-cli
```

Now build and load the plugin:

```bash
cd HoneyBadger-Snap
mm-snap build
mm-snap serve
```

This should give you a message `Server listening on: http://localhost:8082`. That port, and the build target are configured in the `snap.config.json` file, or command line arguments. You can now visit that address in your browser, and if you have installed your Snap branch of MetaMask correctly, you should be able to:

1. Click the "Connect" button on the site.
2. Approve the site's permissions request (which includes the Snap installation!)
3. Approve the Snap's permissions request (which in this case is permission to show alerts to you, to send its message)
