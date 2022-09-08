import {
  Tree,
  formatFiles,
  ProjectConfiguration,
  readProjectConfiguration,
  generateFiles,
  joinPathFragments,
  updateJson,
  updateProjectConfiguration,
  installPackagesTask,
} from '@nrwl/devkit';
import { GeneratorOptions } from './models';
import {
  E2eTestRunner,
  UnitTestRunner,
} from '@nrwl/angular/src/utils/test-runners';
import { applicationGenerator } from '@nrwl/angular/generators';

/**
 *
 * @param name {string} App Name
 * @param tree {Tree} Tree Generator Context
 * @returns {Promise}
 *
 * Remove the environment files by default.
 */
const cleanupEnvironments = async (name: string, tree: Tree): Promise<void> => {
  const config: ProjectConfiguration = readProjectConfiguration(tree, name);
  const root = config.root;
  tree.children(`${root}/src/environments`).forEach((filename) => {
    if (tree.exists(`${root}/src/environments/${filename}`)) {
      tree.delete(`${root}/src/environments/${filename}`);
    }
  });
};

/**
 *
 * @param name {string} App Name
 * @param tree {Tree} Tree Generator Context
 * @returns {Promise}
 *
 * Removes welcome component files.
 */
const cleanupWelcome = async (name: string, tree: Tree): Promise<void> => {
  const config: ProjectConfiguration = readProjectConfiguration(tree, name);
  const root = config.root;
  if (tree.exists(`${root}/src/app/nx-welcome.component.ts`)) {
    tree.delete(`${root}/src/app/nx-welcome.component.ts`);
  }
};

/**
 *
 * @param name {string} App Name
 * @param tree {Tree} Tree Generator Context
 * @returns {Promise}
 *
 * Remove the default app files.
 */
const cleanupAppFiles = async (name: string, tree: Tree): Promise<void> => {
  const config: ProjectConfiguration = readProjectConfiguration(tree, name);
  const root = config.root;
  tree.children(`${root}/src/app`).forEach((filename) => {
    if (tree.exists(`${root}/src/app/${filename}`)) {
      tree.delete(`${root}/src/app/${filename}`);
    }
  });
};

/**
 *
 * @param schema {GeneratorOptions} Schema Generator Model
 * @param tree {Tree} Tree Generator Context
 * @param appName {string} App Name
 *
 * Add the new environment files with the schema options.
 */
const addEnvironmentFiles = (
  schema: GeneratorOptions,
  tree: Tree,
  appName: string
) => {
  const config: ProjectConfiguration = readProjectConfiguration(tree, appName);
  const root = config.root;

  generateFiles(
    tree,
    joinPathFragments(__dirname, './files/environments'),
    `${root}/src/environments`,
    {
      tmpl: '',
      apiUrlDev: schema.apiUrlDev,
      apiUrlStg: schema.apiUrlStg,
      apiUrlProd: schema.apiUrlProd,
    }
  );
};

/**
 *
 * @param val {string} String to change
 * @returns {string}
 *
 * Change string value to Uppercase Value.
 */
function uppercase(val: string): string {
  return val.toUpperCase().replace(/\s+/g, '').replace(/-/g, '');
}

/**
 *
 * @param schema {GeneratorOptions} Schema Generator Model
 * @param tree {Tree} Tree Generator Context
 * @param appName {string} App Name
 *
 * Add the new App files with the schema options and the Kanzi Core scalffolding
 */
const addAppFiles = (schema: GeneratorOptions, tree: Tree, appName: string) => {
  const config: ProjectConfiguration = readProjectConfiguration(tree, appName);
  const root = config.root;
  generateFiles(
    tree,
    joinPathFragments(__dirname, './files/app-files'),
    `${root}/src/app`,
    {
      uppercase,
      tmpl: '',
      appName: appName,
      appModules: schema.moduleList,
    }
  );
};

/**
 *
 * @param tree {Tree} Tree Generator Context
 * @param appName {string} App Name
 *
 * Adds Asset Files with the template files.
 */
const addNewAssetFiles = (tree: Tree, appName: string) => {
  const config: ProjectConfiguration = readProjectConfiguration(tree, appName);
  const root = config.root;
  generateFiles(
    tree,
    joinPathFragments(__dirname, './files/assets'),
    `${root}/src/assets`,
    {
      tmpl: '',
    }
  );
};

/**
 *
 * @param name {string} App Name
 * @param tree {Tree} Tree Generator Context
 * @returns {Promise}
 *
 * Remove the styles.scss files.
 */
