/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 17.2.0
 */
Bridge.assembly("FarseerPhysics.Demo", function ($asm, globals) {
    "use strict";

    Bridge.define("FarseerPhysics.Demo.App", {
        main: function Main () {
            if (FarseerPhysics.Demo.CustomScripts.IsMobileDevice()) {
                var button = document.createElement("button");
                button.innerHTML = "Fullscreen Experience (use landscape)";
                button.setAttribute("style", FarseerPhysics.Demo.CustomScripts.FullScreenButtonStyle);

                button.onclick = function (e) {
                    FarseerPhysics.Demo.CustomScripts.RequestFullScreen();
                    document.body.removeChild(button);
                    FarseerPhysics.Demo.App.RunGame();
                };
                document.body.appendChild(button);
                Microsoft.Xna.Framework.Graphics.Html5.OnResize = function () {
                    if (FarseerPhysics.Demo.App.game != null) {
                        if (window.innerWidth < window.innerHeight) {
                            if (FarseerPhysics.Demo.App.game.IsActive) {
                                FarseerPhysics.Demo.App.game.IsActive = false;
                                document.body.removeChild(Microsoft.Xna.Framework.Graphics.Html5.Canvas);
                                document.body.appendChild(button);
                            }
                        } else {
                            if (!FarseerPhysics.Demo.App.game.IsActive) {
                                document.body.removeChild(button);
                                document.body.appendChild(Microsoft.Xna.Framework.Graphics.Html5.Canvas);
                                FarseerPhysics.Demo.App.game.IsActive = true;
                            }
                        }
                    }
                };
            } else {
                FarseerPhysics.Demo.App.RunGame();
            }
        },
        statics: {
            fields: {
                game: null
            },
            methods: {
                RunGame: function () {
                    FarseerPhysics.Demo.App.game = new FarseerPhysics.Samples.PhysicsGame();
                    FarseerPhysics.Demo.App.game.Run();
                }
            }
        }
    });

    Bridge.define("FarseerPhysics.Demo.CustomScripts", {
        statics: {
            fields: {
                FullScreenButtonStyle: null
            },
            ctors: {
                init: function () {
                    this.FullScreenButtonStyle = "position: fixed;\r\n    top: 50%;\r\n    left: 50%;\r\n    width: 80%;\r\n    transform: translate(-50%, -50%);\r\n    font-size: 30px;";
                }
            },
            methods: {
                RequestFullScreen: function () {
                    if (document.body.requestFullscreen) {
        document.body.requestFullscreen();
            }
    else if (document.body.mozRequestFullScreen)
            {
                document.body.mozRequestFullScreen();
            }
            else if (document.body.webkitRequestFullscreen)
            {
                document.body.webkitRequestFullscreen();
            }
            else if (document.body.msRequestFullscreen)
            {
                document.body.msRequestFullscreen();
            }
            ;
                },
                IsMobileDevice: function () {
                    return window.orientation !== undefined;
                },
                IsFullScreen: function () {
                    return document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
                }
            }
        }
    });

    Bridge.define("FarseerPhysics.Samples.Agent", {
        fields: {
            _agentBody: null,
            sprite: null,
            _batch: null,
            sound: null,
            radius: 0,
            a: null,
            b: null
        },
        props: {
            Body: {
                get: function () {
                    return this._agentBody;
                }
            }
        },
        ctors: {
            init: function () {
                this.sprite = new FarseerPhysics.Utility.Sprite();
                this.radius = 2.0;
            },
            ctor: function (world, screenManager, position) {
                this.$initialize();
                this._batch = screenManager.SpriteBatch;

                this._agentBody = FarseerPhysics.Factories.BodyFactory.CreateCircle(world, this.radius, 1.0);
                this._agentBody.Mass = 20.0;
                this._agentBody.BodyType = FarseerPhysics.Dynamics.BodyType.Dynamic;
                this._agentBody.Restitution = 0.5;
                this._agentBody.Position = position.$clone();
                this._agentBody.addOnCollision(Bridge.fn.cacheBind(this, this._agentBody_OnCollision));
                this._agentBody.addOnSeparation(Bridge.fn.cacheBind(this, this._agentBody_OnSeparation));
                this.sound = screenManager.Content.Load(Microsoft.Xna.Framework.Audio.SoundEffect, "Audio/Collision");
                var tex = screenManager.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "Assets/Ball");

                this.sprite = new FarseerPhysics.Utility.Sprite.$ctor1(tex);
            }
        },
        methods: {
            _agentBody_OnSeparation: function (fixtureA, fixtureB) { },
            _agentBody_OnCollision: function (fixtureA, fixtureB, contact) {
                if (!(Bridge.referenceEquals(fixtureA, this.a) && Bridge.referenceEquals(fixtureB, this.b) || Bridge.referenceEquals(fixtureA, this.b) && Bridge.referenceEquals(fixtureB, this.a))) {
                    this.sound.Play();
                }
                this.a = fixtureA;
                this.b = fixtureB;
                return true;
            },
            Draw: function () {
                this._batch.Draw$1(this.sprite.Texture, FarseerPhysics.Utility.ConvertUnits.ToDisplayUnits(this._agentBody.Position.$clone()), null, Microsoft.Xna.Framework.Color.White.$clone(), this._agentBody.Rotation, new Microsoft.Xna.Framework.Vector2.$ctor2(this.sprite.Texture.Width / 2.0, this.sprite.Texture.Height / 2.0), FarseerPhysics.Utility.ConvertUnits.ToDisplayUnits$4(1.0) * this.radius * 2.0 / this.sprite.Texture.Width, Microsoft.Xna.Framework.Graphics.SpriteEffects.None, 0.0);
            }
        }
    });

    Bridge.define("FarseerPhysics.Samples.Border", {
        fields: {
            _border: null,
            _batch: null,
            texture: null,
            w: 0,
            h: 0
        },
        ctors: {
            ctor: function (world, screenManager, position, width, height, tex) {
                this.$initialize();
                this.w = width;
                this.h = height;
                this._batch = screenManager.SpriteBatch;
                this._border = FarseerPhysics.Factories.BodyFactory.CreateRectangle(world, width, height, 1.0);
                this._border.Position = position.$clone();
                this._border.BodyType = FarseerPhysics.Dynamics.BodyType.Static;
                this.texture = tex;
            }
        },
        methods: {
            Draw: function () {
                this._batch.Draw(this.texture, FarseerPhysics.Utility.ConvertUnits.ToDisplayUnits(this._border.Position.$clone()), null, Microsoft.Xna.Framework.Color.White.$clone(), 0.0, new Microsoft.Xna.Framework.Vector2.$ctor2(this.texture.Width / 2.0, this.texture.Height / 2.0), new Microsoft.Xna.Framework.Vector2.$ctor2(FarseerPhysics.Utility.ConvertUnits.ToDisplayUnits$4(1.0) * this.w / this.texture.Width, FarseerPhysics.Utility.ConvertUnits.ToDisplayUnits$4(1.0) * this.h / this.texture.Height), Microsoft.Xna.Framework.Graphics.SpriteEffects.None, 0.0);
            }
        }
    });

    Bridge.define("FarseerPhysics.Samples.Demos.DemoGameScreen", {
        inherits: [FarseerPhysics.Utility.PhysicsGameScreen],
        statics: {
            fields: {
                PyramidBaseBodyCount: 0
            },
            ctors: {
                init: function () {
                    this.PyramidBaseBodyCount = 14;
                }
            }
        },
        fields: {
            background: null,
            _pyramid: null,
            agent: null,
            b1: null,
            b2: null,
            b3: null,
            b4: null,
            touchOn: null,
            touchOff: null,
            didPress: false
        },
        ctors: {
            init: function () {
                this.touchOn = new Microsoft.Xna.Framework.Vector2();
                this.touchOff = new Microsoft.Xna.Framework.Vector2();
                this.didPress = false;
            },
            ctor: function (screenManager) {
                this.$initialize();
                FarseerPhysics.Utility.PhysicsGameScreen.ctor.call(this, screenManager);
            }
        },
        methods: {
            LoadContent: function () {
                FarseerPhysics.Utility.PhysicsGameScreen.prototype.LoadContent.call(this);
                var worldRatio = this.ScreenManager.GraphicsDevice.Viewport.Height / 35.0;
                var frameWidth = 50.0;
                var frameHeight = 30.0;
                var frameThick = 1.0;
                var frameStartPos = new Microsoft.Xna.Framework.Vector2.$ctor2(1.0, 2.0);
                this.World.Gravity = new Microsoft.Xna.Framework.Vector2.$ctor2(0.0, 80.0);
                this.background = this.ScreenManager.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "Assets/Background");
                this._pyramid = new FarseerPhysics.Samples.Pyramid(this.World, this.ScreenManager, new Microsoft.Xna.Framework.Vector2.$ctor2(35.0, 33.0), 5, 1.0);
                this.agent = new FarseerPhysics.Samples.Agent(this.World, this.ScreenManager, new Microsoft.Xna.Framework.Vector2.$ctor2(5.0, 28.0));
                this.b1 = new FarseerPhysics.Samples.Border(this.World, this.ScreenManager, new Microsoft.Xna.Framework.Vector2.$ctor2(frameStartPos.X, frameStartPos.Y + frameHeight / 2.0), frameThick, frameHeight, this._pyramid.tex);
                this.b2 = new FarseerPhysics.Samples.Border(this.World, this.ScreenManager, new Microsoft.Xna.Framework.Vector2.$ctor2(frameStartPos.X + frameWidth, frameStartPos.Y + frameHeight / 2.0), frameThick, frameHeight, this._pyramid.tex);
                this.b3 = new FarseerPhysics.Samples.Border(this.World, this.ScreenManager, new Microsoft.Xna.Framework.Vector2.$ctor2(frameStartPos.X + frameWidth / 2.0, frameStartPos.Y), frameWidth, frameThick, this._pyramid.tex);
                this.b4 = new FarseerPhysics.Samples.Border(this.World, this.ScreenManager, new Microsoft.Xna.Framework.Vector2.$ctor2(frameStartPos.X + frameWidth / 2.0, frameStartPos.Y + frameHeight), frameWidth, frameThick, this._pyramid.tex);
            },
            Update: function (gameTime, otherScreenHasFocus, coveredByOtherScreen) {
                var $t;
                FarseerPhysics.Utility.PhysicsGameScreen.prototype.Update.call(this, gameTime, otherScreenHasFocus, coveredByOtherScreen);
                var state = Microsoft.Xna.Framework.Input.Touch.TouchPanel.GetState();
                $t = Bridge.getEnumerator(state);
                try {
                    while ($t.moveNext()) {
                        var touch = $t.Current.$clone();
                        switch (touch.State) {
                            case Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Pressed: 
                                this.touchOn = touch.Position.$clone();
                                break;
                            case Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Released: 
                                this.touchOff = touch.Position.$clone();
                                var force = Microsoft.Xna.Framework.Vector2.op_Subtraction(this.touchOff.$clone(), this.touchOn.$clone());
                                this.agent.Body.ApplyForce(Microsoft.Xna.Framework.Vector2.Multiply$1(force.$clone(), 300.0));
                                break;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                var mouse = Microsoft.Xna.Framework.Input.Mouse.GetState();
                switch (mouse.LeftButton) {
                    case Microsoft.Xna.Framework.Input.ButtonState.Pressed: 
                        if (!this.didPress) {
                            this.touchOn = new Microsoft.Xna.Framework.Vector2.$ctor2(mouse.Position.X, mouse.Position.Y);
                            this.didPress = true;
                        }
                        break;
                    case Microsoft.Xna.Framework.Input.ButtonState.Released: 
                        if (this.didPress) {
                            this.touchOff = new Microsoft.Xna.Framework.Vector2.$ctor2(mouse.Position.X, mouse.Position.Y);
                            var force1 = Microsoft.Xna.Framework.Vector2.op_Subtraction(this.touchOff.$clone(), this.touchOn.$clone());
                            this.agent.Body.ApplyForce(Microsoft.Xna.Framework.Vector2.Multiply$1(force1.$clone(), 150.0));
                            this.didPress = false;
                        }
                        break;
                }
            },
            Draw: function (gameTime) {
                FarseerPhysics.Utility.ConvertUnits.SetDisplayUnitToSimUnitRatio(this.ScreenManager.GraphicsDevice.Viewport.Height / 35.0);
                this.ScreenManager.SpriteBatch.Begin$1(0, null, null, null, null, null, null);
                this.ScreenManager.SpriteBatch.Draw$1(this.background, new Microsoft.Xna.Framework.Vector2.$ctor2(this.ScreenManager.GraphicsDevice.Viewport.Width / 2.0, this.ScreenManager.GraphicsDevice.Viewport.Height / 2.0), null, Microsoft.Xna.Framework.Color.White.$clone(), 0.0, new Microsoft.Xna.Framework.Vector2.$ctor2(this.background.Width / 2.0, this.background.Height / 2.0), this.ScreenManager.GraphicsDevice.Viewport.Height / this.background.Height, Microsoft.Xna.Framework.Graphics.SpriteEffects.None, 0.0);
                this.ScreenManager.SpriteBatch.End();
                this.ScreenManager.SpriteBatch.Begin$1(0, null, null, null, null, null, this.Camera.View.$clone());
                this._pyramid.Draw();
                this.agent.Draw();
                this.b1.Draw();
                this.b2.Draw();
                this.b3.Draw();
                this.b4.Draw();
                this.ScreenManager.SpriteBatch.End();
                FarseerPhysics.Utility.PhysicsGameScreen.prototype.Draw.call(this, gameTime);
            }
        }
    });

    /** @namespace FarseerPhysics.Samples */

    /**
     * This is the main type for your game
     *
     * @public
     * @class FarseerPhysics.Samples.PhysicsGame
     * @augments Microsoft.Xna.Framework.Game
     */
    Bridge.define("FarseerPhysics.Samples.PhysicsGame", {
        inherits: [Microsoft.Xna.Framework.Game],
        fields: {
            _graphics: null,
            ScreenManager: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                Microsoft.Xna.Framework.Game.ctor.call(this);
                this._graphics = new Microsoft.Xna.Framework.GraphicsDeviceManager(this);
                FarseerPhysics.Utility.ConvertUnits.SetDisplayUnitToSimUnitRatio(this.GraphicsDevice.Viewport.Height / 35.0);
                this.IsFixedTimeStep = true;
                this._graphics.IsFullScreen = false;

                this.Content.RootDirectory = "Content";

                this.ScreenManager = new FarseerPhysics.Utility.ScreenManager(this);
                this.Components.add(this.ScreenManager);

            }
        },
        methods: {
            /**
             * Allows the game to perform any initialization it needs to before starting to run.
             This is where it can query for any required services and load any non-graphic
             related content.  Calling base.Initialize will enumerate through any components
             and initialize them as well.
             *
             * @instance
             * @protected
             * @override
             * @this FarseerPhysics.Samples.PhysicsGame
             * @memberof FarseerPhysics.Samples.PhysicsGame
             * @return  {void}
             */
            Initialize: function () {
                Microsoft.Xna.Framework.Game.prototype.Initialize.call(this);

                var demo = new FarseerPhysics.Samples.Demos.DemoGameScreen(this.ScreenManager);


                this.ScreenManager.AddScreen(demo);
            }
        }
    });

    Bridge.define("FarseerPhysics.Samples.Pyramid", {
        fields: {
            _box: null,
            _boxes: null,
            _batch: null,
            width: 0,
            tex: null
        },
        ctors: {
            init: function () {
                this._box = new FarseerPhysics.Utility.Sprite();
                this.width = 3.0;
            },
            ctor: function (world, screenManager, position, count, density) {
                this.$initialize();
                this._batch = screenManager.SpriteBatch;

                var rect = FarseerPhysics.Common.PolygonTools.CreateRectangle(this.width / 2.0, this.width / 2.0);
                var shape = new FarseerPhysics.Collision.Shapes.PolygonShape.$ctor1(rect, density);

                var rowStart = position.$clone();
                rowStart.Y -= 0.5 + count * this.width * 1.1;

                var deltaRow = new Microsoft.Xna.Framework.Vector2.$ctor2(-(this.width + 0.2) / 2.0, this.width + 0.1);
                var spacing = this.width + 0.5;

                this._boxes = new (System.Collections.Generic.List$1(FarseerPhysics.Dynamics.Body)).ctor();

                for (var i = 0; i < count; i = (i + 1) | 0) {
                    var pos = rowStart.$clone();

                    for (var j = 0; j < ((i + 1) | 0); j = (j + 1) | 0) {
                        var body = FarseerPhysics.Factories.BodyFactory.CreateBody(world);
                        body.BodyType = FarseerPhysics.Dynamics.BodyType.Dynamic;
                        body.Position = pos.$clone();
                        body.CreateFixture(shape);
                        this._boxes.add(body);

                        pos.X += spacing;
                    }

                    rowStart = Microsoft.Xna.Framework.Vector2.op_Addition(rowStart.$clone(), deltaRow.$clone());
                }

                this.tex = screenManager.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "Assets/Box");
                this._box = new FarseerPhysics.Utility.Sprite.$ctor1(this.tex);
            }
        },
        methods: {
            Draw: function () {
                for (var i = 0; i < this._boxes.Count; i = (i + 1) | 0) {
                    this._batch.Draw$1(this._box.Texture, FarseerPhysics.Utility.ConvertUnits.ToDisplayUnits(this._boxes.getItem(i).Position.$clone()), null, Microsoft.Xna.Framework.Color.White.$clone(), this._boxes.getItem(i).Rotation, new Microsoft.Xna.Framework.Vector2.$ctor2(this._box.Texture.Width / 2.0, this._box.Texture.Height / 2.0), FarseerPhysics.Utility.ConvertUnits.ToDisplayUnits$4(1.0) * this.width / this._box.Texture.Width, Microsoft.Xna.Framework.Graphics.SpriteEffects.None, 0.0);
                }
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJGYXJzZWVyUGh5c2ljcy5EZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJDdXN0b21TY3JpcHRzLmNzIiwiQWdlbnQuY3MiLCJCb3JkZXIuY3MiLCJEZW1vR2FtZVNjcmVlbi5jcyIsIlBoeXNpY3NHYW1lLmNzIiwiUHlyYW1pZC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztZQWlCWUEsSUFBSUE7Z0JBRUFBLGFBQTJCQTtnQkFDM0JBO2dCQUNBQSw2QkFBNkJBOztnQkFFN0JBLGlCQUFpQkEsVUFBQ0E7b0JBRWRBO29CQUNBQSwwQkFBMEJBO29CQUMxQkE7O2dCQUVKQSwwQkFBMEJBO2dCQUMxQkEsa0RBQWlCQTtvQkFFYkEsSUFBSUEsZ0NBQVFBO3dCQUVSQSxJQUFJQSxvQkFBb0JBOzRCQUVwQkEsSUFBSUE7Z0NBRUFBO2dDQUNBQSwwQkFBMEJBO2dDQUMxQkEsMEJBQTBCQTs7OzRCQUs5QkEsSUFBSUEsQ0FBQ0E7Z0NBRURBLDBCQUEwQkE7Z0NBQzFCQSwwQkFBMEJBO2dDQUMxQkE7Ozs7OztnQkFRaEJBOzs7Ozs7Ozs7b0JBTUpBLCtCQUFPQSxJQUFJQTtvQkFDWEE7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkM5Q0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBb0JBQSxPQUFPQTs7O29CQUtQQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNXREEsT0FBT0E7Ozs7Ozs7Ozs0QkFuQ0pBLE9BQWFBLGVBQTZCQTs7Z0JBRW5EQSxjQUFTQTs7Z0JBRVRBLGtCQUFhQSxrREFBeUJBLE9BQU9BO2dCQUM3Q0E7Z0JBQ0FBLDJCQUFzQkE7Z0JBQ3RCQTtnQkFDQUEsMkJBQXNCQTtnQkFDdEJBLCtCQUEwQkE7Z0JBQzFCQSxnQ0FBMkJBO2dCQUMzQkEsYUFBUUE7Z0JBQ1JBLFVBQVVBOztnQkFHVkEsY0FBU0EsSUFBSUEscUNBQU9BOzs7OytDQUdhQSxVQUFrQkE7OENBSW5C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b0JBRWhDQSxtQkFBWUEsbUJBQWNBLG1EQUE0QkEsb0JBQU9BLHVCQUFjQSxNQUFNQSw4Q0FBYUEsb0JBQU9BLGFBQWFBLElBQUlBLHVDQUFRQSwrQkFBeUJBLGlDQUEyQkEsQUFBT0EsNERBQWtDQSxhQUFRQSxBQUFPQSx5QkFBb0JBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBCcmlkZ2U7XHJcbnVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlNhbXBsZXM7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG5cclxubmFtZXNwYWNlIEZhcnNlZXJQaHlzaWNzLkRlbW9cclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFBoeXNpY3NHYW1lIGdhbWU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChDdXN0b21TY3JpcHRzLklzTW9iaWxlRGV2aWNlKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEhUTUxCdXR0b25FbGVtZW50IGJ1dHRvbiA9IG5ldyBIVE1MQnV0dG9uRWxlbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLklubmVySFRNTCA9IFwiRnVsbHNjcmVlbiBFeHBlcmllbmNlICh1c2UgbGFuZHNjYXBlKVwiO1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLlNldEF0dHJpYnV0ZShcInN0eWxlXCIsIEN1c3RvbVNjcmlwdHMuRnVsbFNjcmVlbkJ1dHRvblN0eWxlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBidXR0b24uT25DbGljayA9IChlKSA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEN1c3RvbVNjcmlwdHMuUmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICBEb2N1bWVudC5Cb2R5LlJlbW92ZUNoaWxkKGJ1dHRvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgUnVuR2FtZSgpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIERvY3VtZW50LkJvZHkuQXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgICAgICAgICAgICAgIEh0bWw1Lk9uUmVzaXplID0gKCkgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFdpbmRvdy5Jbm5lcldpZHRoIDwgV2luZG93LklubmVySGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZS5Jc0FjdGl2ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYW1lLklzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5SZW1vdmVDaGlsZChIdG1sNS5DYW52YXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERvY3VtZW50LkJvZHkuQXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZ2FtZS5Jc0FjdGl2ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEb2N1bWVudC5Cb2R5LlJlbW92ZUNoaWxkKGJ1dHRvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5BcHBlbmRDaGlsZChIdG1sNS5DYW52YXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUuSXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJ1bkdhbWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFJ1bkdhbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2FtZSA9IG5ldyBQaHlzaWNzR2FtZSgpO1xyXG4gICAgICAgICAgICBnYW1lLlJ1bigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBCcmlkZ2U7XHJcblxyXG5uYW1lc3BhY2UgRmFyc2VlclBoeXNpY3MuRGVtb1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQ3VzdG9tU2NyaXB0c1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBzdHJpbmcgRnVsbFNjcmVlbkJ1dHRvblN0eWxlID0gQFwicG9zaXRpb246IGZpeGVkO1xyXG4gICAgdG9wOiA1MCU7XHJcbiAgICBsZWZ0OiA1MCU7XHJcbiAgICB3aWR0aDogODAlO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbiAgICBmb250LXNpemU6IDMwcHg7XCI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBSZXF1ZXN0RnVsbFNjcmVlbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTY3JpcHQuV3JpdGUoQFwiaWYgKGRvY3VtZW50LmJvZHkucmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnJlcXVlc3RGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIGVsc2UgaWYgKGRvY3VtZW50LmJvZHkubW96UmVxdWVzdEZ1bGxTY3JlZW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkb2N1bWVudC5ib2R5LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZG9jdW1lbnQuYm9keS5tc1JlcXVlc3RGdWxsc2NyZWVuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5Lm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgSXNNb2JpbGVEZXZpY2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFNjcmlwdC5Xcml0ZTxib29sPihcIndpbmRvdy5vcmllbnRhdGlvbiAhPT0gdW5kZWZpbmVkXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIElzRnVsbFNjcmVlbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gU2NyaXB0LldyaXRlPGJvb2w+KFwiZG9jdW1lbnQuZnVsbFNjcmVlbiB8fCBkb2N1bWVudC5tb3pGdWxsU2NyZWVuIHx8IGRvY3VtZW50LndlYmtpdElzRnVsbFNjcmVlblwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBGYXJzZWVyUGh5c2ljcy5Db21tb247XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkR5bmFtaWNzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5GYWN0b3JpZXM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlV0aWxpdHk7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuQXVkaW87XHJcblxyXG5uYW1lc3BhY2UgRmFyc2VlclBoeXNpY3MuU2FtcGxlc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQWdlbnRcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIEJvZHkgX2FnZW50Qm9keTtcclxuICAgICAgICBwcml2YXRlIFNwcml0ZSBzcHJpdGU7XHJcbiAgICAgICAgcHJpdmF0ZSBTcHJpdGVCYXRjaCBfYmF0Y2g7XHJcbiAgICAgICAgcHJpdmF0ZSBTb3VuZEVmZmVjdCBzb3VuZDtcclxuICAgICAgICBwcml2YXRlIGZsb2F0IHJhZGl1cyA9IDJmO1xyXG4gICAgICAgIHByaXZhdGUgRml4dHVyZSBhLCBiO1xyXG5cclxuICAgICAgICBwdWJsaWMgQWdlbnQoV29ybGQgd29ybGQsIFNjcmVlbk1hbmFnZXIgc2NyZWVuTWFuYWdlciwgVmVjdG9yMiBwb3NpdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9iYXRjaCA9IHNjcmVlbk1hbmFnZXIuU3ByaXRlQmF0Y2g7XHJcblxyXG4gICAgICAgICAgICBfYWdlbnRCb2R5ID0gQm9keUZhY3RvcnkuQ3JlYXRlQ2lyY2xlKHdvcmxkLCByYWRpdXMsIDFmKTtcclxuICAgICAgICAgICAgX2FnZW50Qm9keS5NYXNzID0gMjBmO1xyXG4gICAgICAgICAgICBfYWdlbnRCb2R5LkJvZHlUeXBlID0gQm9keVR5cGUuRHluYW1pYztcclxuICAgICAgICAgICAgX2FnZW50Qm9keS5SZXN0aXR1dGlvbiA9IDAuNWY7XHJcbiAgICAgICAgICAgIF9hZ2VudEJvZHkuUG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICAgICAgX2FnZW50Qm9keS5PbkNvbGxpc2lvbiArPSBfYWdlbnRCb2R5X09uQ29sbGlzaW9uO1xyXG4gICAgICAgICAgICBfYWdlbnRCb2R5Lk9uU2VwYXJhdGlvbiArPSBfYWdlbnRCb2R5X09uU2VwYXJhdGlvbjtcclxuICAgICAgICAgICAgc291bmQgPSBzY3JlZW5NYW5hZ2VyLkNvbnRlbnQuTG9hZDxTb3VuZEVmZmVjdD4oXCJBdWRpby9Db2xsaXNpb25cIik7XHJcbiAgICAgICAgICAgIHZhciB0ZXggPSBzY3JlZW5NYW5hZ2VyLkNvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiQXNzZXRzL0JhbGxcIik7XHJcblxyXG4gICAgICAgICAgICAvL0dGWFxyXG4gICAgICAgICAgICBzcHJpdGUgPSBuZXcgU3ByaXRlKHRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgX2FnZW50Qm9keV9PblNlcGFyYXRpb24oRml4dHVyZSBmaXh0dXJlQSwgRml4dHVyZSBmaXh0dXJlQilcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGJvb2wgX2FnZW50Qm9keV9PbkNvbGxpc2lvbihGaXh0dXJlIGZpeHR1cmVBLCBGaXh0dXJlIGZpeHR1cmVCLCBEeW5hbWljcy5Db250YWN0cy5Db250YWN0IGNvbnRhY3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIShmaXh0dXJlQSA9PSBhICYmIGZpeHR1cmVCID09IGIgfHwgZml4dHVyZUEgPT0gYiAmJiBmaXh0dXJlQiA9PSBhKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc291bmQuUGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGEgPSBmaXh0dXJlQTtcclxuICAgICAgICAgICAgYiA9IGZpeHR1cmVCO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBCb2R5IEJvZHlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBfYWdlbnRCb2R5OyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9iYXRjaC5EcmF3KHNwcml0ZS5UZXh0dXJlLCBDb252ZXJ0VW5pdHMuVG9EaXNwbGF5VW5pdHMoX2FnZW50Qm9keS5Qb3NpdGlvbiksIG51bGwsIENvbG9yLldoaXRlLCBfYWdlbnRCb2R5LlJvdGF0aW9uLCBuZXcgVmVjdG9yMihzcHJpdGUuVGV4dHVyZS5XaWR0aCAvIDJmLCBzcHJpdGUuVGV4dHVyZS5IZWlnaHQgLyAyZiksIChmbG9hdClDb252ZXJ0VW5pdHMuVG9EaXNwbGF5VW5pdHMoMWYpICogcmFkaXVzICogMmYgLyAoZmxvYXQpc3ByaXRlLlRleHR1cmUuV2lkdGgsIFNwcml0ZUVmZmVjdHMuTm9uZSwgMGYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIEZhcnNlZXJQaHlzaWNzLkNvbW1vbjtcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuRHluYW1pY3M7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkZhY3RvcmllcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuVXRpbGl0eTtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG5cclxubmFtZXNwYWNlIEZhcnNlZXJQaHlzaWNzLlNhbXBsZXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEJvcmRlclxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgQm9keSBfYm9yZGVyO1xyXG4gICAgICAgIHByaXZhdGUgU3ByaXRlQmF0Y2ggX2JhdGNoO1xyXG4gICAgICAgIHByaXZhdGUgVGV4dHVyZTJEIHRleHR1cmU7XHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdCB3LCBoO1xyXG5cclxuICAgICAgICBwdWJsaWMgQm9yZGVyKFdvcmxkIHdvcmxkLCBTY3JlZW5NYW5hZ2VyIHNjcmVlbk1hbmFnZXIsIFZlY3RvcjIgcG9zaXRpb24sIGZsb2F0IHdpZHRoLCBmbG9hdCBoZWlnaHQsIFRleHR1cmUyRCB0ZXgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3ID0gd2lkdGg7XHJcbiAgICAgICAgICAgIGggPSBoZWlnaHQ7XHJcbiAgICAgICAgICAgIF9iYXRjaCA9IHNjcmVlbk1hbmFnZXIuU3ByaXRlQmF0Y2g7XHJcbiAgICAgICAgICAgIF9ib3JkZXIgPSBCb2R5RmFjdG9yeS5DcmVhdGVSZWN0YW5nbGUod29ybGQsIHdpZHRoLCBoZWlnaHQsIDFmKTtcclxuICAgICAgICAgICAgX2JvcmRlci5Qb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgICAgICBfYm9yZGVyLkJvZHlUeXBlID0gQm9keVR5cGUuU3RhdGljO1xyXG4gICAgICAgICAgICB0ZXh0dXJlID0gdGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYmF0Y2guRHJhdyh0ZXh0dXJlLCBDb252ZXJ0VW5pdHMuVG9EaXNwbGF5VW5pdHMoX2JvcmRlci5Qb3NpdGlvbiksIG51bGwsIENvbG9yLldoaXRlLCAwZiwgbmV3IFZlY3RvcjIodGV4dHVyZS5XaWR0aCAvIDJmLCB0ZXh0dXJlLkhlaWdodCAvIDJmKSwgbmV3IFZlY3RvcjIoQ29udmVydFVuaXRzLlRvRGlzcGxheVVuaXRzKDFmKSAqIHcgLyB0ZXh0dXJlLldpZHRoLCBDb252ZXJ0VW5pdHMuVG9EaXNwbGF5VW5pdHMoMWYpICogaCAvIHRleHR1cmUuSGVpZ2h0KSwgU3ByaXRlRWZmZWN0cy5Ob25lLCAwZik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5TYW1wbGVzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5Db2xsaXNpb24uU2hhcGVzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5Db21tb247XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkR5bmFtaWNzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5GYWN0b3JpZXM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlV0aWxpdHk7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuSW5wdXQuVG91Y2g7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0O1xyXG5cclxubmFtZXNwYWNlIEZhcnNlZXJQaHlzaWNzLlNhbXBsZXMuRGVtb3Ncclxue1xyXG4gICAgaW50ZXJuYWwgY2xhc3MgRGVtb0dhbWVTY3JlZW4gOiBQaHlzaWNzR2FtZVNjcmVlblxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgY29uc3QgaW50IFB5cmFtaWRCYXNlQm9keUNvdW50ID0gMTQ7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0dXJlMkQgYmFja2dyb3VuZDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBQeXJhbWlkIF9weXJhbWlkO1xyXG4gICAgICAgIHByaXZhdGUgQWdlbnQgYWdlbnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBCb3JkZXIgYjEsIGIyLCBiMywgYjQ7XHJcbiAgICAgICAgcHJpdmF0ZSBWZWN0b3IyIHRvdWNoT24sIHRvdWNoT2ZmO1xyXG4gICAgICAgIHByaXZhdGUgYm9vbCBkaWRQcmVzcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwdWJsaWMgRGVtb0dhbWVTY3JlZW4oU2NyZWVuTWFuYWdlciBzY3JlZW5NYW5hZ2VyKSA6IGJhc2Uoc2NyZWVuTWFuYWdlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBMb2FkQ29udGVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLkxvYWRDb250ZW50KCk7XHJcbiAgICAgICAgICAgIGZsb2F0IHdvcmxkUmF0aW8gPSAoZmxvYXQpU2NyZWVuTWFuYWdlci5HcmFwaGljc0RldmljZS5WaWV3cG9ydC5IZWlnaHQgLyAzNWY7XHJcbiAgICAgICAgICAgIGZsb2F0IGZyYW1lV2lkdGggPSA1MGY7XHJcbiAgICAgICAgICAgIGZsb2F0IGZyYW1lSGVpZ2h0ID0gMzBmO1xyXG4gICAgICAgICAgICBmbG9hdCBmcmFtZVRoaWNrID0gMWY7XHJcbiAgICAgICAgICAgIFZlY3RvcjIgZnJhbWVTdGFydFBvcyA9IG5ldyBWZWN0b3IyKDFmLCAyZik7XHJcbiAgICAgICAgICAgIFdvcmxkLkdyYXZpdHkgPSBuZXcgVmVjdG9yMigwZiwgODBmKTtcclxuICAgICAgICAgICAgYmFja2dyb3VuZCA9IFNjcmVlbk1hbmFnZXIuQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJBc3NldHMvQmFja2dyb3VuZFwiKTtcclxuICAgICAgICAgICAgX3B5cmFtaWQgPSBuZXcgUHlyYW1pZChXb3JsZCwgU2NyZWVuTWFuYWdlciwgbmV3IFZlY3RvcjIoMzVmLCAzM2YpLCA1LCAxZik7XHJcbiAgICAgICAgICAgIGFnZW50ID0gbmV3IEFnZW50KFdvcmxkLCBTY3JlZW5NYW5hZ2VyLCBuZXcgVmVjdG9yMig1ZiwgMjhmKSk7XHJcbiAgICAgICAgICAgIGIxID0gbmV3IEJvcmRlcihXb3JsZCwgU2NyZWVuTWFuYWdlciwgbmV3IFZlY3RvcjIoZnJhbWVTdGFydFBvcy5YLCBmcmFtZVN0YXJ0UG9zLlkgKyBmcmFtZUhlaWdodCAvIDJmKSwgZnJhbWVUaGljaywgZnJhbWVIZWlnaHQsIF9weXJhbWlkLnRleCk7XHJcbiAgICAgICAgICAgIGIyID0gbmV3IEJvcmRlcihXb3JsZCwgU2NyZWVuTWFuYWdlciwgbmV3IFZlY3RvcjIoZnJhbWVTdGFydFBvcy5YICsgZnJhbWVXaWR0aCwgZnJhbWVTdGFydFBvcy5ZICsgZnJhbWVIZWlnaHQgLyAyZiksIGZyYW1lVGhpY2ssIGZyYW1lSGVpZ2h0LCBfcHlyYW1pZC50ZXgpO1xyXG4gICAgICAgICAgICBiMyA9IG5ldyBCb3JkZXIoV29ybGQsIFNjcmVlbk1hbmFnZXIsIG5ldyBWZWN0b3IyKGZyYW1lU3RhcnRQb3MuWCArIGZyYW1lV2lkdGggLyAyZiwgZnJhbWVTdGFydFBvcy5ZKSwgZnJhbWVXaWR0aCwgZnJhbWVUaGljaywgX3B5cmFtaWQudGV4KTtcclxuICAgICAgICAgICAgYjQgPSBuZXcgQm9yZGVyKFdvcmxkLCBTY3JlZW5NYW5hZ2VyLCBuZXcgVmVjdG9yMihmcmFtZVN0YXJ0UG9zLlggKyBmcmFtZVdpZHRoIC8gMmYsIGZyYW1lU3RhcnRQb3MuWSArIGZyYW1lSGVpZ2h0KSwgZnJhbWVXaWR0aCwgZnJhbWVUaGljaywgX3B5cmFtaWQudGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFVwZGF0ZShHYW1lVGltZSBnYW1lVGltZSwgYm9vbCBvdGhlclNjcmVlbkhhc0ZvY3VzLCBib29sIGNvdmVyZWRCeU90aGVyU2NyZWVuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5VcGRhdGUoZ2FtZVRpbWUsIG90aGVyU2NyZWVuSGFzRm9jdXMsIGNvdmVyZWRCeU90aGVyU2NyZWVuKTtcclxuICAgICAgICAgICAgdmFyIHN0YXRlID0gVG91Y2hQYW5lbC5HZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgdG91Y2ggaW4gc3RhdGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodG91Y2guU3RhdGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBUb3VjaExvY2F0aW9uU3RhdGUuUHJlc3NlZDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hPbiA9IHRvdWNoLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFRvdWNoTG9jYXRpb25TdGF0ZS5SZWxlYXNlZDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hPZmYgPSB0b3VjaC5Qb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcmNlID0gdG91Y2hPZmYgLSB0b3VjaE9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZ2VudC5Cb2R5LkFwcGx5Rm9yY2UoVmVjdG9yMi5NdWx0aXBseShmb3JjZSwgMzAwZikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIG1vdXNlID0gTW91c2UuR2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgc3dpdGNoIChtb3VzZS5MZWZ0QnV0dG9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1dHRvblN0YXRlLlByZXNzZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkaWRQcmVzcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoT24gPSBuZXcgVmVjdG9yMihtb3VzZS5Qb3NpdGlvbi5YLCBtb3VzZS5Qb3NpdGlvbi5ZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlkUHJlc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQnV0dG9uU3RhdGUuUmVsZWFzZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpZFByZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hPZmYgPSBuZXcgVmVjdG9yMihtb3VzZS5Qb3NpdGlvbi5YLCBtb3VzZS5Qb3NpdGlvbi5ZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcmNlID0gdG91Y2hPZmYgLSB0b3VjaE9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZ2VudC5Cb2R5LkFwcGx5Rm9yY2UoVmVjdG9yMi5NdWx0aXBseShmb3JjZSwgMTUwZikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWRQcmVzcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgRHJhdyhHYW1lVGltZSBnYW1lVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbnZlcnRVbml0cy5TZXREaXNwbGF5VW5pdFRvU2ltVW5pdFJhdGlvKChmbG9hdClTY3JlZW5NYW5hZ2VyLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkhlaWdodCAvIDM1Zik7XHJcbiAgICAgICAgICAgIFNjcmVlbk1hbmFnZXIuU3ByaXRlQmF0Y2guQmVnaW4oMCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAgIFNjcmVlbk1hbmFnZXIuU3ByaXRlQmF0Y2guRHJhdyhiYWNrZ3JvdW5kLCBuZXcgVmVjdG9yMihTY3JlZW5NYW5hZ2VyLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LldpZHRoIC8gMmYsIFNjcmVlbk1hbmFnZXIuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuSGVpZ2h0IC8gMmYpLCBudWxsLCBDb2xvci5XaGl0ZSwgMGYsIG5ldyBWZWN0b3IyKGJhY2tncm91bmQuV2lkdGggLyAyZiwgYmFja2dyb3VuZC5IZWlnaHQgLyAyZiksIChmbG9hdClTY3JlZW5NYW5hZ2VyLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkhlaWdodCAvIChmbG9hdCliYWNrZ3JvdW5kLkhlaWdodCwgU3ByaXRlRWZmZWN0cy5Ob25lLCAwZik7XHJcbiAgICAgICAgICAgIFNjcmVlbk1hbmFnZXIuU3ByaXRlQmF0Y2guRW5kKCk7XHJcbiAgICAgICAgICAgIFNjcmVlbk1hbmFnZXIuU3ByaXRlQmF0Y2guQmVnaW4oMCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgQ2FtZXJhLlZpZXcpO1xyXG4gICAgICAgICAgICBfcHlyYW1pZC5EcmF3KCk7XHJcbiAgICAgICAgICAgIGFnZW50LkRyYXcoKTtcclxuICAgICAgICAgICAgYjEuRHJhdygpO1xyXG4gICAgICAgICAgICBiMi5EcmF3KCk7XHJcbiAgICAgICAgICAgIGIzLkRyYXcoKTtcclxuICAgICAgICAgICAgYjQuRHJhdygpO1xyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoLkVuZCgpO1xyXG4gICAgICAgICAgICBiYXNlLkRyYXcoZ2FtZVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuU2FtcGxlcy5EZW1vcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuVXRpbGl0eTtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcblxyXG5uYW1lc3BhY2UgRmFyc2VlclBoeXNpY3MuU2FtcGxlc1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gVGhpcyBpcyB0aGUgbWFpbiB0eXBlIGZvciB5b3VyIGdhbWVcclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgUGh5c2ljc0dhbWUgOiBHYW1lXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBHcmFwaGljc0RldmljZU1hbmFnZXIgX2dyYXBoaWNzO1xyXG5cclxuICAgICAgICBwdWJsaWMgUGh5c2ljc0dhbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2dyYXBoaWNzID0gbmV3IEdyYXBoaWNzRGV2aWNlTWFuYWdlcih0aGlzKTtcclxuICAgICAgICAgICAgLy9fZ3JhcGhpY3MuUHJlZmVycmVkQmFja0J1ZmZlcldpZHRoID0gMTkwMDtcclxuICAgICAgICAgICAgLy9fZ3JhcGhpY3MuUHJlZmVycmVkQmFja0J1ZmZlckhlaWdodCA9IDEwMDA7XHJcbiAgICAgICAgICAgIENvbnZlcnRVbml0cy5TZXREaXNwbGF5VW5pdFRvU2ltVW5pdFJhdGlvKChmbG9hdClHcmFwaGljc0RldmljZS5WaWV3cG9ydC5IZWlnaHQgLyAzNWYpO1xyXG4gICAgICAgICAgICBJc0ZpeGVkVGltZVN0ZXAgPSB0cnVlO1xyXG4gICAgICAgICAgICBfZ3JhcGhpY3MuSXNGdWxsU2NyZWVuID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBDb250ZW50LlJvb3REaXJlY3RvcnkgPSBcIkNvbnRlbnRcIjtcclxuXHJcbiAgICAgICAgICAgIC8vbmV3LXVwIGNvbXBvbmVudHMgYW5kIGFkZCB0byBHYW1lLkNvbXBvbmVudHNcclxuICAgICAgICAgICAgU2NyZWVuTWFuYWdlciA9IG5ldyBTY3JlZW5NYW5hZ2VyKHRoaXMpO1xyXG4gICAgICAgICAgICBDb21wb25lbnRzLkFkZChTY3JlZW5NYW5hZ2VyKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU2NyZWVuTWFuYWdlciBTY3JlZW5NYW5hZ2VyIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBBbGxvd3MgdGhlIGdhbWUgdG8gcGVyZm9ybSBhbnkgaW5pdGlhbGl6YXRpb24gaXQgbmVlZHMgdG8gYmVmb3JlIHN0YXJ0aW5nIHRvIHJ1bi5cclxuICAgICAgICAvLy8gVGhpcyBpcyB3aGVyZSBpdCBjYW4gcXVlcnkgZm9yIGFueSByZXF1aXJlZCBzZXJ2aWNlcyBhbmQgbG9hZCBhbnkgbm9uLWdyYXBoaWNcclxuICAgICAgICAvLy8gcmVsYXRlZCBjb250ZW50LiAgQ2FsbGluZyBiYXNlLkluaXRpYWxpemUgd2lsbCBlbnVtZXJhdGUgdGhyb3VnaCBhbnkgY29tcG9uZW50c1xyXG4gICAgICAgIC8vLyBhbmQgaW5pdGlhbGl6ZSB0aGVtIGFzIHdlbGwuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBJbml0aWFsaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuSW5pdGlhbGl6ZSgpO1xyXG5cclxuICAgICAgICAgICAgRGVtb0dhbWVTY3JlZW4gZGVtbyA9IG5ldyBEZW1vR2FtZVNjcmVlbihTY3JlZW5NYW5hZ2VyKTtcclxuXHJcblxyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyLkFkZFNjcmVlbihkZW1vKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuQ29sbGlzaW9uLlNoYXBlcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuQ29tbW9uO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5EeW5hbWljcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuRmFjdG9yaWVzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5VdGlsaXR5O1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkF1ZGlvO1xyXG5cclxubmFtZXNwYWNlIEZhcnNlZXJQaHlzaWNzLlNhbXBsZXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFB5cmFtaWRcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIFNwcml0ZSBfYm94O1xyXG4gICAgICAgIHByaXZhdGUgTGlzdDxCb2R5PiBfYm94ZXM7XHJcbiAgICAgICAgcHJpdmF0ZSBTcHJpdGVCYXRjaCBfYmF0Y2g7XHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdCB3aWR0aCA9IDNmO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0dXJlMkQgdGV4O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBQeXJhbWlkKFdvcmxkIHdvcmxkLCBTY3JlZW5NYW5hZ2VyIHNjcmVlbk1hbmFnZXIsIFZlY3RvcjIgcG9zaXRpb24sIGludCBjb3VudCwgZmxvYXQgZGVuc2l0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9iYXRjaCA9IHNjcmVlbk1hbmFnZXIuU3ByaXRlQmF0Y2g7XHJcblxyXG4gICAgICAgICAgICBWZXJ0aWNlcyByZWN0ID0gUG9seWdvblRvb2xzLkNyZWF0ZVJlY3RhbmdsZSh3aWR0aCAvIDJmLCB3aWR0aCAvIDJmKTtcclxuICAgICAgICAgICAgUG9seWdvblNoYXBlIHNoYXBlID0gbmV3IFBvbHlnb25TaGFwZShyZWN0LCBkZW5zaXR5KTtcclxuXHJcbiAgICAgICAgICAgIFZlY3RvcjIgcm93U3RhcnQgPSBwb3NpdGlvbjtcclxuICAgICAgICAgICAgcm93U3RhcnQuWSAtPSAwLjVmICsgY291bnQgKiB3aWR0aCAqIDEuMWY7XHJcblxyXG4gICAgICAgICAgICBWZWN0b3IyIGRlbHRhUm93ID0gbmV3IFZlY3RvcjIoLSh3aWR0aCArIDAuMmYpIC8gMmYsIHdpZHRoICsgMC4xZik7XHJcbiAgICAgICAgICAgIGZsb2F0IHNwYWNpbmcgPSB3aWR0aCArIDAuNWY7XHJcblxyXG4gICAgICAgICAgICBfYm94ZXMgPSBuZXcgTGlzdDxCb2R5PigpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBjb3VudDsgKytpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBWZWN0b3IyIHBvcyA9IHJvd1N0YXJ0O1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgaSArIDE7ICsrailcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBCb2R5IGJvZHkgPSBCb2R5RmFjdG9yeS5DcmVhdGVCb2R5KHdvcmxkKTtcclxuICAgICAgICAgICAgICAgICAgICBib2R5LkJvZHlUeXBlID0gQm9keVR5cGUuRHluYW1pYztcclxuICAgICAgICAgICAgICAgICAgICBib2R5LlBvc2l0aW9uID0gcG9zO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvZHkuQ3JlYXRlRml4dHVyZShzaGFwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2JveGVzLkFkZChib2R5KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zLlggKz0gc3BhY2luZztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByb3dTdGFydCArPSBkZWx0YVJvdztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGV4ID0gc2NyZWVuTWFuYWdlci5Db250ZW50LkxvYWQ8VGV4dHVyZTJEPihcIkFzc2V0cy9Cb3hcIik7XHJcbiAgICAgICAgICAgIC8vR0ZYXHJcbiAgICAgICAgICAgIF9ib3ggPSBuZXcgU3ByaXRlKHRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgX2JveGVzLkNvdW50OyArK2kpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9iYXRjaC5EcmF3KF9ib3guVGV4dHVyZSwgQ29udmVydFVuaXRzLlRvRGlzcGxheVVuaXRzKF9ib3hlc1tpXS5Qb3NpdGlvbiksIG51bGwsIENvbG9yLldoaXRlLCBfYm94ZXNbaV0uUm90YXRpb24sIG5ldyBWZWN0b3IyKF9ib3guVGV4dHVyZS5XaWR0aCAvIDJmLCBfYm94LlRleHR1cmUuSGVpZ2h0IC8gMmYpLCAoZmxvYXQpQ29udmVydFVuaXRzLlRvRGlzcGxheVVuaXRzKDFmKSAqIHdpZHRoIC8gKGZsb2F0KV9ib3guVGV4dHVyZS5XaWR0aCwgU3ByaXRlRWZmZWN0cy5Ob25lLCAwZik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXQp9Cg==
