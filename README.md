# Parkson AI roadmap workspace

A static web app (HTML, CSS, JS, no build step) for the Parkson AI roadmap session. Open `index.html` in a browser to run it locally.

## Files

- `index.html`: all pages. Hash routes: `#home`, `#ai`, `#seen`, `#roadmap`, `#real`, `#real-material-risk`, `#real-project-margin`, `#real-cash-application`, `#real-engineering-release`, `#real-quality-root-cause`, `#next`.
- `css/app.css`: styles and motion. Motion stops when the viewer's system has reduced motion turned on.
- `js/config.js`: the `DEMO_URLS` map for each prototype's Demo button, and `DEMO_TARGET`.
- `js/app.js`: navigation, entrance reveals, video play and pause, Demo links.
- `media/`: 4 muted clips (H.264, 720p) and their poster frames.

## Set the Demo links

1. Open `js/config.js`.
2. Replace each `REPLACE_WITH_119_URL_...` value with the workspace or page URL in the tenant.
3. Optional: set `DEMO_TARGET` to `"_blank"` to open demos in a new browser tab. The default, `"_top"`, opens the demo in the same portal tab.

A Demo button whose link is not set shows a short message when clicked.

## Publish on GitHub Pages

1. On GitHub, create a new repository, for example `parkson-ai`. Public repositories work with GitHub Pages on any plan.
2. In this folder, add the remote and push:

   ```sh
   git remote add origin https://github.com/<your-account>/parkson-ai.git
   git push -u origin main
   ```

3. In the repository, go to **Settings > Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**, the branch to `main`, and the folder to `/ (root)`. Click **Save**.
5. Wait for the deploy to finish, then open `https://<your-account>.github.io/parkson-ai/`.

Note: a GitHub Pages site is public to anyone with the link. The `_shots/` folder is excluded by `.gitignore`.

## Register the app in Infor OS

These steps follow "Adding a non-Infor application" in the Infor OS Portal Administration Guide (Cloud), p.10 to 11.

1. Sign in to the Infor OS portal as a portal administrator and open **Portal Admin**.
2. On the **Applications** page, click **Add Application**.
3. Set **Application Type** to **Non-Infor**.
4. Specify the **Application Name**, for example `Parkson AI Roadmap`. This name shows on the navigation menu panel.
5. Specify the application **URL**: the GitHub Pages URL.
6. Choose the application icon.
7. Set the navigation method to **Same Screen**.
8. Choose whether parameters are passed in the application URL. This app doesn't use them, so either setting works.
9. Check the **Logical ID** field. The guide lists it as a field to specify; if the screen fills it in for you, keep the generated value.
10. Click **Save**, then open the app from the navigation menu to check that it loads.

The app uses relative paths only and sets no frame restrictions, so it loads inside the portal frame.
