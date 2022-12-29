const upload_Md = require('./git-push.js');
const createNew_Md = require('./newCreate.js')
const shell = require('shelljs')
const queryString = require('query-string');
const axios = require("axios").default;
const axiosRetry = require('axios-retry');

setTimeout(() => {
  console.log('force exit');
  process.exit(0)
}, 30 * 60 * 1000);

axiosRetry(axios, {
  retries: 100,
  retryDelay: (retryCount) => {
    // console.log(`retry attempt: ${retryCount}`);
    return 3000 || retryCount * 1000;
  },
  retryCondition: (error) => {
    return error.response.status === 502;
  },
});


const listProject = `https://20ccd4a5-e8ae-46a5-b0e9-5685a5059572@api.glitch.com/git/steel-wool-frown|https://20ccd4a5-e8ae-46a5-b0e9-5685a5059572@api.glitch.com/git/giddy-copper-pediatrician|https://20ccd4a5-e8ae-46a5-b0e9-5685a5059572@api.glitch.com/git/pleasant-icy-huckleberry|https://20ccd4a5-e8ae-46a5-b0e9-5685a5059572@api.glitch.com/git/amenable-abrasive-mayonnaise|https://20ccd4a5-e8ae-46a5-b0e9-5685a5059572@api.glitch.com/git/water-marbled-skirt|https://20ccd4a5-e8ae-46a5-b0e9-5685a5059572@api.glitch.com/git/sixth-cottony-zephyr|https://20ccd4a5-e8ae-46a5-b0e9-5685a5059572@api.glitch.com/git/jolly-pyrite-spectroscope|https://20ccd4a5-e8ae-46a5-b0e9-5685a5059572@api.glitch.com/git/sassy-subsequent-profit|https://20ccd4a5-e8ae-46a5-b0e9-5685a5059572@api.glitch.com/git/flax-frill-crystal|https://20ccd4a5-e8ae-46a5-b0e9-5685a5059572@api.glitch.com/git/boundless-grey-chance|https://20ccd4a5-e8ae-46a5-b0e9-5685a5059572@api.glitch.com/git/excessive-conscious-coneflower|https://20ccd4a5-e8ae-46a5-b0e9-5685a5059572@api.glitch.com/git/gossamer-sumptuous-ocicat|https://20ccd4a5-e8ae-46a5-b0e9-5685a5059572@api.glitch.com/git/victorious-brash-shake|https://20ccd4a5-e8ae-46a5-b0e9-5685a5059572@api.glitch.com/git/plant-planet-birthday`.trim().split('|');

const delay = t => {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(true);
    }, t);
  });
};

(async () => {
  try {
    let accountNumber = 0;

    for (let i = 0; i < listProject.length; i++) {
      accountNumber = i + 1;
      try {
        const nameProject = listProject[i].split('/')[4]
        console.log('deploy', nameProject);
        createNew_Md.run(nameProject)
        await upload_Md.upload2Git(listProject[i].trim(), 'code4Delpoy');
        console.log(`account ${accountNumber} upload success ^_^`);

        axios
          .get(`https://eager-profuse-python.glitch.me/deploy?${queryString.stringify({
            email: listProject[i].trim() + ' true'
          })}`)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
            } else {
              console.log('Loi');
            }
          });

        if (i + 1 < listProject.length) await delay(1.8 * 60 * 1000);
      } catch (error) {
        console.log(`account ${accountNumber} upload fail ^_^`);
        axios
          .get(`https://eager-profuse-python.glitch.me/deploy?${queryString.stringify({
            email: listProject[i].trim() + ' false'
          })}`)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
            } else {
              console.log('Loi');
            }
          });
      }

      if (process.cwd().includes('code4Delpoy')) shell.cd('../', { silent: true });

    }

    await delay(20000)
    console.log('Done! exit')
    process.exit(0)

  } catch (err) {
    console.log(`error: ${err}`);
  }
})();