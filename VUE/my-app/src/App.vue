<template>
<div>
    <div id="app">

      <v-app id="inspire">
        <v-app id="inspire">
          <Navigation></Navigation>
          <Appbar></Appbar>
          <v-main>
            <v-container
              class="fill-height"
              fluid
            >
              <v-row
                align="center"
                justify="center"
              >
                <v-col class="text-center">
                  <v-tooltip left>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        :href="source"
                        icon
                        large
                        target="_blank"
                        v-on="on"
                      >
                        <v-icon large>mdi-code-tags</v-icon>
                      </v-btn>
                    </template>
                    <span>Source</span>
                  </v-tooltip>
                </v-col>
              </v-row>
            </v-container>
          </v-main>

          <!-- Footer -->
          <Footer>
          </Footer>
        </v-app>
      </v-app>
    </div>
</div>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import Appbar from './components/Appbar';

export default {
  name: 'App',


  components: {
     Navigation,
     Appbar,
     Footer
  },

  data: () => ({
    //
  }),
};
</script>
