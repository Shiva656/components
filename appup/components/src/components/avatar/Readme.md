# appup-avatar

An avatar component

This component display an avatar image and if none is provided fallback to the
user initials.

Rules used to compute user initials:
- divide the username on space and hyphen
- use the first letter of each parts
- never use more than three letters as initials
- if the username is divided in more than three parts and has part
  starting with an uppercase, skip parts starting with a lowercase.

You can find a few examples [here](https://ui.appup.cloud/demos/#/appup-avatar)

In your templates:

```html
<avatar username="Jane Doe"></avatar>
```
## Props
<table class="table">
<thead><tr>
  <th>Name</th><th>Required</th><th>Default</th><th>Type</th><th>Description</th>
</tr></thead>
<tbody>
  <tr><td>username</td>
    <td> N </td>
    <td> - </td>
    <td> String </td>
    <td>The user name that will be used to compute user initial.</td></tr>
  <tr><td>initials</td>
    <td> N </td>
    <td> - </td>
    <td> String </td>
    <td>Force the displayed initials by overriding the computed ones.</td></tr>
  <tr><td>inline</td>
    <td> N </td>
    <td> false </td>
    <td> Boolean </td>
    <td>Uses inline-flex instead of flex</td></tr>
  <tr><td>src</td>
    <td> N </td>
    <td> - </td>
    <td> String </td>
    <td>Path to the avatar image to display.</td></tr>
  <tr><td>:customStyle</td>
    <td> N </td>
    <td> - </td>
    <td> Object </td>
    <td>A custom style object to override the base styles.</td></tr>
  <tr><td>backgroundColor</td>
    <td> N </td>
    <td> - </td>
    <td> String </td>
    <td>The avatar background color to use if no image is provided. If none
      is specified, a background color will be picked depending on
      the user name length.</td></tr>
  <tr><td>color</td>
    <td> N </td>
    <td> - </td>
    <td> String </td>
    <td>The font color used to render the user initials. If none
      is provided, the background color is used to compute
      the font color.</td></tr>
  <tr><td>:lighten</td>
    <td> N </td>
    <td> 80 </td>
    <td> Number </td>
    <td>A factor by which the background color must be lightened to
      produce the font color. Number between [-100,100].</td></tr>
  <tr><td>:size</td>
    <td> N </td>
    <td> 50 </td>
    <td> Number </td>
    <td>The avatar size in pixel.</td></tr>
  <tr><td>:rounded</td>
    <td> N </td>
    <td> true </td>
    <td> Boolean </td>
    <td>True if the avatar must be rounded.</td></tr>
</tbody>
</table>

## Event
<table class="table">
<thead><tr>
  <th>Name</th><th>Arguments</th><th>Description</th>
</tr></thead>
<tbody>
  <tr><td>@avatar-initials</td>
    <td>username (the value of the username props),
      initials (the value of the computed initials or the initials props if any)</td>
    <td>This event is trigger when the component is ready with component
      username and initial.</td></tr>
</tbody>
</table>

## Examples

```html
<avatar username="Hubert-Félix Thiéfaine"></avatar>
```
```html
<avatar username="Hubert-Félix Thiéfaine"
  background-color="#FFC107"
  :size="100"
  :rounded="false"
  :lighten="20">
</avatar>
```
```html
<avatar username="Hubert-Félix Thiéfaine"
  background-color="#FFC107"
  :size="100"
  :rounded="false"
  color="#fff">
</avatar>
```
```html
<avatar username="Darth Vader"
  background-color="#000"
  :size="100"
  :rounded="false">
</avatar>
```
```html
<avatar username="Darth Vader"
  src="https://pbs.twimg.com/profile_images/737615728338034689/eqHCsx8e_400x400.jpg"
  :size="100">
</avatar>
```
```html
<avatar username="Darth Vader"
  initials="AS"
  :size="100">
</avatar>
```
