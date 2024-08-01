# Displays Controle Online

npx --yes react-native@latest init <projectName> --version "latest"
npm i -g @react-native-community/cli
npm i -g metro
npm i  expo

## Start Dev
npm start

# GERAR KEYSTORE 
keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000


## Build for android
cd android
./gradlew assembleRelease