<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="border-bottom py-3">
    <ul class="nav nav-pills justify-content-center gap-3">
      <li class="nav-item">
        <RouterLink to="/" class="nav-link" active-class="active">
          Home (Week 5)
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/about" class="nav-link" active-class="active">
          About
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/Firelogin" class="nav-link" active-class="active" id="nav-firelogin">
          Firelogin
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/Fireregister" class="nav-link" active-class="active" id="nav-fireregister">
          Fireregister
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
