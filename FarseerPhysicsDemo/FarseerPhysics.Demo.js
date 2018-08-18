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
                    if (FarseerPhysics.Demo.CustomScripts.IsIOS()) {
                        FarseerPhysics.Demo.App.game.Content.OnAllResourceLoaded = function () {
                            FarseerPhysics.Demo.App.game.IsActive = false;
                            Microsoft.Xna.Framework.Graphics.Html5.Canvas.remove();
                            var button = document.createElement("button");
                            button.innerHTML = "Activate web audio for iOS";
                            button.setAttribute("style", FarseerPhysics.Demo.CustomScripts.FullScreenButtonStyle);

                            button.onclick = function (e) {
                                Microsoft.Xna.Framework.WebAudioHelper.Activate();
                                document.body.removeChild(button);
                                FarseerPhysics.Demo.App.game.IsActive = true;
                                document.body.appendChild(Microsoft.Xna.Framework.Graphics.Html5.Canvas);
                            };
                            document.body.appendChild(button);
                        };
                    }
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
                IsIOS: function () {
                    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

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
            didPress: false,
            song: null,
            musicStarted: false
        },
        ctors: {
            init: function () {
                this.touchOn = new Microsoft.Xna.Framework.Vector2();
                this.touchOff = new Microsoft.Xna.Framework.Vector2();
                this.didPress = false;
                this.musicStarted = false;
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
                this.song = this.ScreenManager.Content.Load(Microsoft.Xna.Framework.Media.Song, "Audio/CelticHarps");
                Microsoft.Xna.Framework.Media.MediaPlayer.IsRepeating = true;
            },
            Update: function (gameTime, otherScreenHasFocus, coveredByOtherScreen) {
                var $t;
                if (!this.musicStarted) {
                    Microsoft.Xna.Framework.Media.MediaPlayer.Play(Bridge.global.Microsoft.Xna.Framework.Media.Song, this.song);
                    this.musicStarted = true;
                }
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJGYXJzZWVyUGh5c2ljcy5EZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJDdXN0b21TY3JpcHRzLmNzIiwiQWdlbnQuY3MiLCJCb3JkZXIuY3MiLCJEZW1vR2FtZVNjcmVlbi5jcyIsIlBoeXNpY3NHYW1lLmNzIiwiUHlyYW1pZC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztZQWlCWUEsSUFBSUE7Z0JBRUFBLGFBQTJCQTtnQkFDM0JBO2dCQUNBQSw2QkFBNkJBOztnQkFFN0JBLGlCQUFpQkEsVUFBQ0E7b0JBRWRBO29CQUNBQSwwQkFBMEJBO29CQUMxQkE7O2dCQUVKQSwwQkFBMEJBO2dCQUMxQkEsa0RBQWlCQTtvQkFFYkEsSUFBSUEsZ0NBQVFBO3dCQUVSQSxJQUFJQSxvQkFBb0JBOzRCQUVwQkEsSUFBSUE7Z0NBRUFBO2dDQUNBQSwwQkFBMEJBO2dDQUMxQkEsMEJBQTBCQTs7OzRCQUs5QkEsSUFBSUEsQ0FBQ0E7Z0NBRURBLDBCQUEwQkE7Z0NBQzFCQSwwQkFBMEJBO2dDQUMxQkE7Ozs7OztnQkFRaEJBOzs7Ozs7Ozs7b0JBTUpBLCtCQUFPQSxJQUFJQTtvQkFFWEEsSUFBSUE7d0JBRUFBLDJEQUFtQ0E7NEJBRS9CQTs0QkFDQUE7NEJBQ0FBLGFBQTJCQTs0QkFDM0JBOzRCQUNBQSw2QkFBNkJBOzs0QkFFN0JBLGlCQUFpQkEsVUFBQ0E7Z0NBRWRBO2dDQUNBQSwwQkFBMEJBO2dDQUMxQkE7Z0NBQ0FBLDBCQUEwQkE7OzRCQUU5QkEsMEJBQTBCQTs7O29CQUdsQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNuRUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBb0JBQSxPQUFPQTs7O29CQUtQQSxPQUFPQTs7OztvQkFLUEEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDT0RBLE9BQU9BOzs7Ozs7Ozs7NEJBbkNKQSxPQUFhQSxlQUE2QkE7O2dCQUVuREEsY0FBU0E7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QUlBLE9BQVNBO29CQUV6QkEsVUFBY0E7O29CQUVkQSxLQUFLQSxXQUFXQSxJQUFJQSxlQUFTQTt3QkFFekJBLFdBQVlBLGdEQUF1QkE7d0JBQ25DQSxnQkFBZ0JBO3dCQUNoQkEsZ0JBQWdCQTt3QkFDaEJBLG1CQUFtQkE7d0JBQ25CQSxnQkFBV0E7O3dCQUVYQSxTQUFTQTs7O29CQUdiQSwwRUFBWUE7OztnQkFHaEJBLFdBQU1BO2dCQUVOQSxZQUFPQSxJQUFJQSxxQ0FBT0E7Ozs7O2dCQUtsQkEsS0FBS0EsV0FBV0EsSUFBSUEsbUJBQWdCQTtvQkFFaENBLG1CQUFZQSxtQkFBY0EsbURBQTRCQSxvQkFBT0EsdUJBQWNBLE1BQU1BLDhDQUFhQSxvQkFBT0EsYUFBYUEsSUFBSUEsdUNBQVFBLCtCQUF5QkEsaUNBQTJCQSxBQUFPQSw0REFBa0NBLGFBQVFBLEFBQU9BLHlCQUFvQkEiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIEJyaWRnZTtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuU2FtcGxlcztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcblxyXG5uYW1lc3BhY2UgRmFyc2VlclBoeXNpY3MuRGVtb1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUGh5c2ljc0dhbWUgZ2FtZTtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKEN1c3RvbVNjcmlwdHMuSXNNb2JpbGVEZXZpY2UoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgSFRNTEJ1dHRvbkVsZW1lbnQgYnV0dG9uID0gbmV3IEhUTUxCdXR0b25FbGVtZW50KCk7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uSW5uZXJIVE1MID0gXCJGdWxsc2NyZWVuIEV4cGVyaWVuY2UgKHVzZSBsYW5kc2NhcGUpXCI7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uU2V0QXR0cmlidXRlKFwic3R5bGVcIiwgQ3VzdG9tU2NyaXB0cy5GdWxsU2NyZWVuQnV0dG9uU3R5bGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5PbkNsaWNrID0gKGUpID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ3VzdG9tU2NyaXB0cy5SZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIERvY3VtZW50LkJvZHkuUmVtb3ZlQ2hpbGQoYnV0dG9uKTtcclxuICAgICAgICAgICAgICAgICAgICBSdW5HYW1lKCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5BcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgICAgICAgICAgICAgSHRtbDUuT25SZXNpemUgPSAoKSA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnYW1lICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoV2luZG93LklubmVyV2lkdGggPCBXaW5kb3cuSW5uZXJIZWlnaHQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnYW1lLklzQWN0aXZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUuSXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEb2N1bWVudC5Cb2R5LlJlbW92ZUNoaWxkKEh0bWw1LkNhbnZhcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5BcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFnYW1lLklzQWN0aXZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERvY3VtZW50LkJvZHkuUmVtb3ZlQ2hpbGQoYnV0dG9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEb2N1bWVudC5Cb2R5LkFwcGVuZENoaWxkKEh0bWw1LkNhbnZhcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZS5Jc0FjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUnVuR2FtZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgUnVuR2FtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnYW1lID0gbmV3IFBoeXNpY3NHYW1lKCk7XHJcbiAgICAgICAgICAgIC8vIGlPUyByZXF1aXJlcyBhIHVzZXIgdHJpZ2dlcmVkIGFjdGlvbiB0byBwbGF5IHdlYiBhdWRpb1xyXG4gICAgICAgICAgICBpZiAoQ3VzdG9tU2NyaXB0cy5Jc0lPUygpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBnYW1lLkNvbnRlbnQuT25BbGxSZXNvdXJjZUxvYWRlZCA9ICgpID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZS5Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIEh0bWw1LkNhbnZhcy5SZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICBIVE1MQnV0dG9uRWxlbWVudCBidXR0b24gPSBuZXcgSFRNTEJ1dHRvbkVsZW1lbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uSW5uZXJIVE1MID0gXCJBY3RpdmF0ZSB3ZWIgYXVkaW8gZm9yIGlPU1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5TZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBDdXN0b21TY3JpcHRzLkZ1bGxTY3JlZW5CdXR0b25TdHlsZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5PbkNsaWNrID0gKGUpID0+XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBXZWJBdWRpb0hlbHBlci5BY3RpdmF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBEb2N1bWVudC5Cb2R5LlJlbW92ZUNoaWxkKGJ1dHRvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUuSXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBEb2N1bWVudC5Cb2R5LkFwcGVuZENoaWxkKEh0bWw1LkNhbnZhcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBEb2N1bWVudC5Cb2R5LkFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdhbWUuUnVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIEJyaWRnZTtcclxuXHJcbm5hbWVzcGFjZSBGYXJzZWVyUGh5c2ljcy5EZW1vXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDdXN0b21TY3JpcHRzXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IHN0cmluZyBGdWxsU2NyZWVuQnV0dG9uU3R5bGUgPSBAXCJwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICB0b3A6IDUwJTtcclxuICAgIGxlZnQ6IDUwJTtcclxuICAgIHdpZHRoOiA4MCU7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcclxuICAgIGZvbnQtc2l6ZTogMzBweDtcIjtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFJlcXVlc3RGdWxsU2NyZWVuKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNjcmlwdC5Xcml0ZShAXCJpZiAoZG9jdW1lbnQuYm9keS5yZXF1ZXN0RnVsbHNjcmVlbikge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVxdWVzdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgZWxzZSBpZiAoZG9jdW1lbnQuYm9keS5tb3pSZXF1ZXN0RnVsbFNjcmVlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRvY3VtZW50LmJvZHkud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkb2N1bWVudC5ib2R5Lm1zUmVxdWVzdEZ1bGxzY3JlZW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBJc01vYmlsZURldmljZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gU2NyaXB0LldyaXRlPGJvb2w+KFwid2luZG93Lm9yaWVudGF0aW9uICE9PSB1bmRlZmluZWRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgSXNJT1MoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFNjcmlwdC5Xcml0ZTxib29sPihcIi9pUGFkfGlQaG9uZXxpUG9kLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICYmICF3aW5kb3cuTVNTdHJlYW07XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIElzRnVsbFNjcmVlbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gU2NyaXB0LldyaXRlPGJvb2w+KFwiZG9jdW1lbnQuZnVsbFNjcmVlbiB8fCBkb2N1bWVudC5tb3pGdWxsU2NyZWVuIHx8IGRvY3VtZW50LndlYmtpdElzRnVsbFNjcmVlblwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBGYXJzZWVyUGh5c2ljcy5Db21tb247XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkR5bmFtaWNzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5GYWN0b3JpZXM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlV0aWxpdHk7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuQXVkaW87XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLk1lZGlhO1xyXG5cclxubmFtZXNwYWNlIEZhcnNlZXJQaHlzaWNzLlNhbXBsZXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFnZW50XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBCb2R5IF9hZ2VudEJvZHk7XHJcbiAgICAgICAgcHJpdmF0ZSBTcHJpdGUgc3ByaXRlO1xyXG4gICAgICAgIHByaXZhdGUgU3ByaXRlQmF0Y2ggX2JhdGNoO1xyXG4gICAgICAgIHByaXZhdGUgU291bmRFZmZlY3Qgc291bmQ7XHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdCByYWRpdXMgPSAyZjtcclxuICAgICAgICBwcml2YXRlIEZpeHR1cmUgYSwgYjtcclxuXHJcbiAgICAgICAgcHVibGljIEFnZW50KFdvcmxkIHdvcmxkLCBTY3JlZW5NYW5hZ2VyIHNjcmVlbk1hbmFnZXIsIFZlY3RvcjIgcG9zaXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYmF0Y2ggPSBzY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoO1xyXG5cclxuICAgICAgICAgICAgX2FnZW50Qm9keSA9IEJvZHlGYWN0b3J5LkNyZWF0ZUNpcmNsZSh3b3JsZCwgcmFkaXVzLCAxZik7XHJcbiAgICAgICAgICAgIF9hZ2VudEJvZHkuTWFzcyA9IDIwZjtcclxuICAgICAgICAgICAgX2FnZW50Qm9keS5Cb2R5VHlwZSA9IEJvZHlUeXBlLkR5bmFtaWM7XHJcbiAgICAgICAgICAgIF9hZ2VudEJvZHkuUmVzdGl0dXRpb24gPSAwLjVmO1xyXG4gICAgICAgICAgICBfYWdlbnRCb2R5LlBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgICAgIF9hZ2VudEJvZHkuT25Db2xsaXNpb24gKz0gX2FnZW50Qm9keV9PbkNvbGxpc2lvbjtcclxuICAgICAgICAgICAgX2FnZW50Qm9keS5PblNlcGFyYXRpb24gKz0gX2FnZW50Qm9keV9PblNlcGFyYXRpb247XHJcbiAgICAgICAgICAgIHNvdW5kID0gc2NyZWVuTWFuYWdlci5Db250ZW50LkxvYWQ8U291bmRFZmZlY3Q+KFwiQXVkaW8vQ29sbGlzaW9uXCIpO1xyXG4gICAgICAgICAgICB2YXIgdGV4ID0gc2NyZWVuTWFuYWdlci5Db250ZW50LkxvYWQ8VGV4dHVyZTJEPihcIkFzc2V0cy9CYWxsXCIpO1xyXG5cclxuICAgICAgICAgICAgLy9HRlhcclxuICAgICAgICAgICAgc3ByaXRlID0gbmV3IFNwcml0ZSh0ZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIF9hZ2VudEJvZHlfT25TZXBhcmF0aW9uKEZpeHR1cmUgZml4dHVyZUEsIEZpeHR1cmUgZml4dHVyZUIpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIF9hZ2VudEJvZHlfT25Db2xsaXNpb24oRml4dHVyZSBmaXh0dXJlQSwgRml4dHVyZSBmaXh0dXJlQiwgRHluYW1pY3MuQ29udGFjdHMuQ29udGFjdCBjb250YWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCEoZml4dHVyZUEgPT0gYSAmJiBmaXh0dXJlQiA9PSBiIHx8IGZpeHR1cmVBID09IGIgJiYgZml4dHVyZUIgPT0gYSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNvdW5kLlBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhID0gZml4dHVyZUE7XHJcbiAgICAgICAgICAgIGIgPSBmaXh0dXJlQjtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQm9keSBCb2R5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gX2FnZW50Qm9keTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYmF0Y2guRHJhdyhzcHJpdGUuVGV4dHVyZSwgQ29udmVydFVuaXRzLlRvRGlzcGxheVVuaXRzKF9hZ2VudEJvZHkuUG9zaXRpb24pLCBudWxsLCBDb2xvci5XaGl0ZSwgX2FnZW50Qm9keS5Sb3RhdGlvbiwgbmV3IFZlY3RvcjIoc3ByaXRlLlRleHR1cmUuV2lkdGggLyAyZiwgc3ByaXRlLlRleHR1cmUuSGVpZ2h0IC8gMmYpLCAoZmxvYXQpQ29udmVydFVuaXRzLlRvRGlzcGxheVVuaXRzKDFmKSAqIHJhZGl1cyAqIDJmIC8gKGZsb2F0KXNwcml0ZS5UZXh0dXJlLldpZHRoLCBTcHJpdGVFZmZlY3RzLk5vbmUsIDBmKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBGYXJzZWVyUGh5c2ljcy5Db21tb247XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkR5bmFtaWNzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5GYWN0b3JpZXM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlV0aWxpdHk7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxuXHJcbm5hbWVzcGFjZSBGYXJzZWVyUGh5c2ljcy5TYW1wbGVzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCb3JkZXJcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIEJvZHkgX2JvcmRlcjtcclxuICAgICAgICBwcml2YXRlIFNwcml0ZUJhdGNoIF9iYXRjaDtcclxuICAgICAgICBwcml2YXRlIFRleHR1cmUyRCB0ZXh0dXJlO1xyXG4gICAgICAgIHByaXZhdGUgZmxvYXQgdywgaDtcclxuXHJcbiAgICAgICAgcHVibGljIEJvcmRlcihXb3JsZCB3b3JsZCwgU2NyZWVuTWFuYWdlciBzY3JlZW5NYW5hZ2VyLCBWZWN0b3IyIHBvc2l0aW9uLCBmbG9hdCB3aWR0aCwgZmxvYXQgaGVpZ2h0LCBUZXh0dXJlMkQgdGV4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdyA9IHdpZHRoO1xyXG4gICAgICAgICAgICBoID0gaGVpZ2h0O1xyXG4gICAgICAgICAgICBfYmF0Y2ggPSBzY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoO1xyXG4gICAgICAgICAgICBfYm9yZGVyID0gQm9keUZhY3RvcnkuQ3JlYXRlUmVjdGFuZ2xlKHdvcmxkLCB3aWR0aCwgaGVpZ2h0LCAxZik7XHJcbiAgICAgICAgICAgIF9ib3JkZXIuUG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICAgICAgX2JvcmRlci5Cb2R5VHlwZSA9IEJvZHlUeXBlLlN0YXRpYztcclxuICAgICAgICAgICAgdGV4dHVyZSA9IHRleDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2JhdGNoLkRyYXcodGV4dHVyZSwgQ29udmVydFVuaXRzLlRvRGlzcGxheVVuaXRzKF9ib3JkZXIuUG9zaXRpb24pLCBudWxsLCBDb2xvci5XaGl0ZSwgMGYsIG5ldyBWZWN0b3IyKHRleHR1cmUuV2lkdGggLyAyZiwgdGV4dHVyZS5IZWlnaHQgLyAyZiksIG5ldyBWZWN0b3IyKENvbnZlcnRVbml0cy5Ub0Rpc3BsYXlVbml0cygxZikgKiB3IC8gdGV4dHVyZS5XaWR0aCwgQ29udmVydFVuaXRzLlRvRGlzcGxheVVuaXRzKDFmKSAqIGggLyB0ZXh0dXJlLkhlaWdodCksIFNwcml0ZUVmZmVjdHMuTm9uZSwgMGYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuU2FtcGxlcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuQ29sbGlzaW9uLlNoYXBlcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuQ29tbW9uO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5EeW5hbWljcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuRmFjdG9yaWVzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5VdGlsaXR5O1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkF1ZGlvO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5NZWRpYTtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuSW5wdXQuVG91Y2g7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0O1xyXG5cclxubmFtZXNwYWNlIEZhcnNlZXJQaHlzaWNzLlNhbXBsZXMuRGVtb3Ncclxue1xyXG4gICAgaW50ZXJuYWwgY2xhc3MgRGVtb0dhbWVTY3JlZW4gOiBQaHlzaWNzR2FtZVNjcmVlblxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgY29uc3QgaW50IFB5cmFtaWRCYXNlQm9keUNvdW50ID0gMTQ7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0dXJlMkQgYmFja2dyb3VuZDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBQeXJhbWlkIF9weXJhbWlkO1xyXG4gICAgICAgIHByaXZhdGUgQWdlbnQgYWdlbnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBCb3JkZXIgYjEsIGIyLCBiMywgYjQ7XHJcbiAgICAgICAgcHJpdmF0ZSBWZWN0b3IyIHRvdWNoT24sIHRvdWNoT2ZmO1xyXG4gICAgICAgIHByaXZhdGUgYm9vbCBkaWRQcmVzcyA9IGZhbHNlO1xyXG4gICAgICAgIHByaXZhdGUgU29uZyBzb25nO1xyXG4gICAgICAgIHByaXZhdGUgYm9vbCBtdXNpY1N0YXJ0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgcHVibGljIERlbW9HYW1lU2NyZWVuKFNjcmVlbk1hbmFnZXIgc2NyZWVuTWFuYWdlcikgOiBiYXNlKHNjcmVlbk1hbmFnZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTG9hZENvbnRlbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Mb2FkQ29udGVudCgpO1xyXG4gICAgICAgICAgICBmbG9hdCB3b3JsZFJhdGlvID0gKGZsb2F0KVNjcmVlbk1hbmFnZXIuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuSGVpZ2h0IC8gMzVmO1xyXG4gICAgICAgICAgICBmbG9hdCBmcmFtZVdpZHRoID0gNTBmO1xyXG4gICAgICAgICAgICBmbG9hdCBmcmFtZUhlaWdodCA9IDMwZjtcclxuICAgICAgICAgICAgZmxvYXQgZnJhbWVUaGljayA9IDFmO1xyXG4gICAgICAgICAgICBWZWN0b3IyIGZyYW1lU3RhcnRQb3MgPSBuZXcgVmVjdG9yMigxZiwgMmYpO1xyXG4gICAgICAgICAgICBXb3JsZC5HcmF2aXR5ID0gbmV3IFZlY3RvcjIoMGYsIDgwZik7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQgPSBTY3JlZW5NYW5hZ2VyLkNvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiQXNzZXRzL0JhY2tncm91bmRcIik7XHJcbiAgICAgICAgICAgIF9weXJhbWlkID0gbmV3IFB5cmFtaWQoV29ybGQsIFNjcmVlbk1hbmFnZXIsIG5ldyBWZWN0b3IyKDM1ZiwgMzNmKSwgNSwgMWYpO1xyXG4gICAgICAgICAgICBhZ2VudCA9IG5ldyBBZ2VudChXb3JsZCwgU2NyZWVuTWFuYWdlciwgbmV3IFZlY3RvcjIoNWYsIDI4ZikpO1xyXG4gICAgICAgICAgICBiMSA9IG5ldyBCb3JkZXIoV29ybGQsIFNjcmVlbk1hbmFnZXIsIG5ldyBWZWN0b3IyKGZyYW1lU3RhcnRQb3MuWCwgZnJhbWVTdGFydFBvcy5ZICsgZnJhbWVIZWlnaHQgLyAyZiksIGZyYW1lVGhpY2ssIGZyYW1lSGVpZ2h0LCBfcHlyYW1pZC50ZXgpO1xyXG4gICAgICAgICAgICBiMiA9IG5ldyBCb3JkZXIoV29ybGQsIFNjcmVlbk1hbmFnZXIsIG5ldyBWZWN0b3IyKGZyYW1lU3RhcnRQb3MuWCArIGZyYW1lV2lkdGgsIGZyYW1lU3RhcnRQb3MuWSArIGZyYW1lSGVpZ2h0IC8gMmYpLCBmcmFtZVRoaWNrLCBmcmFtZUhlaWdodCwgX3B5cmFtaWQudGV4KTtcclxuICAgICAgICAgICAgYjMgPSBuZXcgQm9yZGVyKFdvcmxkLCBTY3JlZW5NYW5hZ2VyLCBuZXcgVmVjdG9yMihmcmFtZVN0YXJ0UG9zLlggKyBmcmFtZVdpZHRoIC8gMmYsIGZyYW1lU3RhcnRQb3MuWSksIGZyYW1lV2lkdGgsIGZyYW1lVGhpY2ssIF9weXJhbWlkLnRleCk7XHJcbiAgICAgICAgICAgIGI0ID0gbmV3IEJvcmRlcihXb3JsZCwgU2NyZWVuTWFuYWdlciwgbmV3IFZlY3RvcjIoZnJhbWVTdGFydFBvcy5YICsgZnJhbWVXaWR0aCAvIDJmLCBmcmFtZVN0YXJ0UG9zLlkgKyBmcmFtZUhlaWdodCksIGZyYW1lV2lkdGgsIGZyYW1lVGhpY2ssIF9weXJhbWlkLnRleCk7XHJcbiAgICAgICAgICAgIHNvbmcgPSBTY3JlZW5NYW5hZ2VyLkNvbnRlbnQuTG9hZDxTb25nPihcIkF1ZGlvL0NlbHRpY0hhcnBzXCIpO1xyXG4gICAgICAgICAgICBNZWRpYVBsYXllci5Jc1JlcGVhdGluZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBVcGRhdGUoR2FtZVRpbWUgZ2FtZVRpbWUsIGJvb2wgb3RoZXJTY3JlZW5IYXNGb2N1cywgYm9vbCBjb3ZlcmVkQnlPdGhlclNjcmVlbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghbXVzaWNTdGFydGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBNZWRpYVBsYXllci5QbGF5PGdsb2JhbDo6TWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuTWVkaWEuU29uZz4oc29uZyk7XHJcbiAgICAgICAgICAgICAgICBtdXNpY1N0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJhc2UuVXBkYXRlKGdhbWVUaW1lLCBvdGhlclNjcmVlbkhhc0ZvY3VzLCBjb3ZlcmVkQnlPdGhlclNjcmVlbik7XHJcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IFRvdWNoUGFuZWwuR2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHRvdWNoIGluIHN0YXRlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRvdWNoLlN0YXRlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVG91Y2hMb2NhdGlvblN0YXRlLlByZXNzZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vTWVkaWFQbGF5ZXIuUGxheShzb25nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hPbiA9IHRvdWNoLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFRvdWNoTG9jYXRpb25TdGF0ZS5SZWxlYXNlZDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hPZmYgPSB0b3VjaC5Qb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcmNlID0gdG91Y2hPZmYgLSB0b3VjaE9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZ2VudC5Cb2R5LkFwcGx5Rm9yY2UoVmVjdG9yMi5NdWx0aXBseShmb3JjZSwgMzAwZikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIG1vdXNlID0gTW91c2UuR2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgc3dpdGNoIChtb3VzZS5MZWZ0QnV0dG9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1dHRvblN0YXRlLlByZXNzZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkaWRQcmVzcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoT24gPSBuZXcgVmVjdG9yMihtb3VzZS5Qb3NpdGlvbi5YLCBtb3VzZS5Qb3NpdGlvbi5ZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlkUHJlc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL01lZGlhUGxheWVyLlBsYXkoc29uZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdXR0b25TdGF0ZS5SZWxlYXNlZDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlkUHJlc3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE9mZiA9IG5ldyBWZWN0b3IyKG1vdXNlLlBvc2l0aW9uLlgsIG1vdXNlLlBvc2l0aW9uLlkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9yY2UgPSB0b3VjaE9mZiAtIHRvdWNoT247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZW50LkJvZHkuQXBwbHlGb3JjZShWZWN0b3IyLk11bHRpcGx5KGZvcmNlLCAxNTBmKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZFByZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBEcmF3KEdhbWVUaW1lIGdhbWVUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ29udmVydFVuaXRzLlNldERpc3BsYXlVbml0VG9TaW1Vbml0UmF0aW8oKGZsb2F0KVNjcmVlbk1hbmFnZXIuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuSGVpZ2h0IC8gMzVmKTtcclxuICAgICAgICAgICAgU2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaC5CZWdpbigwLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgU2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaC5EcmF3KGJhY2tncm91bmQsIG5ldyBWZWN0b3IyKFNjcmVlbk1hbmFnZXIuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuV2lkdGggLyAyZiwgU2NyZWVuTWFuYWdlci5HcmFwaGljc0RldmljZS5WaWV3cG9ydC5IZWlnaHQgLyAyZiksIG51bGwsIENvbG9yLldoaXRlLCAwZiwgbmV3IFZlY3RvcjIoYmFja2dyb3VuZC5XaWR0aCAvIDJmLCBiYWNrZ3JvdW5kLkhlaWdodCAvIDJmKSwgKGZsb2F0KVNjcmVlbk1hbmFnZXIuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuSGVpZ2h0IC8gKGZsb2F0KWJhY2tncm91bmQuSGVpZ2h0LCBTcHJpdGVFZmZlY3RzLk5vbmUsIDBmKTtcclxuICAgICAgICAgICAgU2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaC5FbmQoKTtcclxuICAgICAgICAgICAgU2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaC5CZWdpbigwLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBDYW1lcmEuVmlldyk7XHJcbiAgICAgICAgICAgIF9weXJhbWlkLkRyYXcoKTtcclxuICAgICAgICAgICAgYWdlbnQuRHJhdygpO1xyXG4gICAgICAgICAgICBiMS5EcmF3KCk7XHJcbiAgICAgICAgICAgIGIyLkRyYXcoKTtcclxuICAgICAgICAgICAgYjMuRHJhdygpO1xyXG4gICAgICAgICAgICBiNC5EcmF3KCk7XHJcbiAgICAgICAgICAgIFNjcmVlbk1hbmFnZXIuU3ByaXRlQmF0Y2guRW5kKCk7XHJcbiAgICAgICAgICAgIGJhc2UuRHJhdyhnYW1lVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5TYW1wbGVzLkRlbW9zO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5VdGlsaXR5O1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxuXHJcbm5hbWVzcGFjZSBGYXJzZWVyUGh5c2ljcy5TYW1wbGVzXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBUaGlzIGlzIHRoZSBtYWluIHR5cGUgZm9yIHlvdXIgZ2FtZVxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBjbGFzcyBQaHlzaWNzR2FtZSA6IEdhbWVcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIEdyYXBoaWNzRGV2aWNlTWFuYWdlciBfZ3JhcGhpY3M7XHJcblxyXG4gICAgICAgIHB1YmxpYyBQaHlzaWNzR2FtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfZ3JhcGhpY3MgPSBuZXcgR3JhcGhpY3NEZXZpY2VNYW5hZ2VyKHRoaXMpO1xyXG4gICAgICAgICAgICAvL19ncmFwaGljcy5QcmVmZXJyZWRCYWNrQnVmZmVyV2lkdGggPSAxOTAwO1xyXG4gICAgICAgICAgICAvL19ncmFwaGljcy5QcmVmZXJyZWRCYWNrQnVmZmVySGVpZ2h0ID0gMTAwMDtcclxuICAgICAgICAgICAgQ29udmVydFVuaXRzLlNldERpc3BsYXlVbml0VG9TaW1Vbml0UmF0aW8oKGZsb2F0KUdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkhlaWdodCAvIDM1Zik7XHJcbiAgICAgICAgICAgIElzRml4ZWRUaW1lU3RlcCA9IHRydWU7XHJcbiAgICAgICAgICAgIF9ncmFwaGljcy5Jc0Z1bGxTY3JlZW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIENvbnRlbnQuUm9vdERpcmVjdG9yeSA9IFwiQ29udGVudFwiO1xyXG5cclxuICAgICAgICAgICAgLy9uZXctdXAgY29tcG9uZW50cyBhbmQgYWRkIHRvIEdhbWUuQ29tcG9uZW50c1xyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyID0gbmV3IFNjcmVlbk1hbmFnZXIodGhpcyk7XHJcbiAgICAgICAgICAgIENvbXBvbmVudHMuQWRkKFNjcmVlbk1hbmFnZXIpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTY3JlZW5NYW5hZ2VyIFNjcmVlbk1hbmFnZXIgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEFsbG93cyB0aGUgZ2FtZSB0byBwZXJmb3JtIGFueSBpbml0aWFsaXphdGlvbiBpdCBuZWVkcyB0byBiZWZvcmUgc3RhcnRpbmcgdG8gcnVuLlxyXG4gICAgICAgIC8vLyBUaGlzIGlzIHdoZXJlIGl0IGNhbiBxdWVyeSBmb3IgYW55IHJlcXVpcmVkIHNlcnZpY2VzIGFuZCBsb2FkIGFueSBub24tZ3JhcGhpY1xyXG4gICAgICAgIC8vLyByZWxhdGVkIGNvbnRlbnQuICBDYWxsaW5nIGJhc2UuSW5pdGlhbGl6ZSB3aWxsIGVudW1lcmF0ZSB0aHJvdWdoIGFueSBjb21wb25lbnRzXHJcbiAgICAgICAgLy8vIGFuZCBpbml0aWFsaXplIHRoZW0gYXMgd2VsbC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEluaXRpYWxpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Jbml0aWFsaXplKCk7XHJcblxyXG4gICAgICAgICAgICBEZW1vR2FtZVNjcmVlbiBkZW1vID0gbmV3IERlbW9HYW1lU2NyZWVuKFNjcmVlbk1hbmFnZXIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIFNjcmVlbk1hbmFnZXIuQWRkU2NyZWVuKGRlbW8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5Db2xsaXNpb24uU2hhcGVzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5Db21tb247XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkR5bmFtaWNzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5GYWN0b3JpZXM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlV0aWxpdHk7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuQXVkaW87XHJcblxyXG5uYW1lc3BhY2UgRmFyc2VlclBoeXNpY3MuU2FtcGxlc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUHlyYW1pZFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgU3ByaXRlIF9ib3g7XHJcbiAgICAgICAgcHJpdmF0ZSBMaXN0PEJvZHk+IF9ib3hlcztcclxuICAgICAgICBwcml2YXRlIFNwcml0ZUJhdGNoIF9iYXRjaDtcclxuICAgICAgICBwcml2YXRlIGZsb2F0IHdpZHRoID0gM2Y7XHJcbiAgICAgICAgcHVibGljIFRleHR1cmUyRCB0ZXg7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIFB5cmFtaWQoV29ybGQgd29ybGQsIFNjcmVlbk1hbmFnZXIgc2NyZWVuTWFuYWdlciwgVmVjdG9yMiBwb3NpdGlvbiwgaW50IGNvdW50LCBmbG9hdCBkZW5zaXR5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2JhdGNoID0gc2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaDtcclxuXHJcbiAgICAgICAgICAgIFZlcnRpY2VzIHJlY3QgPSBQb2x5Z29uVG9vbHMuQ3JlYXRlUmVjdGFuZ2xlKHdpZHRoIC8gMmYsIHdpZHRoIC8gMmYpO1xyXG4gICAgICAgICAgICBQb2x5Z29uU2hhcGUgc2hhcGUgPSBuZXcgUG9seWdvblNoYXBlKHJlY3QsIGRlbnNpdHkpO1xyXG5cclxuICAgICAgICAgICAgVmVjdG9yMiByb3dTdGFydCA9IHBvc2l0aW9uO1xyXG4gICAgICAgICAgICByb3dTdGFydC5ZIC09IDAuNWYgKyBjb3VudCAqIHdpZHRoICogMS4xZjtcclxuXHJcbiAgICAgICAgICAgIFZlY3RvcjIgZGVsdGFSb3cgPSBuZXcgVmVjdG9yMigtKHdpZHRoICsgMC4yZikgLyAyZiwgd2lkdGggKyAwLjFmKTtcclxuICAgICAgICAgICAgZmxvYXQgc3BhY2luZyA9IHdpZHRoICsgMC41ZjtcclxuXHJcbiAgICAgICAgICAgIF9ib3hlcyA9IG5ldyBMaXN0PEJvZHk+KCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGNvdW50OyArK2kpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFZlY3RvcjIgcG9zID0gcm93U3RhcnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBpICsgMTsgKytqKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEJvZHkgYm9keSA9IEJvZHlGYWN0b3J5LkNyZWF0ZUJvZHkod29ybGQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvZHkuQm9keVR5cGUgPSBCb2R5VHlwZS5EeW5hbWljO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvZHkuUG9zaXRpb24gPSBwb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9keS5DcmVhdGVGaXh0dXJlKHNoYXBlKTtcclxuICAgICAgICAgICAgICAgICAgICBfYm94ZXMuQWRkKGJvZHkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBwb3MuWCArPSBzcGFjaW5nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJvd1N0YXJ0ICs9IGRlbHRhUm93O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0ZXggPSBzY3JlZW5NYW5hZ2VyLkNvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiQXNzZXRzL0JveFwiKTtcclxuICAgICAgICAgICAgLy9HRlhcclxuICAgICAgICAgICAgX2JveCA9IG5ldyBTcHJpdGUodGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBfYm94ZXMuQ291bnQ7ICsraSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2JhdGNoLkRyYXcoX2JveC5UZXh0dXJlLCBDb252ZXJ0VW5pdHMuVG9EaXNwbGF5VW5pdHMoX2JveGVzW2ldLlBvc2l0aW9uKSwgbnVsbCwgQ29sb3IuV2hpdGUsIF9ib3hlc1tpXS5Sb3RhdGlvbiwgbmV3IFZlY3RvcjIoX2JveC5UZXh0dXJlLldpZHRoIC8gMmYsIF9ib3guVGV4dHVyZS5IZWlnaHQgLyAyZiksIChmbG9hdClDb252ZXJ0VW5pdHMuVG9EaXNwbGF5VW5pdHMoMWYpICogd2lkdGggLyAoZmxvYXQpX2JveC5UZXh0dXJlLldpZHRoLCBTcHJpdGVFZmZlY3RzLk5vbmUsIDBmKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdCn0K
