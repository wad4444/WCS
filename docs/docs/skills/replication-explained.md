---
sidebar_position: 3
---

# Replication Explained

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

Before we continue with *starting a skill*, it's really **important** to know some stuff 
about *wcs internals*, *especially how it handles* the **replicaton process**.

Every action *is launched on server*б and then gets *replicated* to client. Here is a simple *block scheme* that
represents it visually:

<ThemedImage
  alt="Docusaurus themed image"
  sources={{
    light: useBaseUrl('/img/themed-block-schemes/replication-block-white.png'),
    dark: useBaseUrl('/img/themed-block-schemes/replication-block-dark.png'),
  }}>
</ThemedImage>

## Action Requests

If a client makes an *action*, like `Start` or `End` for example, it sends a *request to the server* under the hood:

<ThemedImage
  alt="Docusaurus themed image"
  sources={{
    light: useBaseUrl('/img/themed-block-schemes/skill-start-block-white.png'),
    dark: useBaseUrl('/img/themed-block-schemes/skill-start-block-dark.png'),
  }}>
</ThemedImage>