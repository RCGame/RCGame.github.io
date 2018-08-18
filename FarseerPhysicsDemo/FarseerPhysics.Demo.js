/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 17.2.0
 */
Bridge.assembly("FarseerPhysics.Demo", function ($asm, globals) {
    "use strict";

    Bridge.define("FarseerPhysics.Demo.App", {
        main: function Main () {
            Microsoft.Xna.Framework.WebAudioHelper.Init();
            if (FarseerPhysics.Demo.CustomScripts.IsMobileDevice()) {
                Microsoft.Xna.Framework.WebAudioHelper.Load("Content/Audio/Collision.mp3", function () {
                    var button = document.createElement("button");
                    button.innerHTML = "Fullscreen Experience (use landscape)";
                    button.setAttribute("style", FarseerPhysics.Demo.CustomScripts.FullScreenButtonStyle);

                    button.onclick = function (e) {
                        Microsoft.Xna.Framework.WebAudioHelper.Play();
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
                });
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJGYXJzZWVyUGh5c2ljcy5EZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJDdXN0b21TY3JpcHRzLmNzIiwiQWdlbnQuY3MiLCJCb3JkZXIuY3MiLCJEZW1vR2FtZVNjcmVlbi5jcyIsIlBoeXNpY3NHYW1lLmNzIiwiUHlyYW1pZC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztZQWlCWUE7WUFDQUEsSUFBSUE7Z0JBRUFBLDJFQUFtREEsQUFBd0JBO29CQUV2RUEsYUFBMkJBO29CQUMzQkE7b0JBQ0FBLDZCQUE2QkE7O29CQUU3QkEsaUJBQWlCQSxVQUFDQTt3QkFFZEE7d0JBQ0FBO3dCQUNBQSwwQkFBMEJBO3dCQUMxQkE7O29CQUVKQSwwQkFBMEJBO29CQUMxQkEsa0RBQWlCQTt3QkFFYkEsSUFBSUEsZ0NBQVFBOzRCQUVSQSxJQUFJQSxvQkFBb0JBO2dDQUVwQkEsSUFBSUE7b0NBRUFBO29DQUNBQSwwQkFBMEJBO29DQUMxQkEsMEJBQTBCQTs7O2dDQUs5QkEsSUFBSUEsQ0FBQ0E7b0NBRURBLDBCQUEwQkE7b0NBQzFCQSwwQkFBMEJBO29DQUMxQkE7Ozs7Ozs7Z0JBU3BCQTs7Ozs7Ozs7O29CQU1KQSwrQkFBT0EsSUFBSUE7b0JBQ1hBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDbkRBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQW9CQUEsT0FBT0E7OztvQkFLUEEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDWURBLE9BQU9BOzs7Ozs7Ozs7NEJBbkNKQSxPQUFhQSxlQUE2QkE7O2dCQUVuREEsY0FBU0E7O2dCQUVUQSxrQkFBYUEsa0RBQXlCQSxPQUFPQTtnQkFDN0NBO2dCQUNBQSwyQkFBc0JBO2dCQUN0QkE7Z0JBQ0FBLDJCQUFzQkE7Z0JBQ3RCQSwrQkFBMEJBO2dCQUMxQkEsZ0NBQTJCQTtnQkFDM0JBLGFBQVFBO2dCQUNSQSxVQUFVQTs7Z0JBR1ZBLGNBQVNB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QSxTQUFTQTs7O29CQUdiQSwwRUFBWUE7OztnQkFHaEJBLFdBQU1BO2dCQUVOQSxZQUFPQSxJQUFJQSxxQ0FBT0E7Ozs7O2dCQUtsQkEsS0FBS0EsV0FBV0EsSUFBSUEsbUJBQWdCQTtvQkFFaENBLG1CQUFZQSxtQkFBY0EsbURBQTRCQSxvQkFBT0EsdUJBQWNBLE1BQU1BLDhDQUFhQSxvQkFBT0EsYUFBYUEsSUFBSUEsdUNBQVFBLCtCQUF5QkEsaUNBQTJCQSxBQUFPQSw0REFBa0NBLGFBQVFBLEFBQU9BLHlCQUFvQkEiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIEJyaWRnZTtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuU2FtcGxlcztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcblxyXG5uYW1lc3BhY2UgRmFyc2VlclBoeXNpY3MuRGVtb1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUGh5c2ljc0dhbWUgZ2FtZTtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgV2ViQXVkaW9IZWxwZXIuSW5pdCgpO1xyXG4gICAgICAgICAgICBpZiAoQ3VzdG9tU2NyaXB0cy5Jc01vYmlsZURldmljZSgpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBXZWJBdWRpb0hlbHBlci5Mb2FkKFwiQ29udGVudC9BdWRpby9Db2xsaXNpb24ubXAzXCIsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb24pKCgpID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgSFRNTEJ1dHRvbkVsZW1lbnQgYnV0dG9uID0gbmV3IEhUTUxCdXR0b25FbGVtZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLklubmVySFRNTCA9IFwiRnVsbHNjcmVlbiBFeHBlcmllbmNlICh1c2UgbGFuZHNjYXBlKVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5TZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBDdXN0b21TY3JpcHRzLkZ1bGxTY3JlZW5CdXR0b25TdHlsZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5PbkNsaWNrID0gKGUpID0+XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBXZWJBdWRpb0hlbHBlci5QbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEN1c3RvbVNjcmlwdHMuUmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5SZW1vdmVDaGlsZChidXR0b24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBSdW5HYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBEb2N1bWVudC5Cb2R5LkFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgSHRtbDUuT25SZXNpemUgPSAoKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFdpbmRvdy5Jbm5lcldpZHRoIDwgV2luZG93LklubmVySGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnYW1lLklzQWN0aXZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZS5Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEb2N1bWVudC5Cb2R5LlJlbW92ZUNoaWxkKEh0bWw1LkNhbnZhcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERvY3VtZW50LkJvZHkuQXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFnYW1lLklzQWN0aXZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5SZW1vdmVDaGlsZChidXR0b24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEb2N1bWVudC5Cb2R5LkFwcGVuZENoaWxkKEh0bWw1LkNhbnZhcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUuSXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSdW5HYW1lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBSdW5HYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdhbWUgPSBuZXcgUGh5c2ljc0dhbWUoKTtcclxuICAgICAgICAgICAgZ2FtZS5SdW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgQnJpZGdlO1xyXG5cclxubmFtZXNwYWNlIEZhcnNlZXJQaHlzaWNzLkRlbW9cclxue1xyXG4gICAgcHVibGljIGNsYXNzIEN1c3RvbVNjcmlwdHNcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgY29uc3Qgc3RyaW5nIEZ1bGxTY3JlZW5CdXR0b25TdHlsZSA9IEBcInBvc2l0aW9uOiBmaXhlZDtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgbGVmdDogNTAlO1xyXG4gICAgd2lkdGg6IDgwJTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xyXG4gICAgZm9udC1zaXplOiAzMHB4O1wiO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgUmVxdWVzdEZ1bGxTY3JlZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2NyaXB0LldyaXRlKEBcImlmIChkb2N1bWVudC5ib2R5LnJlcXVlc3RGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBlbHNlIGlmIChkb2N1bWVudC5ib2R5Lm1velJlcXVlc3RGdWxsU2NyZWVuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5Lm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZG9jdW1lbnQuYm9keS53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRvY3VtZW50LmJvZHkubXNSZXF1ZXN0RnVsbHNjcmVlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIElzTW9iaWxlRGV2aWNlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBTY3JpcHQuV3JpdGU8Ym9vbD4oXCJ3aW5kb3cub3JpZW50YXRpb24gIT09IHVuZGVmaW5lZFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBJc0Z1bGxTY3JlZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFNjcmlwdC5Xcml0ZTxib29sPihcImRvY3VtZW50LmZ1bGxTY3JlZW4gfHwgZG9jdW1lbnQubW96RnVsbFNjcmVlbiB8fCBkb2N1bWVudC53ZWJraXRJc0Z1bGxTY3JlZW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgRmFyc2VlclBoeXNpY3MuQ29tbW9uO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5EeW5hbWljcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuRmFjdG9yaWVzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5VdGlsaXR5O1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkF1ZGlvO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5NZWRpYTtcclxuXHJcbm5hbWVzcGFjZSBGYXJzZWVyUGh5c2ljcy5TYW1wbGVzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBZ2VudFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgQm9keSBfYWdlbnRCb2R5O1xyXG4gICAgICAgIHByaXZhdGUgU3ByaXRlIHNwcml0ZTtcclxuICAgICAgICBwcml2YXRlIFNwcml0ZUJhdGNoIF9iYXRjaDtcclxuICAgICAgICBwcml2YXRlIFNvdW5kRWZmZWN0IHNvdW5kO1xyXG4gICAgICAgIHByaXZhdGUgZmxvYXQgcmFkaXVzID0gMmY7XHJcbiAgICAgICAgcHJpdmF0ZSBGaXh0dXJlIGEsIGI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBBZ2VudChXb3JsZCB3b3JsZCwgU2NyZWVuTWFuYWdlciBzY3JlZW5NYW5hZ2VyLCBWZWN0b3IyIHBvc2l0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2JhdGNoID0gc2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaDtcclxuXHJcbiAgICAgICAgICAgIF9hZ2VudEJvZHkgPSBCb2R5RmFjdG9yeS5DcmVhdGVDaXJjbGUod29ybGQsIHJhZGl1cywgMWYpO1xyXG4gICAgICAgICAgICBfYWdlbnRCb2R5Lk1hc3MgPSAyMGY7XHJcbiAgICAgICAgICAgIF9hZ2VudEJvZHkuQm9keVR5cGUgPSBCb2R5VHlwZS5EeW5hbWljO1xyXG4gICAgICAgICAgICBfYWdlbnRCb2R5LlJlc3RpdHV0aW9uID0gMC41ZjtcclxuICAgICAgICAgICAgX2FnZW50Qm9keS5Qb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgICAgICBfYWdlbnRCb2R5Lk9uQ29sbGlzaW9uICs9IF9hZ2VudEJvZHlfT25Db2xsaXNpb247XHJcbiAgICAgICAgICAgIF9hZ2VudEJvZHkuT25TZXBhcmF0aW9uICs9IF9hZ2VudEJvZHlfT25TZXBhcmF0aW9uO1xyXG4gICAgICAgICAgICBzb3VuZCA9IHNjcmVlbk1hbmFnZXIuQ29udGVudC5Mb2FkPFNvdW5kRWZmZWN0PihcIkF1ZGlvL0NvbGxpc2lvblwiKTtcclxuICAgICAgICAgICAgdmFyIHRleCA9IHNjcmVlbk1hbmFnZXIuQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJBc3NldHMvQmFsbFwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vR0ZYXHJcbiAgICAgICAgICAgIHNwcml0ZSA9IG5ldyBTcHJpdGUodGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBfYWdlbnRCb2R5X09uU2VwYXJhdGlvbihGaXh0dXJlIGZpeHR1cmVBLCBGaXh0dXJlIGZpeHR1cmVCKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBfYWdlbnRCb2R5X09uQ29sbGlzaW9uKEZpeHR1cmUgZml4dHVyZUEsIEZpeHR1cmUgZml4dHVyZUIsIER5bmFtaWNzLkNvbnRhY3RzLkNvbnRhY3QgY29udGFjdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghKGZpeHR1cmVBID09IGEgJiYgZml4dHVyZUIgPT0gYiB8fCBmaXh0dXJlQSA9PSBiICYmIGZpeHR1cmVCID09IGEpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzb3VuZC5QbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYSA9IGZpeHR1cmVBO1xyXG4gICAgICAgICAgICBiID0gZml4dHVyZUI7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEJvZHkgQm9keVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIF9hZ2VudEJvZHk7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2JhdGNoLkRyYXcoc3ByaXRlLlRleHR1cmUsIENvbnZlcnRVbml0cy5Ub0Rpc3BsYXlVbml0cyhfYWdlbnRCb2R5LlBvc2l0aW9uKSwgbnVsbCwgQ29sb3IuV2hpdGUsIF9hZ2VudEJvZHkuUm90YXRpb24sIG5ldyBWZWN0b3IyKHNwcml0ZS5UZXh0dXJlLldpZHRoIC8gMmYsIHNwcml0ZS5UZXh0dXJlLkhlaWdodCAvIDJmKSwgKGZsb2F0KUNvbnZlcnRVbml0cy5Ub0Rpc3BsYXlVbml0cygxZikgKiByYWRpdXMgKiAyZiAvIChmbG9hdClzcHJpdGUuVGV4dHVyZS5XaWR0aCwgU3ByaXRlRWZmZWN0cy5Ob25lLCAwZik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgRmFyc2VlclBoeXNpY3MuQ29tbW9uO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5EeW5hbWljcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuRmFjdG9yaWVzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5VdGlsaXR5O1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcblxyXG5uYW1lc3BhY2UgRmFyc2VlclBoeXNpY3MuU2FtcGxlc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQm9yZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBCb2R5IF9ib3JkZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBTcHJpdGVCYXRjaCBfYmF0Y2g7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0dXJlMkQgdGV4dHVyZTtcclxuICAgICAgICBwcml2YXRlIGZsb2F0IHcsIGg7XHJcblxyXG4gICAgICAgIHB1YmxpYyBCb3JkZXIoV29ybGQgd29ybGQsIFNjcmVlbk1hbmFnZXIgc2NyZWVuTWFuYWdlciwgVmVjdG9yMiBwb3NpdGlvbiwgZmxvYXQgd2lkdGgsIGZsb2F0IGhlaWdodCwgVGV4dHVyZTJEIHRleClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHcgPSB3aWR0aDtcclxuICAgICAgICAgICAgaCA9IGhlaWdodDtcclxuICAgICAgICAgICAgX2JhdGNoID0gc2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaDtcclxuICAgICAgICAgICAgX2JvcmRlciA9IEJvZHlGYWN0b3J5LkNyZWF0ZVJlY3RhbmdsZSh3b3JsZCwgd2lkdGgsIGhlaWdodCwgMWYpO1xyXG4gICAgICAgICAgICBfYm9yZGVyLlBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgICAgIF9ib3JkZXIuQm9keVR5cGUgPSBCb2R5VHlwZS5TdGF0aWM7XHJcbiAgICAgICAgICAgIHRleHR1cmUgPSB0ZXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9iYXRjaC5EcmF3KHRleHR1cmUsIENvbnZlcnRVbml0cy5Ub0Rpc3BsYXlVbml0cyhfYm9yZGVyLlBvc2l0aW9uKSwgbnVsbCwgQ29sb3IuV2hpdGUsIDBmLCBuZXcgVmVjdG9yMih0ZXh0dXJlLldpZHRoIC8gMmYsIHRleHR1cmUuSGVpZ2h0IC8gMmYpLCBuZXcgVmVjdG9yMihDb252ZXJ0VW5pdHMuVG9EaXNwbGF5VW5pdHMoMWYpICogdyAvIHRleHR1cmUuV2lkdGgsIENvbnZlcnRVbml0cy5Ub0Rpc3BsYXlVbml0cygxZikgKiBoIC8gdGV4dHVyZS5IZWlnaHQpLCBTcHJpdGVFZmZlY3RzLk5vbmUsIDBmKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlNhbXBsZXM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkNvbGxpc2lvbi5TaGFwZXM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkNvbW1vbjtcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuRHluYW1pY3M7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkZhY3RvcmllcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuVXRpbGl0eTtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5BdWRpbztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuTWVkaWE7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0LlRvdWNoO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5JbnB1dDtcclxuXHJcbm5hbWVzcGFjZSBGYXJzZWVyUGh5c2ljcy5TYW1wbGVzLkRlbW9zXHJcbntcclxuICAgIGludGVybmFsIGNsYXNzIERlbW9HYW1lU2NyZWVuIDogUGh5c2ljc0dhbWVTY3JlZW5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIGNvbnN0IGludCBQeXJhbWlkQmFzZUJvZHlDb3VudCA9IDE0O1xyXG4gICAgICAgIHByaXZhdGUgVGV4dHVyZTJEIGJhY2tncm91bmQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgUHlyYW1pZCBfcHlyYW1pZDtcclxuICAgICAgICBwcml2YXRlIEFnZW50IGFnZW50O1xyXG4gICAgICAgIHByaXZhdGUgQm9yZGVyIGIxLCBiMiwgYjMsIGI0O1xyXG4gICAgICAgIHByaXZhdGUgVmVjdG9yMiB0b3VjaE9uLCB0b3VjaE9mZjtcclxuICAgICAgICBwcml2YXRlIGJvb2wgZGlkUHJlc3MgPSBmYWxzZTtcclxuICAgICAgICBwcml2YXRlIFNvbmcgc29uZztcclxuICAgICAgICBwcml2YXRlIGJvb2wgbXVzaWNTdGFydGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHB1YmxpYyBEZW1vR2FtZVNjcmVlbihTY3JlZW5NYW5hZ2VyIHNjcmVlbk1hbmFnZXIpIDogYmFzZShzY3JlZW5NYW5hZ2VyKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIExvYWRDb250ZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuTG9hZENvbnRlbnQoKTtcclxuICAgICAgICAgICAgZmxvYXQgd29ybGRSYXRpbyA9IChmbG9hdClTY3JlZW5NYW5hZ2VyLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkhlaWdodCAvIDM1ZjtcclxuICAgICAgICAgICAgZmxvYXQgZnJhbWVXaWR0aCA9IDUwZjtcclxuICAgICAgICAgICAgZmxvYXQgZnJhbWVIZWlnaHQgPSAzMGY7XHJcbiAgICAgICAgICAgIGZsb2F0IGZyYW1lVGhpY2sgPSAxZjtcclxuICAgICAgICAgICAgVmVjdG9yMiBmcmFtZVN0YXJ0UG9zID0gbmV3IFZlY3RvcjIoMWYsIDJmKTtcclxuICAgICAgICAgICAgV29ybGQuR3Jhdml0eSA9IG5ldyBWZWN0b3IyKDBmLCA4MGYpO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kID0gU2NyZWVuTWFuYWdlci5Db250ZW50LkxvYWQ8VGV4dHVyZTJEPihcIkFzc2V0cy9CYWNrZ3JvdW5kXCIpO1xyXG4gICAgICAgICAgICBfcHlyYW1pZCA9IG5ldyBQeXJhbWlkKFdvcmxkLCBTY3JlZW5NYW5hZ2VyLCBuZXcgVmVjdG9yMigzNWYsIDMzZiksIDUsIDFmKTtcclxuICAgICAgICAgICAgYWdlbnQgPSBuZXcgQWdlbnQoV29ybGQsIFNjcmVlbk1hbmFnZXIsIG5ldyBWZWN0b3IyKDVmLCAyOGYpKTtcclxuICAgICAgICAgICAgYjEgPSBuZXcgQm9yZGVyKFdvcmxkLCBTY3JlZW5NYW5hZ2VyLCBuZXcgVmVjdG9yMihmcmFtZVN0YXJ0UG9zLlgsIGZyYW1lU3RhcnRQb3MuWSArIGZyYW1lSGVpZ2h0IC8gMmYpLCBmcmFtZVRoaWNrLCBmcmFtZUhlaWdodCwgX3B5cmFtaWQudGV4KTtcclxuICAgICAgICAgICAgYjIgPSBuZXcgQm9yZGVyKFdvcmxkLCBTY3JlZW5NYW5hZ2VyLCBuZXcgVmVjdG9yMihmcmFtZVN0YXJ0UG9zLlggKyBmcmFtZVdpZHRoLCBmcmFtZVN0YXJ0UG9zLlkgKyBmcmFtZUhlaWdodCAvIDJmKSwgZnJhbWVUaGljaywgZnJhbWVIZWlnaHQsIF9weXJhbWlkLnRleCk7XHJcbiAgICAgICAgICAgIGIzID0gbmV3IEJvcmRlcihXb3JsZCwgU2NyZWVuTWFuYWdlciwgbmV3IFZlY3RvcjIoZnJhbWVTdGFydFBvcy5YICsgZnJhbWVXaWR0aCAvIDJmLCBmcmFtZVN0YXJ0UG9zLlkpLCBmcmFtZVdpZHRoLCBmcmFtZVRoaWNrLCBfcHlyYW1pZC50ZXgpO1xyXG4gICAgICAgICAgICBiNCA9IG5ldyBCb3JkZXIoV29ybGQsIFNjcmVlbk1hbmFnZXIsIG5ldyBWZWN0b3IyKGZyYW1lU3RhcnRQb3MuWCArIGZyYW1lV2lkdGggLyAyZiwgZnJhbWVTdGFydFBvcy5ZICsgZnJhbWVIZWlnaHQpLCBmcmFtZVdpZHRoLCBmcmFtZVRoaWNrLCBfcHlyYW1pZC50ZXgpO1xyXG4gICAgICAgICAgICBzb25nID0gU2NyZWVuTWFuYWdlci5Db250ZW50LkxvYWQ8U29uZz4oXCJBdWRpby9DZWx0aWNIYXJwc1wiKTtcclxuICAgICAgICAgICAgTWVkaWFQbGF5ZXIuSXNSZXBlYXRpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgVXBkYXRlKEdhbWVUaW1lIGdhbWVUaW1lLCBib29sIG90aGVyU2NyZWVuSGFzRm9jdXMsIGJvb2wgY292ZXJlZEJ5T3RoZXJTY3JlZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIW11c2ljU3RhcnRlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTWVkaWFQbGF5ZXIuUGxheTxnbG9iYWw6Ok1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLk1lZGlhLlNvbmc+KHNvbmcpO1xyXG4gICAgICAgICAgICAgICAgbXVzaWNTdGFydGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBiYXNlLlVwZGF0ZShnYW1lVGltZSwgb3RoZXJTY3JlZW5IYXNGb2N1cywgY292ZXJlZEJ5T3RoZXJTY3JlZW4pO1xyXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBUb3VjaFBhbmVsLkdldFN0YXRlKCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0b3VjaCBpbiBzdGF0ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0b3VjaC5TdGF0ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFRvdWNoTG9jYXRpb25TdGF0ZS5QcmVzc2VkOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL01lZGlhUGxheWVyLlBsYXkoc29uZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoT24gPSB0b3VjaC5Qb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBUb3VjaExvY2F0aW9uU3RhdGUuUmVsZWFzZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoT2ZmID0gdG91Y2guUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JjZSA9IHRvdWNoT2ZmIC0gdG91Y2hPbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWdlbnQuQm9keS5BcHBseUZvcmNlKFZlY3RvcjIuTXVsdGlwbHkoZm9yY2UsIDMwMGYpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBtb3VzZSA9IE1vdXNlLkdldFN0YXRlKCk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobW91c2UuTGVmdEJ1dHRvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdXR0b25TdGF0ZS5QcmVzc2VkOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGlkUHJlc3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE9uID0gbmV3IFZlY3RvcjIobW91c2UuUG9zaXRpb24uWCwgbW91c2UuUG9zaXRpb24uWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZFByZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9NZWRpYVBsYXllci5QbGF5KHNvbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQnV0dG9uU3RhdGUuUmVsZWFzZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpZFByZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hPZmYgPSBuZXcgVmVjdG9yMihtb3VzZS5Qb3NpdGlvbi5YLCBtb3VzZS5Qb3NpdGlvbi5ZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcmNlID0gdG91Y2hPZmYgLSB0b3VjaE9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZ2VudC5Cb2R5LkFwcGx5Rm9yY2UoVmVjdG9yMi5NdWx0aXBseShmb3JjZSwgMTUwZikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWRQcmVzcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgRHJhdyhHYW1lVGltZSBnYW1lVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbnZlcnRVbml0cy5TZXREaXNwbGF5VW5pdFRvU2ltVW5pdFJhdGlvKChmbG9hdClTY3JlZW5NYW5hZ2VyLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkhlaWdodCAvIDM1Zik7XHJcbiAgICAgICAgICAgIFNjcmVlbk1hbmFnZXIuU3ByaXRlQmF0Y2guQmVnaW4oMCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAgIFNjcmVlbk1hbmFnZXIuU3ByaXRlQmF0Y2guRHJhdyhiYWNrZ3JvdW5kLCBuZXcgVmVjdG9yMihTY3JlZW5NYW5hZ2VyLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LldpZHRoIC8gMmYsIFNjcmVlbk1hbmFnZXIuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuSGVpZ2h0IC8gMmYpLCBudWxsLCBDb2xvci5XaGl0ZSwgMGYsIG5ldyBWZWN0b3IyKGJhY2tncm91bmQuV2lkdGggLyAyZiwgYmFja2dyb3VuZC5IZWlnaHQgLyAyZiksIChmbG9hdClTY3JlZW5NYW5hZ2VyLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkhlaWdodCAvIChmbG9hdCliYWNrZ3JvdW5kLkhlaWdodCwgU3ByaXRlRWZmZWN0cy5Ob25lLCAwZik7XHJcbiAgICAgICAgICAgIFNjcmVlbk1hbmFnZXIuU3ByaXRlQmF0Y2guRW5kKCk7XHJcbiAgICAgICAgICAgIFNjcmVlbk1hbmFnZXIuU3ByaXRlQmF0Y2guQmVnaW4oMCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgQ2FtZXJhLlZpZXcpO1xyXG4gICAgICAgICAgICBfcHlyYW1pZC5EcmF3KCk7XHJcbiAgICAgICAgICAgIGFnZW50LkRyYXcoKTtcclxuICAgICAgICAgICAgYjEuRHJhdygpO1xyXG4gICAgICAgICAgICBiMi5EcmF3KCk7XHJcbiAgICAgICAgICAgIGIzLkRyYXcoKTtcclxuICAgICAgICAgICAgYjQuRHJhdygpO1xyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoLkVuZCgpO1xyXG4gICAgICAgICAgICBiYXNlLkRyYXcoZ2FtZVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuU2FtcGxlcy5EZW1vcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuVXRpbGl0eTtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcblxyXG5uYW1lc3BhY2UgRmFyc2VlclBoeXNpY3MuU2FtcGxlc1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gVGhpcyBpcyB0aGUgbWFpbiB0eXBlIGZvciB5b3VyIGdhbWVcclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgUGh5c2ljc0dhbWUgOiBHYW1lXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBHcmFwaGljc0RldmljZU1hbmFnZXIgX2dyYXBoaWNzO1xyXG5cclxuICAgICAgICBwdWJsaWMgUGh5c2ljc0dhbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2dyYXBoaWNzID0gbmV3IEdyYXBoaWNzRGV2aWNlTWFuYWdlcih0aGlzKTtcclxuICAgICAgICAgICAgLy9fZ3JhcGhpY3MuUHJlZmVycmVkQmFja0J1ZmZlcldpZHRoID0gMTkwMDtcclxuICAgICAgICAgICAgLy9fZ3JhcGhpY3MuUHJlZmVycmVkQmFja0J1ZmZlckhlaWdodCA9IDEwMDA7XHJcbiAgICAgICAgICAgIENvbnZlcnRVbml0cy5TZXREaXNwbGF5VW5pdFRvU2ltVW5pdFJhdGlvKChmbG9hdClHcmFwaGljc0RldmljZS5WaWV3cG9ydC5IZWlnaHQgLyAzNWYpO1xyXG4gICAgICAgICAgICBJc0ZpeGVkVGltZVN0ZXAgPSB0cnVlO1xyXG4gICAgICAgICAgICBfZ3JhcGhpY3MuSXNGdWxsU2NyZWVuID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBDb250ZW50LlJvb3REaXJlY3RvcnkgPSBcIkNvbnRlbnRcIjtcclxuXHJcbiAgICAgICAgICAgIC8vbmV3LXVwIGNvbXBvbmVudHMgYW5kIGFkZCB0byBHYW1lLkNvbXBvbmVudHNcclxuICAgICAgICAgICAgU2NyZWVuTWFuYWdlciA9IG5ldyBTY3JlZW5NYW5hZ2VyKHRoaXMpO1xyXG4gICAgICAgICAgICBDb21wb25lbnRzLkFkZChTY3JlZW5NYW5hZ2VyKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU2NyZWVuTWFuYWdlciBTY3JlZW5NYW5hZ2VyIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBBbGxvd3MgdGhlIGdhbWUgdG8gcGVyZm9ybSBhbnkgaW5pdGlhbGl6YXRpb24gaXQgbmVlZHMgdG8gYmVmb3JlIHN0YXJ0aW5nIHRvIHJ1bi5cclxuICAgICAgICAvLy8gVGhpcyBpcyB3aGVyZSBpdCBjYW4gcXVlcnkgZm9yIGFueSByZXF1aXJlZCBzZXJ2aWNlcyBhbmQgbG9hZCBhbnkgbm9uLWdyYXBoaWNcclxuICAgICAgICAvLy8gcmVsYXRlZCBjb250ZW50LiAgQ2FsbGluZyBiYXNlLkluaXRpYWxpemUgd2lsbCBlbnVtZXJhdGUgdGhyb3VnaCBhbnkgY29tcG9uZW50c1xyXG4gICAgICAgIC8vLyBhbmQgaW5pdGlhbGl6ZSB0aGVtIGFzIHdlbGwuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBJbml0aWFsaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuSW5pdGlhbGl6ZSgpO1xyXG5cclxuICAgICAgICAgICAgRGVtb0dhbWVTY3JlZW4gZGVtbyA9IG5ldyBEZW1vR2FtZVNjcmVlbihTY3JlZW5NYW5hZ2VyKTtcclxuXHJcblxyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyLkFkZFNjcmVlbihkZW1vKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuQ29sbGlzaW9uLlNoYXBlcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuQ29tbW9uO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5EeW5hbWljcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuRmFjdG9yaWVzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5VdGlsaXR5O1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkF1ZGlvO1xyXG5cclxubmFtZXNwYWNlIEZhcnNlZXJQaHlzaWNzLlNhbXBsZXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFB5cmFtaWRcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIFNwcml0ZSBfYm94O1xyXG4gICAgICAgIHByaXZhdGUgTGlzdDxCb2R5PiBfYm94ZXM7XHJcbiAgICAgICAgcHJpdmF0ZSBTcHJpdGVCYXRjaCBfYmF0Y2g7XHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdCB3aWR0aCA9IDNmO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0dXJlMkQgdGV4O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBQeXJhbWlkKFdvcmxkIHdvcmxkLCBTY3JlZW5NYW5hZ2VyIHNjcmVlbk1hbmFnZXIsIFZlY3RvcjIgcG9zaXRpb24sIGludCBjb3VudCwgZmxvYXQgZGVuc2l0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9iYXRjaCA9IHNjcmVlbk1hbmFnZXIuU3ByaXRlQmF0Y2g7XHJcblxyXG4gICAgICAgICAgICBWZXJ0aWNlcyByZWN0ID0gUG9seWdvblRvb2xzLkNyZWF0ZVJlY3RhbmdsZSh3aWR0aCAvIDJmLCB3aWR0aCAvIDJmKTtcclxuICAgICAgICAgICAgUG9seWdvblNoYXBlIHNoYXBlID0gbmV3IFBvbHlnb25TaGFwZShyZWN0LCBkZW5zaXR5KTtcclxuXHJcbiAgICAgICAgICAgIFZlY3RvcjIgcm93U3RhcnQgPSBwb3NpdGlvbjtcclxuICAgICAgICAgICAgcm93U3RhcnQuWSAtPSAwLjVmICsgY291bnQgKiB3aWR0aCAqIDEuMWY7XHJcblxyXG4gICAgICAgICAgICBWZWN0b3IyIGRlbHRhUm93ID0gbmV3IFZlY3RvcjIoLSh3aWR0aCArIDAuMmYpIC8gMmYsIHdpZHRoICsgMC4xZik7XHJcbiAgICAgICAgICAgIGZsb2F0IHNwYWNpbmcgPSB3aWR0aCArIDAuNWY7XHJcblxyXG4gICAgICAgICAgICBfYm94ZXMgPSBuZXcgTGlzdDxCb2R5PigpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBjb3VudDsgKytpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBWZWN0b3IyIHBvcyA9IHJvd1N0YXJ0O1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgaSArIDE7ICsrailcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBCb2R5IGJvZHkgPSBCb2R5RmFjdG9yeS5DcmVhdGVCb2R5KHdvcmxkKTtcclxuICAgICAgICAgICAgICAgICAgICBib2R5LkJvZHlUeXBlID0gQm9keVR5cGUuRHluYW1pYztcclxuICAgICAgICAgICAgICAgICAgICBib2R5LlBvc2l0aW9uID0gcG9zO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvZHkuQ3JlYXRlRml4dHVyZShzaGFwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2JveGVzLkFkZChib2R5KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zLlggKz0gc3BhY2luZztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByb3dTdGFydCArPSBkZWx0YVJvdztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGV4ID0gc2NyZWVuTWFuYWdlci5Db250ZW50LkxvYWQ8VGV4dHVyZTJEPihcIkFzc2V0cy9Cb3hcIik7XHJcbiAgICAgICAgICAgIC8vR0ZYXHJcbiAgICAgICAgICAgIF9ib3ggPSBuZXcgU3ByaXRlKHRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgX2JveGVzLkNvdW50OyArK2kpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9iYXRjaC5EcmF3KF9ib3guVGV4dHVyZSwgQ29udmVydFVuaXRzLlRvRGlzcGxheVVuaXRzKF9ib3hlc1tpXS5Qb3NpdGlvbiksIG51bGwsIENvbG9yLldoaXRlLCBfYm94ZXNbaV0uUm90YXRpb24sIG5ldyBWZWN0b3IyKF9ib3guVGV4dHVyZS5XaWR0aCAvIDJmLCBfYm94LlRleHR1cmUuSGVpZ2h0IC8gMmYpLCAoZmxvYXQpQ29udmVydFVuaXRzLlRvRGlzcGxheVVuaXRzKDFmKSAqIHdpZHRoIC8gKGZsb2F0KV9ib3guVGV4dHVyZS5XaWR0aCwgU3ByaXRlRWZmZWN0cy5Ob25lLCAwZik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXQp9Cg==
