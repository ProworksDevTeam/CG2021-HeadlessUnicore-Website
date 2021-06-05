<template>
  <div class="layout">
		<!-- Wrapper -->
    <div id="wrapper">
      <!-- Main -->
      <div id="main">
        <div class="inner">
          <!-- Banner -->
          <section id="banner">
            <div class="content">
              <header>
                <h1>{{ $context._name }}</h1>
              </header>
            </div>
          </section>

          <slot />
        </div>
      </div>

      <!-- Sidebar -->
      <div id="sidebar">
        <div class="inner">

          <!-- Search -->
          <section v-if="searchPageUrl" id="search" class="alt">
            <form method="get" :action="searchPageUrl">
              <input type="text" name="q" id="q" placeholder="Search" />
            </form>
          </section>

          <!-- Menu -->
          <nav id="menu">
            <header class="major">
              <h2>Menu</h2>
            </header>
            <ul>
              <li v-for="node in menuNodes" :key="node.path"><a :href="node.path">{{ node.title }}</a></li>
            </ul>
          </nav>

          <!-- Footer -->
          <footer id="footer">
            <p class="copyright">&copy;{{ copyrightYear }} ProWorks. All rights reserved. Demo Images: <a href="https://unsplash.com">Unsplash</a>. Design: <a href="https://html5up.net">HTML5 UP</a>.</p>
            <p>Generated on {{ renderDateTime }}</p>
          </footer>

        </div>
      </div>
    </div>

<!--
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
-->
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      renderDateTime: new Date(),
      searchText: ''
    }
  },
  metaInfo() {
    return {
      title: this.$context._name,
      meta: [
        {charset:'utf-8'},
        {'http-equiv':'X-UA-Compatible', content:'IE=edge,chrome=1'},
        {name:'description', content:''},
        {name:'viewport', content:'width=device-width'}
      ],
      link: [
        { rel:'stylesheet', type:'text/css', href:'/assets/css/main.css' }
      ],
      script: [
        { src:'/assets/js/jquery.min.js' },
        { src:'/assets/js/browser.min.js' },
        { src:'/assets/js/breakpoints.min.js', defer:'defer' },
        { src:'/assets/js/util.js', defer:'defer' },
        { src:'/assets/js/main.js', defer:'defer' }
      ]
    }
  },
  computed: {
    searchPageUrl: function() {
      var node = this.$static || {};

      node = node.cms || {};
      node = node.umbraco || {};
      node = node.content || {};
      node = node.byType || {};
      node = node.siteSettings || {};
      node = node.items || [];
      node = (node.length ? node[0] : null) || {};
      node = node.searchPage || {};

      return node._url;
    },
    copyrightYear: function() {
      return new Date().getFullYear();
    },
    menuNodes: function() {
      var nodes = [];
      var node = this.$static || {};
      node = node.allPage || [];

      for (var i = 0; i < node.length; i++) {
        const n = node[i];
        if (n.path && n.context && n.context.showInMenu) {
          nodes.push({path:n.path, title:n.context.title || n.context._name});
        }
      }

      return nodes;
    }
  }
}
</script>

<static-query>
query {
  allPage {
    path
    context
  }
  metadata {
    siteName
  }
  cms {
    umbraco {
      content {
        byType {
          siteSettings {
            items {
              searchPage {
                _url
              }
            }
          }
        }
      }
    }
  }
}
</static-query>
