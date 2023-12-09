---
title: Setting Up a GitHub Blog (2) - Applying the Chirpy Theme
tags:
  - "#github"
  - "#blog"
  - "#chirpy"
date: 2023-12-07 16:04
lastmod: 2023-12-08 14:39
lang: en
permalink: /posts/GB2
categories:
  - "[GitHub, jekyll]"
---


# Series Post Links
(1) [Creating a Repository and Testing the Page](https://hionpu.com/posts/Github_blog_1) 

<font size = "5">(2) Applying the Chirpy Theme </font >

(3) [Uploading Posts](https://hionpu.com/posts/Github_blog_3) 

(4) [Supporting Multiple Languages](https://hionpu.com/posts/Github_blog_4) 

(5) [Creating a Sitemap](https://hionpu.com/posts/Github_blog_5) 

***

# 1. Download the Chirpy Theme Files
You can download the zip file from a site that collects themes, or fork it from the official Chirpy repository, but I chose to clone it.

>[Chirpy Repository](https://github.com/cotes2020/jekyll-theme-chirpy.git) 
{: .prompt-info}

After cloning, copy all the contents from the jekyll-theme-chirpy folder to your local repository (…/(your GitHub username).github.io). When prompted to overwrite, select Yes.

# 2. Install Ruby and Jekyll
## Ruby
>[Ruby Installer Download Link](https://rubyinstaller.org/downloads/)
{: .prompt-info}

Download and run the installer, then keep clicking next until the installation is complete.

When this screen appears, press 3 and Enter to finish the installation.

## Jekyll
Now, you'll find Start Command Prompt with Ruby in the start menu. Run it and in your local GitHub blog repository, enter:

```shell
gem install jekyll
```

```shell
gem install bundler
```
to install Jekyll and Bundler. Just to be sure, check if the installation was successful with:
```shell
ruby -v
jekyll -v
bundler -v
```

If you see something like this, it means the installation was successful (note that versions may vary depending on the time of installation).

# 3. Install Node.js and npm
>[Node.js Download](https://nodejs.org/en/)
{: .prompt-info}

Download and install Node.js, then in the Command Prompt, run:

```shell
npm install && npm run build
```

This prevents complaints about missing \*.min.js files when building with Jekyll.

# 4. Install the Chirpy Theme
Delete the doc folder in your local blog folder. You can also delete the contents of the _posts folder, but you can leave them to check if everything works correctly after local or GitHub deployment.

In the .github/workflows folder of your local blog, delete everything except the file named pages-deploy.yml.hook, and remove the .hook extension to turn it into a .yml file.

Then run:
```shell
bundle
```
to install the theme.

# 5. Check Locally
Enter:
```shell
bundle exec jekyll serve --liveReload
```
and type localhost:4000 in any browser to see how your blog will look when deployed. The `--liveReload` option automatically reflects any changes made to the page files in the blog view.

# 6. Set Up GitHub Action
If the blog displays correctly, it's time to upload it to GitHub. However, the Chirpy theme requires automatic build and deployment via GitHub Actions, so let's set that up first.

Go to Settings in your blog's GitHub repository, then to Pages in the left tab, and under Source, change Deploy from a branch to GitHub Actions.

After clicking Configure in the box that appears, you don't need to change anything else. Just click Commit changes… in the top right corner to finish the deployment setup.

# 7. Push for Automatic Build and Deployment
Since GitHub Action was added, new files have been added to the remote .github folder, so first run:
```shell
git pull origin main
```

Then:
```shell
git add *
git commit -m "git blog init"
git push origin main
```
to push. You can then see the build and deployment happening in the Actions tab of your remote repository. If you see a green light, check your blog at your address (username.github.io) to see if it's visible online.

If you see a red light or the blog isn't working properly even with a green light, refer to the upcoming post on error cases for solutions.

# 8. Next Article
(3) [Uploading Posts](https://hionpu.com/posts/Github_blog_3) 