const cleanupRootFiles = async (name: string, tree: Tree): Promise<void> => {
  const config: ProjectConfiguration = readProjectConfiguration(tree, name);
  const root = config.root;
  if (tree.exists(`${root}/src/styles.scss`)) {
    tree.delete(`${root}/src/styles.scss`);
  }
};

/**
 *
 * @param schema {GeneratorOptions} Schema Generator Model
 * @param tree {Tree} Tree Generator Context
 * @param appName {string} App Name
 *
 * Add the new Style files with the schema options.
 */
const addRootFiles = (
  schema: GeneratorOptions,
  tree: Tree,
  appName: string
) => {
  const config: ProjectConfiguration = readProjectConfiguration(tree, appName);
  const root = config.root;
  generateFiles(
    tree,
    joinPathFragments(__dirname, './files/root-files'),
    `${root}/src`,
    {
      tmpl: '',
    }
  );
};

const updateProjectConfig = (
  schema: GeneratorOptions,
  tree: Tree,
  appName: string
) => {
  const projectConfig: ProjectConfiguration = readProjectConfiguration(
    tree,
    appName
  );
  if (typeof projectConfig.targets !== 'undefined') {
    if (typeof projectConfig.targets.build !== 'undefined') {
      if (typeof projectConfig.targets.build.configurations !== 'undefined') {
        projectConfig.targets.build.configurations.staging = {
          budgets: [
            {
              type: 'initial',
              maximumWarning: '6mb',
              maximumError: '12mb',
            },
            {
              type: 'anyComponentStyle',
              maximumWarning: '10kb',
              maximumError: '30kb',
            },
          ],
          fileReplacements: [
            {
              replace: `apps/${appName}/src/environments/environment.ts`,
              with: `apps/${appName}/src/environments/environment.staging.ts`,
            },
          ],
          outputHashing: 'all',
          buildOptimizer: false,
          optimization: false,
          vendorChunk: true,
          extractLicenses: false,
          sourceMap: true,
          namedChunks: true,
        };
      }

      if (typeof projectConfig.targets.build.options !== 'undefined') {
        projectConfig.targets.build.options.assets = [
          `apps/${appName}/src/favicon.ico`,
          `apps/${appName}/src/assets`,
        ];

        projectConfig.targets.build.options.styles = [
          `apps/${appName}/src/styles.scss`,
          'node_modules/primeng/resources/themes/saga-blue/theme.css',
          'node_modules/primeng/resources/primeng.min.css',
        ];

        projectConfig.targets.build.options.allowedCommonJsDependencies = [
          'chart.js',
        ];

        projectConfig.targets.build.options.scripts = [
          'node_modules/prismjs/prism.js',
          'node_modules/prismjs/components/prism-typescript.js',
        ];
      }

      updateProjectConfiguration(tree, appName, projectConfig);
    }
  }
};

export default async function (tree: Tree, schema: GeneratorOptions) {
  const APP_NAME = `${schema.storeName}-store`;

  /** Generate a New App */
  await applicationGenerator(tree, {
    name: APP_NAME,
    style: 'scss',
    e2eTestRunner: E2eTestRunner.Cypress,
    unitTestRunner: UnitTestRunner.Jest,
    strict: true,
    tags: `scope: ${APP_NAME}`,
  });

  /** Delete default environments */
  await cleanupEnvironments(APP_NAME, tree);

  /** Delete Welcome Component */
  await cleanupWelcome(APP_NAME, tree);

  /** Delete default App Files */
  await cleanupAppFiles(APP_NAME, tree);

  /** Add new Environment Files */
  addEnvironmentFiles(schema, tree, APP_NAME);

  /** Add New App Root Files */
  addAppFiles(schema, tree, APP_NAME);

  /** Add New Asset Files */
  addNewAssetFiles(tree, APP_NAME);

  /** Delete Roo Files */
  await cleanupRootFiles(APP_NAME, tree);

  /** Add Roo Files */
  addRootFiles(schema, tree, APP_NAME);

  /** Update Project Config */
  updateProjectConfig(schema, tree, APP_NAME);

  /** Update scripts Package.json */
  updateJson(tree, 'package.json', (pkgJSON: any): any => {
    pkgJSON.scripts = pkgJSON.scripts ?? {};
    pkgJSON.scripts[
      `${APP_NAME}:staging`
    ] = `nx build ${APP_NAME} --configuration=staging`;
    pkgJSON.scripts[`${APP_NAME}:prod`] = `nx build ${APP_NAME} --prod`;

    return pkgJSON;
  });

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}
