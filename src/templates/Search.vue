<template>
    <layout>
        <div v-if="results === null">Loading...</div>
        <h2 v-else-if="results.length === 0">{{ $context.noResultsHeader }}</h2>
        <div v-else>
            <h2>{{ $context.foundResultsHeader }}</h2>
            <div v-for="result in results" :key="result.id">
                <g-link :to="result.url">{{ result.title }}</g-link>
            </div>
        </div>
    </layout>
</template>

<script>
import {request} from 'graphql-request';

export default {
    data: function() {
        return {
            backendUrl: process.env.GRIDSOME_API_BACKEND_URL,
            results: null
        };
    },
    async mounted() {
        if (!this.$route || !this.$route.query || !this.$route.query.q || !this.$route.query.q.length) {
            this.results = [];
            return;
        }

        const data = await request(this.backendUrl + '/umbraco/graphql', `
        query ($query: String!) {
            umbraco {
                examine {
                    external {
                        search(query:$query) {
                            results {
                                _umbraco_key
                            }
                        }
                    }
                }
            }
        }`, {query:this.$route.query.q});

        const allPages = ((this.$static || {}).allPage || []).filter(x => x && x.context && x.context._id && x.context._name);
        let pageMap = {};
        for (let i = 0; i < allPages.length; i++) {
            const page = allPages[i];
            pageMap[page.context._id] = { id: page.context._id, url: page.path, title: page.context.title || page.context._name };
        }

        const searchResults = (((((data || {}).umbraco || {}).examine || {}).external || {}).search || {}).results || [];
        let results = [];
        for (let i = 0; i < searchResults.length; i++) {
            const page = pageMap[searchResults[i]._umbraco_key];
            if (page) results.push(page);
        }

        this.results = results;
    }
}
</script>

<static-query>
query {
  allPage {
    path
    context
  }
}
</static-query>