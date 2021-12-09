import Vue from 'vue';
import VueUi from '@vue/ui';
import VueI18n from 'vue-i18n';
import { upperFirst, camelCase } from 'lodash';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import { formatTs } from './helpers/utils.js';
import messages from './helpers/messages.json';
import numberFormats from './helpers/number.json';
import VueParticles from 'vue-particles';
import '@/style.scss';
import ToggleSwitch from 'vuejs-toggle-switch'
Vue.use(ToggleSwitch)
Vue.use(VueParticles);
Vue.use(VueUi);
Vue.use(VueI18n);
const i18n = new VueI18n({ locale: 'en', messages, numberFormats });
const Web3 = require('web3');
const requireComponent = require.context('@/components', true, /[\w-]+\.vue$/);
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')));
});

Vue.filter('formatTs', value => formatTs(value));

Vue.config.productionTip = false;

let web3;
web3 = new Web3(Web3.givenProvider);

let sendFContract;

// Time remaining in sale
function getRemainingTime() {
  let startTime;
  let endTime;
  let timeRemaining;

  // Get start time
  sendFContract.methods
    .START()
    .call()
    .then(function(start) {
      startTime = start;
    });

  sendFContract.methods.EMD.call().then(function(end) {
    endTime = end;
  });

  timeRemaining = endTime - startTime;

  console.log(timeRemaining);
}

// Function to claim once sale is done
function claim() {
  sendFContract.methods
    .claim()
    .send()

    .on('transactionHash', function(hash) {
      console.log(hash);
    })

    .on('confirmation', function(confirmationNr) {
      console.log(confirmationNr);
    })

    .on('receipt', function(receipt) {
      console.log(receipt);
    });
}

function connected() {
  const accountsAbrv = accounts[0].slice(0, 7);
  $('.connect_button').text('CONNECTED TO: ' + accountsAbrv + '...');
}

async function connect() {
  try {
    let web3;
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      console.log('window.eth');
      await ethereum.enable();
    } else if (window.web3) {
      wen3 = new Web3(window.web3.currentProvider);
      console.log('web3');
    }
  } catch (error) {
    // Catch any errors for any of the above operations.
    alert(`Failed to load web3, accounts, or contract. Check console for details.`);
    console.error(error);
  }

  accounts = await web3.eth.getAccounts();
  sendFContract = new web3.eth.Contract(
    MimirSaleABI,
    '0xb72027693a5B717B9e28Ea5E12eC59b67c944Df7',
    {
      from: accounts[0]
    }
  );

  console.log(accounts[0]);

  getRemainingTime();
  getEthUntilSoftCap();
  getUserProvidedEth();

  connected();
}


new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
