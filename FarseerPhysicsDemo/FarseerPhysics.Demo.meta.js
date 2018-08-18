Bridge.assembly("FarseerPhysics.Demo", function ($asm, globals) {
    "use strict";


    var $m = Bridge.setMetadata,
        $n = ["System","FarseerPhysics.Samples","FarseerPhysics.Dynamics","FarseerPhysics.Utility","Microsoft.Xna.Framework","FarseerPhysics.Dynamics.Contacts","Microsoft.Xna.Framework.Graphics","Microsoft.Xna.Framework.Audio","System.Collections.Generic","Microsoft.Xna.Framework.Media"];
    $m("FarseerPhysics.Demo.App", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Main","is":true,"t":8,"sn":"Main","rt":$n[0].Void},{"a":2,"n":"RunGame","is":true,"t":8,"sn":"RunGame","rt":$n[0].Void},{"a":1,"n":"game","is":true,"t":4,"rt":$n[1].PhysicsGame,"sn":"game"}]}; }, $n);
    $m("FarseerPhysics.Demo.CustomScripts", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"IsFullScreen","is":true,"t":8,"sn":"IsFullScreen","rt":$n[0].Boolean,"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"IsIOS","is":true,"t":8,"sn":"IsIOS","rt":$n[0].Boolean,"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"IsMobileDevice","is":true,"t":8,"sn":"IsMobileDevice","rt":$n[0].Boolean,"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"RequestFullScreen","is":true,"t":8,"sn":"RequestFullScreen","rt":$n[0].Void},{"a":2,"n":"FullScreenButtonStyle","is":true,"t":4,"rt":$n[0].String,"sn":"FullScreenButtonStyle"}]}; }, $n);
    $m("FarseerPhysics.Samples.Agent", function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[2].World,$n[3].ScreenManager,$n[4].Vector2],"pi":[{"n":"world","pt":$n[2].World,"ps":0},{"n":"screenManager","pt":$n[3].ScreenManager,"ps":1},{"n":"position","pt":$n[4].Vector2,"ps":2}],"sn":"ctor"},{"a":2,"n":"Draw","t":8,"sn":"Draw","rt":$n[0].Void},{"a":1,"n":"_agentBody_OnCollision","t":8,"pi":[{"n":"fixtureA","pt":$n[2].Fixture,"ps":0},{"n":"fixtureB","pt":$n[2].Fixture,"ps":1},{"n":"contact","pt":$n[5].Contact,"ps":2}],"sn":"_agentBody_OnCollision","rt":$n[0].Boolean,"p":[$n[2].Fixture,$n[2].Fixture,$n[5].Contact],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"_agentBody_OnSeparation","t":8,"pi":[{"n":"fixtureA","pt":$n[2].Fixture,"ps":0},{"n":"fixtureB","pt":$n[2].Fixture,"ps":1}],"sn":"_agentBody_OnSeparation","rt":$n[0].Void,"p":[$n[2].Fixture,$n[2].Fixture]},{"a":2,"n":"Body","t":16,"rt":$n[2].Body,"g":{"a":2,"n":"get_Body","t":8,"rt":$n[2].Body,"fg":"Body"},"fn":"Body"},{"a":1,"n":"_agentBody","t":4,"rt":$n[2].Body,"sn":"_agentBody"},{"a":1,"n":"_batch","t":4,"rt":$n[6].SpriteBatch,"sn":"_batch"},{"a":1,"n":"a","t":4,"rt":$n[2].Fixture,"sn":"a"},{"a":1,"n":"b","t":4,"rt":$n[2].Fixture,"sn":"b"},{"a":1,"n":"radius","t":4,"rt":$n[0].Single,"sn":"radius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"sound","t":4,"rt":$n[7].SoundEffect,"sn":"sound"},{"a":1,"n":"sprite","t":4,"rt":$n[3].Sprite,"sn":"sprite"}]}; }, $n);
    $m("FarseerPhysics.Samples.Border", function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[2].World,$n[3].ScreenManager,$n[4].Vector2,$n[0].Single,$n[0].Single,$n[6].Texture2D],"pi":[{"n":"world","pt":$n[2].World,"ps":0},{"n":"screenManager","pt":$n[3].ScreenManager,"ps":1},{"n":"position","pt":$n[4].Vector2,"ps":2},{"n":"width","pt":$n[0].Single,"ps":3},{"n":"height","pt":$n[0].Single,"ps":4},{"n":"tex","pt":$n[6].Texture2D,"ps":5}],"sn":"ctor"},{"a":2,"n":"Draw","t":8,"sn":"Draw","rt":$n[0].Void},{"a":1,"n":"_batch","t":4,"rt":$n[6].SpriteBatch,"sn":"_batch"},{"a":1,"n":"_border","t":4,"rt":$n[2].Body,"sn":"_border"},{"a":1,"n":"h","t":4,"rt":$n[0].Single,"sn":"h","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"texture","t":4,"rt":$n[6].Texture2D,"sn":"texture"},{"a":1,"n":"w","t":4,"rt":$n[0].Single,"sn":"w","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    $m("FarseerPhysics.Samples.PhysicsGame", function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"sn":"ctor"},{"ov":true,"a":3,"n":"Initialize","t":8,"sn":"Initialize","rt":$n[0].Void},{"a":2,"n":"ScreenManager","t":16,"rt":$n[3].ScreenManager,"g":{"a":2,"n":"get_ScreenManager","t":8,"rt":$n[3].ScreenManager,"fg":"ScreenManager"},"s":{"a":2,"n":"set_ScreenManager","t":8,"p":[$n[3].ScreenManager],"rt":$n[0].Void,"fs":"ScreenManager"},"fn":"ScreenManager"},{"a":1,"n":"_graphics","t":4,"rt":$n[4].GraphicsDeviceManager,"sn":"_graphics"}]}; }, $n);
    $m("FarseerPhysics.Samples.Pyramid", function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[2].World,$n[3].ScreenManager,$n[4].Vector2,$n[0].Int32,$n[0].Single],"pi":[{"n":"world","pt":$n[2].World,"ps":0},{"n":"screenManager","pt":$n[3].ScreenManager,"ps":1},{"n":"position","pt":$n[4].Vector2,"ps":2},{"n":"count","pt":$n[0].Int32,"ps":3},{"n":"density","pt":$n[0].Single,"ps":4}],"sn":"ctor"},{"a":2,"n":"Draw","t":8,"sn":"Draw","rt":$n[0].Void},{"a":1,"n":"_batch","t":4,"rt":$n[6].SpriteBatch,"sn":"_batch"},{"a":1,"n":"_box","t":4,"rt":$n[3].Sprite,"sn":"_box"},{"a":1,"n":"_boxes","t":4,"rt":$n[8].List$1(FarseerPhysics.Dynamics.Body),"sn":"_boxes"},{"a":2,"n":"tex","t":4,"rt":$n[6].Texture2D,"sn":"tex"},{"a":1,"n":"width","t":4,"rt":$n[0].Single,"sn":"width","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    $m("FarseerPhysics.Samples.Demos.DemoGameScreen", function () { return {"att":1048576,"a":4,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[3].ScreenManager],"pi":[{"n":"screenManager","pt":$n[3].ScreenManager,"ps":0}],"sn":"ctor"},{"ov":true,"a":2,"n":"Draw","t":8,"pi":[{"n":"gameTime","pt":$n[4].GameTime,"ps":0}],"sn":"Draw","rt":$n[0].Void,"p":[$n[4].GameTime]},{"ov":true,"a":2,"n":"LoadContent","t":8,"sn":"LoadContent","rt":$n[0].Void},{"ov":true,"a":2,"n":"Update","t":8,"pi":[{"n":"gameTime","pt":$n[4].GameTime,"ps":0},{"n":"otherScreenHasFocus","pt":$n[0].Boolean,"ps":1},{"n":"coveredByOtherScreen","pt":$n[0].Boolean,"ps":2}],"sn":"Update","rt":$n[0].Void,"p":[$n[4].GameTime,$n[0].Boolean,$n[0].Boolean]},{"a":1,"n":"PyramidBaseBodyCount","is":true,"t":4,"rt":$n[0].Int32,"sn":"PyramidBaseBodyCount","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"_pyramid","t":4,"rt":$n[1].Pyramid,"sn":"_pyramid"},{"a":1,"n":"agent","t":4,"rt":$n[1].Agent,"sn":"agent"},{"a":1,"n":"b1","t":4,"rt":$n[1].Border,"sn":"b1"},{"a":1,"n":"b2","t":4,"rt":$n[1].Border,"sn":"b2"},{"a":1,"n":"b3","t":4,"rt":$n[1].Border,"sn":"b3"},{"a":1,"n":"b4","t":4,"rt":$n[1].Border,"sn":"b4"},{"a":1,"n":"background","t":4,"rt":$n[6].Texture2D,"sn":"background"},{"a":1,"n":"didPress","t":4,"rt":$n[0].Boolean,"sn":"didPress","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"musicStarted","t":4,"rt":$n[0].Boolean,"sn":"musicStarted","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"song","t":4,"rt":$n[9].Song,"sn":"song"},{"a":1,"n":"touchOff","t":4,"rt":$n[4].Vector2,"sn":"touchOff"},{"a":1,"n":"touchOn","t":4,"rt":$n[4].Vector2,"sn":"touchOn"}]}; }, $n);
});
