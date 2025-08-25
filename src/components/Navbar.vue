<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
    <div class="container">
      <!-- 网站 LOGO 或标题 -->
      <a class="navbar-brand fw-semibold" href="#">NoMash Library</a>

      <!-- 折叠菜单按钮（小屏幕用） -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- 菜单内容 -->
      <div id="mainNav" class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link active">Home (Week 4)</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/about" class="nav-link">About</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/contact" class="nav-link">Contact us</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
// 不需要额外逻辑，只是展示
</script>

<style scoped>
.navbar .nav-link.active {
  font-weight: 600;
}
</style>
