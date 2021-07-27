var Generator = require('yeoman-generator');
const os = require('os')
const path = require('path')
const askName = require('inquirer-npm-name');
const mkdirp = require('mkdirp');
const yosay = require('yosay');
const chalk = require('chalk');

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
    
  }

  initializing() {
    this.props = {};
  }

  async prompting() {
    
    this.log(
      yosay(
        `Welcome to the ${chalk.red('graphql')} generator!`
      )
    );

    let props = await askName(
      {
        name: 'name',
        message: 'Your project name',
        default: path.basename(process.cwd())        
      },
      this
    )

    Object.assign(this.props, props);

    this.log("name is ", this.props.name);    
  }

  default() {
    
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        `Creating folder ${this.props.name}${os.EOL}`
      );
      mkdirp.sync(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
        
  }

  async writing() {

    this.fs.copy(
      this.templatePath('app', '**'),
      this.destinationPath()
    );

    const pkgJson = {
      name: this.props.name,
      version: "1.0.0"
    };
    
    this.packageJson.merge(pkgJson);
  }  
};