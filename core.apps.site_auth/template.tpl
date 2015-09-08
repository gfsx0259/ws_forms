<tpl name="site_auth">
    <div id="site_auth" class="site_auth">
        <div id="auth_logged" style="display: none" class="user_info">
            You are logged as <span id="auth_logged_user"></span>.
            <a events="onclick=onAuthLogoutClick">Logout</a>
        </div>

        <div id="auth_not_logged" style="display: none" class="auth_form">
            <form id="auth_form" action="/user/?mode=login" method="post">
               <input type="text" name="email" class="login"/>
               <input type="password" name="pwd" class="pwd"/>
               <input type="submit" class="submit" value=" Go "/>
            </form>
            <div id="site_auth_user_links">
                <a id="link_register_account" events="onclick=onRegisterClick">Register account</a> |
                <a id="link_reset_pwd" events="onclick=onPwdResetClick">Forgot password</a>
            </div>
        </div>
    </div>
</tpl>