<template>
  <login>
    <div class="shell">
      <div class="container a-container" id="a-container">
        <form action="" method="" class="form" id="a-form">
          <h2 class="form_title title">创建账号</h2>
          <div class="form_icons">
            <i class="iconfont icon-QQ"></i>
            <i class="iconfont icon-weixin"></i>
            <i class="iconfont icon-bilibili-line"></i>
          </div>
          <span class="form_span">选择注册方式活电子邮箱注册</span>
          <input type="text" class="form_input" placeholder="Name">
          <input type="text" class="form_input" placeholder="Email">
          <input type="text" class="form_input" placeholder="Password">
          <button class="form_button button submit">SIGN UP</button>
        </form>
      </div>

      <div class="container b-container" id="b-container">
        <form action="" method="" class="form" id="b-form">
          <h2 class="form_title title">登入账号</h2>
          <div class="form_icons">
            <i class="iconfont icon-QQ"></i>
            <i class="iconfont icon-weixin"></i>
            <i class="iconfont icon-bilibili-line"></i>
          </div>
          <span class="form_span">选择登录方式活电子邮箱登录</span>
          <input type="text" class="form_input" placeholder="Email">
          <input type="text" class="form_input" placeholder="Password">
          <a class="form_link">忘记密码？</a>
          <button class="form_button button submit">SIGN IN</button>
        </form>
      </div>

      <div class="switch" id="switch-cnt">
        <div class="switch_circle"></div>
        <div class="switch_circle switch_circle-t"></div>
        <div class="switch_container" id="switch-c1">
          <h2 class="switch_title title" style="letter-spacing: 0;">Welcome Back！</h2>
          <p class="switch_description description">已经有账号了嘛，去登入账号来进入科洛世界吧！！！</p>
          <button class="switch_button button switch-btn">SIGN IN</button>
        </div>

        <div class="switch_container is-hidden" id="switch-c2">
          <h2 class="switch_title title" style="letter-spacing: 0;">HI Friend！</h2>
          <p class="switch_description description">去注册一个账号，让我们踏入奇妙的旅途！</p>
          <button class="switch_button button switch-btn">SIGN UP</button>
        </div>
      </div>
    </div>
  </login>

</template>


<script>

</script>