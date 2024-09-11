const config = {
  apiKey: "AIzaSyDxZ_S3qjfGQG1fAv5bsDXt4sK9Du4uRmM",
  authDomain: "criclabs-challenge.firebaseapp.com",
  projectId: "criclabs-challenge",
  storageBucket: "criclabs-challenge.appspot.com",
  messagingSenderId: "277352572172",
  appId: "1:277352572172:web:c118020730961e39e8d529",
  measurementId: "G-QN9039XCMP",
};

// When deployed, there are quotes that need to be stripped
Object.keys(config).forEach((key) => {
  const configValue = config[key] + "";
  if (configValue.charAt(0) === '"') {
    config[key] = configValue.substring(1, configValue.length - 1);
  }
});

export const firebaseConfig = config;
