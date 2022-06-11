import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin"


export default  {
    //other rules
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
    }

}