<template>
  <div>
    <appup-emoji set="emojione"/>
    <hr>
    <appup-emoji @select="addEmoji"/>
    <hr>
    <appup-emoji title="Pick your emoji…" emoji="point_up"/>
    <hr>
    <appup-emoji :style="{ position: 'absolute', bottom: '20px', right: '20px' }"/>
    <hr>
    <appup-emoji
      :i18n="{ search: 'Recherche', categories: { search: 'Résultats de recherche', recent: 'Récents' } }"
    />
  </div>
</template>
