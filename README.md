[![CircleCI](https://dl.circleci.com/status-badge/img/gh/uzochukwueddie/chatty/tree/develop.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/uzochukwueddie/chatty/tree/develop)
[![codecov](https://codecov.io/gh/uzochukwueddie/chatty/branch/develop/graph/badge.svg?token=D6GX9SDN6M)](https://codecov.io/gh/uzochukwueddie/chatty)

|||||
|:-:|:-:|:-:|:-:|
|![First Image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662482775/github_readme_images/react_dzmcqt.png)|![Second Image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662483177/github_readme_images/axios_jlnlcn.png)|![Third Image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662483316/github_readme_images/sass_yxqpyf.png)|![Fourth Image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662483366/github_readme_images/date-fns_dukuao.png)

|||||
|:-:|:-:|:-:|:-:|
|![First Image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662483522/github_readme_images/react-skeleton-loader_vxafmb.png)|![Second Image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662483825/github_readme_images/msw-logo_gzlqe3.svg)|![Third Image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662483732/github_readme_images/redux-toolkit_nxvzow.png)|![Fourth Image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662482745/github_readme_images/socketio_lcyu8y.jpg)

||
|:-:|
![First Image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662565384/github_readme_images/react-app-rewired_iw8y1f.png)

Chatty App is a real-time socialnetwork application built with `react`. 

You can find the repo for the backend [here](https://github.com/uzochukwueddie/chatty-backend).

## Screenshots

![first image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662569599/github_readme_images/Screenshot_2022-09-07_at_6.39.16_PM_oj1ijk.png)
![second image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662569598/github_readme_images/Screenshot_2022-09-07_at_6.47.19_PM_cvxvcm.png)
![third image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662569597/github_readme_images/Screenshot_2022-09-07_at_6.49.40_PM_jlgccj.png)
![fourth image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662569598/github_readme_images/Screenshot_2022-09-07_at_6.49.54_PM_hi1vi7.png)
![fifth image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662569600/github_readme_images/Screenshot_2022-09-07_at_6.52.36_PM_v9wlpo.png)
![sizth image](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662569597/github_readme_images/Screenshot_2022-09-07_at_6.52.58_PM_yvlmic.png)

## Features
1. Signup and signin authentication
2. Forgot password and reset password
3. Change password when logged in
4. Create, read, update and delete posts with images and gifs
5. Post reactions
6. Comments
7. Followers, following, block and unblock
8. Private chat messaging with text, images, gifs, and reactions
9. Image upload
10. In-app notification and email notification
11. Custom components
12. Custom React hooks
13. Unit tests
14. Redux implementation using redux-toolkit

## Main Tools
- Create react app
- React
- Redux-toolkit
- Axios
- Date-fns
- React redux
- React router DOM
- SocketIO
- React icons
- SASS
- Lodash
- Jest
- React testing library
- ESLint and Prettier
- React app rewired
- React loading skeleton
- Mock service worker

## Requirements

- Node 16.x or higher
- Giphy API key. You can create an account and obtain a key [here](https://developers.giphy.com/)

- You'll need to copy the contents of `.env.develop`, add to `.env` file and update with the necessary information.

## Local Installation

- There are three different branches develop, staging and main. The develop branch is the default branch.

```bash
git clone -b develop https://github.com/uzochukwueddie/chatty
cd chatty
npm install
```
- To start the server after installation, run
```bash
npm start
```

## Unit tests

- You can run the command `npm run test` to execute the unit tests added to the components.

## Update APP_ENVIRONMENT

- Inside the `axios.js` file found via this path `src/services`, there is a variable called `APP_ENVIRONMENT`.
- If you are setting up the application locally, the variable name needs to be `local`.
- If you are deploying based on the branch, for example develop branch, the variable value needs to be `development`.

# AWS Setup
- You can create an account on AWS if you don't have one already.
- Download and install aws cli.
- On AWS, create an IAM user if you don't already have one. You'll get a key and secret.
- Use aws configure command to add your iam secret and key to your local machine.
- To deploy the application on AWS, it is required you have a domain to use.
- With that domain, manually create a route53 hosted zone on AWS.
![](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662494233/github_readme_images/Screenshot_2022-09-06_at_9.55.11_PM_vzovub.png)
- Copy the hosted zone NS properties and add to the nameservers section of your domain on the dashboard of your domain name provider. e.g: godaddy, namecheap etc.
![](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662494239/github_readme_images/Screenshot_2022-09-06_at_9.56.03_PM_ppb7ll.png)
- For example, on namecheap.com
![](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662494440/github_readme_images/Screenshot_2022-09-06_at_10.00.21_PM_fd32tx.png)

## AWS Resources Used
- S3
- Route53
- AWS Certificate Manager
- Cloudfront

## AWS Infrastructure Setup with Terraform
- Install [terraform](https://www.terraform.io/downloads)
- Update the `variables.tf` file with the correct data. Update the properties with comments.
- To store your terraform remote state on AWS, first create a unique S3 bucket with a sub-folder name called `develop`.
- Add that S3 bucket name to `main.tf` file. Also add your region to the file.
- Inside your backend project, make sure to change the `CLIENT_URL` property inside your `.env.develop` file and go through the process of zipping and uploading to s3. After uploading the zip file, you can create the resources.
- Once your backend resources have been created and running, you need to run the terraform apply command to create your frontend resources. But first,
  - if you already followed the instructions for the backend setup, you can reuse the same S3 bucket
  - inside the bucket, create a sub-folder called frontend and inside the folder, create another folder called develop. Bucket path should be something like `<your-s3-bucket>/frontend/develop`
  - if you intend to use a new bucket
    - create a new s3 bucket to store env files
    - inside the created s3 bucket, add a sub-folder called frontend and inside the frontend folder another sub-folder called develop. Bucket path should be something like `<your-s3-bucket>/frontend/develop`
  - you need to upload your `.env` file to the s3 bucket you created for storing env files (No need for zipping). Upload using aws cli
    - `aws --region <your-region> s3 cp .env s3://<your-s3-bucket>/frontend/develop/`
- Make sure to update the `APP_ENVIRONMENT` foind in src/services before deploying.
- Once the upload is complete, you can execute inside the `infrastructure` folder, the commands:
  - `terraform init`
  - `terraform validate`
  - `terraform fmt`
  - `terraform plan`
  - `terraform apply -auto-approve`
- It will take sometime to create the resources. If everything works well, you should be able to access your application.
- To destroy all created resources, run
  - `terraform destroy`

## Setup CI/CD Pipeline with CircleCI

- Create an account on circleci.
- Signup or login with the github or bitbucket account where you stored your code.
- Setup your project.
- Add the environment variables you see on the screenshot to circleci.
![](https://res.cloudinary.com/dyamr9ym3/image/upload/v1662566092/github_readme_images/Screenshot_2022-09-06_at_11.30.47_PM_y3mtjt.png)
- For `CODECOV_TOKEN`, visit [CodeCov](https://about.codecov.io/) and signup or login with the same account where you have your project stored.
  - Once you login and setup your project, you will receive a token. Add that token to circleci..
- `SLACK_ACCESS_TOKEN` and `SLACK_DEFAULT_CHANNEL` can be obtained by following this [documentation](https://github.com/CircleCI-Public/slack-orb/wiki/Setup).

### Before Starting a Build
- Inside the `circleci.yml` file, you need to make some updates.
- There are some properties named `<variable-prefix>` that you need to replace with the `prefix` value from your terraform `variables.tf`. Search the config.yml file and replace `<variable-prefix>`.
- Also, there are some other properties named `<your-s3-bucket>`. Replace it with your s3 bucket name that you created for storing your `.env` file.
