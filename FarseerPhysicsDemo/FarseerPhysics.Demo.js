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
            } else {
                FarseerPhysics.Demo.App.RunGame();
            }
        },
        statics: {
            methods: {
                RunGame: function () {
                    var game = new FarseerPhysics.Samples.PhysicsGame();
                    game.Run();
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
                }
            }
        }
    });

    Bridge.define("FarseerPhysics.Samples.Agent", {
        fields: {
            _agentBody: null,
            sprite: null,
            _batch: null,
            radius: 0
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
                var tex = screenManager.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "Assets/Ball");
                this.sprite = new FarseerPhysics.Utility.Sprite.$ctor1(tex);
            }
        },
        methods: {
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJGYXJzZWVyUGh5c2ljcy5EZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJDdXN0b21TY3JpcHRzLmNzIiwiQWdlbnQuY3MiLCJCb3JkZXIuY3MiLCJEZW1vR2FtZVNjcmVlbi5jcyIsIlBoeXNpY3NHYW1lLmNzIiwiUHlyYW1pZC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztZQWNZQSxJQUFJQTtnQkFFQUEsYUFBMkJBO2dCQUMzQkE7Z0JBQ0FBLDZCQUE2QkE7O2dCQUU3QkEsaUJBQWlCQSxVQUFDQTtvQkFFZEE7b0JBQ0FBLDBCQUEwQkE7b0JBQzFCQTs7Z0JBRUpBLDBCQUEwQkE7O2dCQUkxQkE7Ozs7OztvQkFNSkEsV0FBbUJBLElBQUlBO29CQUN2QkE7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNuQkFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBb0JBQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7OztvQkNOREEsT0FBT0E7Ozs7Ozs7Ozs0QkFoQkpBLE9BQWFBLGVBQTZCQTs7Z0JBRW5EQSxjQUFTQTs7Z0JBRVRBLGtCQUFhQSxrREFBeUJBLE9BQU9BO2dCQUM3Q0E7Z0JBQ0FBLDJCQUFzQkE7Z0JBQ3RCQTtnQkFDQUEsMkJBQXNCQTtnQkFDdEJBLFVBQVVBO2dCQUVWQSxjQUFTQSxJQUFJQSxxQ0FBT0E7Ozs7O2dCQVVwQkEsbUJBQVlBLHFCQUFnQkEsbURBQTRCQSxvQ0FBc0JBLE1BQU1BLDhDQUFhQSwwQkFBcUJBLElBQUlBLHVDQUFRQSxpQ0FBMkJBLG1DQUE2QkEsQUFBT0EsNERBQWtDQSxvQkFBY0EsQUFBT0EsMkJBQXNCQTs7Ozs7Ozs7Ozs7Ozs7NEJDckJwUUEsT0FBYUEsZUFBNkJBLFVBQWtCQSxPQUFhQSxRQUFjQTs7Z0JBRWpHQSxTQUFJQTtnQkFDSkEsU0FBSUE7Z0JBQ0pBLGNBQVNBO2dCQUNUQSxlQUFVQSxxREFBNEJBLE9BQU9BLE9BQU9BO2dCQUNwREEsd0JBQW1CQTtnQkFDbkJBLHdCQUFtQkE7Z0JBQ25CQSxlQUFVQTs7Ozs7Z0JBS1ZBLGlCQUFZQSxjQUFTQSxtREFBNEJBLGlDQUFtQkEsTUFBTUEsbURBQWlCQSxJQUFJQSx1Q0FBUUEsMEJBQW9CQSw0QkFBc0JBLElBQUlBLHVDQUFRQSw0REFBa0NBLFNBQUlBLG9CQUFlQSw0REFBa0NBLFNBQUlBLHNCQUFpQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQ0p2UEE7O3lFQUFvQ0E7Ozs7O2dCQU10REE7Z0JBQ0FBLGlCQUFtQkEsQUFBT0E7Z0JBQzFCQTtnQkFDQUE7Z0JBQ0FBO2dCQUNBQSxvQkFBd0JBLElBQUlBO2dCQUM1QkEscUJBQWdCQSxJQUFJQTtnQkFDcEJBLGtCQUFhQTtnQkFDYkEsZ0JBQVdBLElBQUlBLCtCQUFRQSxZQUFPQSxvQkFBZUEsSUFBSUE7Z0JBQ2pEQSxhQUFRQSxJQUFJQSw2QkFBTUEsWUFBT0Esb0JBQWVBLElBQUlBO2dCQUM1Q0EsVUFBS0EsSUFBSUEsOEJBQU9BLFlBQU9BLG9CQUFlQSxJQUFJQSx1Q0FBUUEsaUJBQWlCQSxrQkFBa0JBLG9CQUFtQkEsWUFBWUEsYUFBYUE7Z0JBQ2pJQSxVQUFLQSxJQUFJQSw4QkFBT0EsWUFBT0Esb0JBQWVBLElBQUlBLHVDQUFRQSxrQkFBa0JBLFlBQVlBLGtCQUFrQkEsb0JBQW1CQSxZQUFZQSxhQUFhQTtnQkFDOUlBLFVBQUtBLElBQUlBLDhCQUFPQSxZQUFPQSxvQkFBZUEsSUFBSUEsdUNBQVFBLGtCQUFrQkEsa0JBQWlCQSxrQkFBa0JBLFlBQVlBLFlBQVlBO2dCQUMvSEEsVUFBS0EsSUFBSUEsOEJBQU9BLFlBQU9BLG9CQUFlQSxJQUFJQSx1Q0FBUUEsa0JBQWtCQSxrQkFBaUJBLGtCQUFrQkEsY0FBY0EsWUFBWUEsWUFBWUE7OzhCQUdySEEsVUFBbUJBLHFCQUEwQkE7O2dCQUVyRUEscUVBQVlBLFVBQVVBLHFCQUFxQkE7Z0JBQzNDQSxZQUFZQTtnQkFDWkEsMEJBQXNCQTs7Ozt3QkFFbEJBLFFBQVFBOzRCQUVKQSxLQUFLQTtnQ0FDREEsZUFBVUE7Z0NBQ1ZBOzRCQUNKQSxLQUFLQTtnQ0FDREEsZ0JBQVdBO2dDQUNYQSxZQUFZQSx1RUFBV0E7Z0NBQ3ZCQSwyQkFBc0JBLDJDQUFpQkE7Z0NBQ3ZDQTs7Ozs7Ozs7Z0JBSVpBLFlBQVlBO2dCQUNaQSxRQUFRQTtvQkFFSkEsS0FBS0E7d0JBQ0RBLElBQUlBLENBQUNBOzRCQUVEQSxlQUFVQSxJQUFJQSx1Q0FBUUEsa0JBQWtCQTs0QkFDeENBOzt3QkFFSkE7b0JBQ0pBLEtBQUtBO3dCQUNEQSxJQUFJQTs0QkFFQUEsZ0JBQVdBLElBQUlBLHVDQUFRQSxrQkFBa0JBOzRCQUN6Q0EsYUFBWUEsdUVBQVdBOzRCQUN2QkEsMkJBQXNCQSwyQ0FBaUJBOzRCQUN2Q0E7O3dCQUVKQTs7OzRCQUljQTtnQkFFdEJBLGlFQUEwQ0EsQUFBT0E7Z0JBQ2pEQSwwQ0FBbUNBLE1BQU1BLE1BQU1BLE1BQU1BLE1BQU1BLE1BQU1BO2dCQUNqRUEsc0NBQStCQSxpQkFBWUEsSUFBSUEsdUNBQVFBLHdEQUFrREEsMERBQW9EQSxNQUFNQSxtREFBaUJBLElBQUlBLHVDQUFRQSw2QkFBdUJBLCtCQUF5QkEsQUFBT0Esb0RBQStDQSxBQUFPQSx3QkFBbUJBO2dCQUNoVUE7Z0JBQ0FBLDBDQUFtQ0EsTUFBTUEsTUFBTUEsTUFBTUEsTUFBTUEsTUFBTUE7Z0JBQ2pFQTtnQkFDQUE7Z0JBQ0FBO2dCQUNBQTtnQkFDQUE7Z0JBQ0FBO2dCQUNBQTtnQkFDQUEsbUVBQVVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JDdEZWQSxpQkFBWUEsSUFBSUEsOENBQXNCQTtnQkFHdENBLGlFQUEwQ0EsQUFBT0E7Z0JBQ2pEQTtnQkFDQUE7O2dCQUVBQTs7Z0JBR0FBLHFCQUFnQkEsSUFBSUEscUNBQWNBO2dCQUNsQ0Esb0JBQWVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQWNmQTs7Z0JBRUFBLFdBQXNCQSxJQUFJQSw0Q0FBZUE7OztnQkFHekNBLDZCQUF3QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkMzQmJBLE9BQWFBLGVBQTZCQSxVQUFrQkEsT0FBV0E7O2dCQUVsRkEsY0FBU0E7O2dCQUVUQSxXQUFnQkEsbURBQTZCQSxrQkFBWUE7Z0JBQ3pEQSxZQUFxQkEsSUFBSUEsb0RBQWFBLE1BQU1BOztnQkFFNUNBLGVBQW1CQTtnQkFDbkJBLGNBQWNBLE1BQU9BLFFBQVFBOztnQkFFN0JBLGVBQW1CQSxJQUFJQSx1Q0FBUUEsQ0FBQ0EsQ0FBQ0EseUJBQW9CQTtnQkFDckRBLGNBQWdCQTs7Z0JBRWhCQSxjQUFTQSxLQUFJQTs7Z0JBRWJBLEtBQUtBLFdBQVdBLElBQUlBLE9BQVNBO29CQUV6QkEsVUFBY0E7O29CQUVkQSxLQUFLQSxXQUFXQSxJQUFJQSxlQUFTQTt3QkFFekJBLFdBQVlBLGdEQUF1QkE7d0JBQ25DQSxnQkFBZ0JBO3dCQUNoQkEsZ0JBQWdCQTt3QkFDaEJBLG1CQUFtQkE7d0JBQ25CQSxnQkFBV0E7O3dCQUVYQSxTQUFTQTs7O29CQUdiQSwwRUFBWUE7OztnQkFHaEJBLFdBQU1BO2dCQUVOQSxZQUFPQSxJQUFJQSxxQ0FBT0E7Ozs7O2dCQUtsQkEsS0FBS0EsV0FBV0EsSUFBSUEsbUJBQWdCQTtvQkFFaENBLG1CQUFZQSxtQkFBY0EsbURBQTRCQSxvQkFBT0EsdUJBQWNBLE1BQU1BLDhDQUFhQSxvQkFBT0EsYUFBYUEsSUFBSUEsdUNBQVFBLCtCQUF5QkEsaUNBQTJCQSxBQUFPQSw0REFBa0NBLGFBQVFBLEFBQU9BLHlCQUFvQkEiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIEJyaWRnZTtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuU2FtcGxlcztcclxuXHJcbm5hbWVzcGFjZSBGYXJzZWVyUGh5c2ljcy5EZW1vXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoQ3VzdG9tU2NyaXB0cy5Jc01vYmlsZURldmljZSgpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBIVE1MQnV0dG9uRWxlbWVudCBidXR0b24gPSBuZXcgSFRNTEJ1dHRvbkVsZW1lbnQoKTtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5Jbm5lckhUTUwgPSBcIkZ1bGxzY3JlZW4gRXhwZXJpZW5jZSAodXNlIGxhbmRzY2FwZSlcIjtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5TZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBDdXN0b21TY3JpcHRzLkZ1bGxTY3JlZW5CdXR0b25TdHlsZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnV0dG9uLk9uQ2xpY2sgPSAoZSkgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDdXN0b21TY3JpcHRzLlJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5SZW1vdmVDaGlsZChidXR0b24pO1xyXG4gICAgICAgICAgICAgICAgICAgIFJ1bkdhbWUoKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBEb2N1bWVudC5Cb2R5LkFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSdW5HYW1lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBSdW5HYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBoeXNpY3NHYW1lIGdhbWUgPSBuZXcgUGh5c2ljc0dhbWUoKTtcclxuICAgICAgICAgICAgZ2FtZS5SdW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgQnJpZGdlO1xyXG5cclxubmFtZXNwYWNlIEZhcnNlZXJQaHlzaWNzLkRlbW9cclxue1xyXG4gICAgcHVibGljIGNsYXNzIEN1c3RvbVNjcmlwdHNcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgY29uc3Qgc3RyaW5nIEZ1bGxTY3JlZW5CdXR0b25TdHlsZSA9IEBcInBvc2l0aW9uOiBmaXhlZDtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgbGVmdDogNTAlO1xyXG4gICAgd2lkdGg6IDgwJTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xyXG4gICAgZm9udC1zaXplOiAzMHB4O1wiO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgUmVxdWVzdEZ1bGxTY3JlZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2NyaXB0LldyaXRlKEBcImlmIChkb2N1bWVudC5ib2R5LnJlcXVlc3RGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBlbHNlIGlmIChkb2N1bWVudC5ib2R5Lm1velJlcXVlc3RGdWxsU2NyZWVuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5Lm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZG9jdW1lbnQuYm9keS53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRvY3VtZW50LmJvZHkubXNSZXF1ZXN0RnVsbHNjcmVlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIElzTW9iaWxlRGV2aWNlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBTY3JpcHQuV3JpdGU8Ym9vbD4oXCJ3aW5kb3cub3JpZW50YXRpb24gIT09IHVuZGVmaW5lZFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBGYXJzZWVyUGh5c2ljcy5Db21tb247XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkR5bmFtaWNzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5GYWN0b3JpZXM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlV0aWxpdHk7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxuXHJcbm5hbWVzcGFjZSBGYXJzZWVyUGh5c2ljcy5TYW1wbGVzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBZ2VudFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgQm9keSBfYWdlbnRCb2R5O1xyXG4gICAgICAgIHByaXZhdGUgU3ByaXRlIHNwcml0ZTtcclxuICAgICAgICBwcml2YXRlIFNwcml0ZUJhdGNoIF9iYXRjaDtcclxuICAgICAgICBwcml2YXRlIGZsb2F0IHJhZGl1cyA9IDJmO1xyXG5cclxuICAgICAgICBwdWJsaWMgQWdlbnQoV29ybGQgd29ybGQsIFNjcmVlbk1hbmFnZXIgc2NyZWVuTWFuYWdlciwgVmVjdG9yMiBwb3NpdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9iYXRjaCA9IHNjcmVlbk1hbmFnZXIuU3ByaXRlQmF0Y2g7XHJcblxyXG4gICAgICAgICAgICBfYWdlbnRCb2R5ID0gQm9keUZhY3RvcnkuQ3JlYXRlQ2lyY2xlKHdvcmxkLCByYWRpdXMsIDFmKTtcclxuICAgICAgICAgICAgX2FnZW50Qm9keS5NYXNzID0gMjBmO1xyXG4gICAgICAgICAgICBfYWdlbnRCb2R5LkJvZHlUeXBlID0gQm9keVR5cGUuRHluYW1pYztcclxuICAgICAgICAgICAgX2FnZW50Qm9keS5SZXN0aXR1dGlvbiA9IDAuNWY7XHJcbiAgICAgICAgICAgIF9hZ2VudEJvZHkuUG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIHRleCA9IHNjcmVlbk1hbmFnZXIuQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJBc3NldHMvQmFsbFwiKTtcclxuICAgICAgICAgICAgLy9HRlhcclxuICAgICAgICAgICAgc3ByaXRlID0gbmV3IFNwcml0ZSh0ZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEJvZHkgQm9keVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIF9hZ2VudEJvZHk7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2JhdGNoLkRyYXcoc3ByaXRlLlRleHR1cmUsIENvbnZlcnRVbml0cy5Ub0Rpc3BsYXlVbml0cyhfYWdlbnRCb2R5LlBvc2l0aW9uKSwgbnVsbCwgQ29sb3IuV2hpdGUsIF9hZ2VudEJvZHkuUm90YXRpb24sIG5ldyBWZWN0b3IyKHNwcml0ZS5UZXh0dXJlLldpZHRoIC8gMmYsIHNwcml0ZS5UZXh0dXJlLkhlaWdodCAvIDJmKSwgKGZsb2F0KUNvbnZlcnRVbml0cy5Ub0Rpc3BsYXlVbml0cygxZikgKiByYWRpdXMgKiAyZiAvIChmbG9hdClzcHJpdGUuVGV4dHVyZS5XaWR0aCwgU3ByaXRlRWZmZWN0cy5Ob25lLCAwZik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgRmFyc2VlclBoeXNpY3MuQ29tbW9uO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5EeW5hbWljcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuRmFjdG9yaWVzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5VdGlsaXR5O1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcblxyXG5uYW1lc3BhY2UgRmFyc2VlclBoeXNpY3MuU2FtcGxlc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQm9yZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBCb2R5IF9ib3JkZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBTcHJpdGVCYXRjaCBfYmF0Y2g7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0dXJlMkQgdGV4dHVyZTtcclxuICAgICAgICBwcml2YXRlIGZsb2F0IHcsIGg7XHJcblxyXG4gICAgICAgIHB1YmxpYyBCb3JkZXIoV29ybGQgd29ybGQsIFNjcmVlbk1hbmFnZXIgc2NyZWVuTWFuYWdlciwgVmVjdG9yMiBwb3NpdGlvbiwgZmxvYXQgd2lkdGgsIGZsb2F0IGhlaWdodCwgVGV4dHVyZTJEIHRleClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHcgPSB3aWR0aDtcclxuICAgICAgICAgICAgaCA9IGhlaWdodDtcclxuICAgICAgICAgICAgX2JhdGNoID0gc2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaDtcclxuICAgICAgICAgICAgX2JvcmRlciA9IEJvZHlGYWN0b3J5LkNyZWF0ZVJlY3RhbmdsZSh3b3JsZCwgd2lkdGgsIGhlaWdodCwgMWYpO1xyXG4gICAgICAgICAgICBfYm9yZGVyLlBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgICAgIF9ib3JkZXIuQm9keVR5cGUgPSBCb2R5VHlwZS5TdGF0aWM7XHJcbiAgICAgICAgICAgIHRleHR1cmUgPSB0ZXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9iYXRjaC5EcmF3KHRleHR1cmUsIENvbnZlcnRVbml0cy5Ub0Rpc3BsYXlVbml0cyhfYm9yZGVyLlBvc2l0aW9uKSwgbnVsbCwgQ29sb3IuV2hpdGUsIDBmLCBuZXcgVmVjdG9yMih0ZXh0dXJlLldpZHRoIC8gMmYsIHRleHR1cmUuSGVpZ2h0IC8gMmYpLCBuZXcgVmVjdG9yMihDb252ZXJ0VW5pdHMuVG9EaXNwbGF5VW5pdHMoMWYpICogdyAvIHRleHR1cmUuV2lkdGgsIENvbnZlcnRVbml0cy5Ub0Rpc3BsYXlVbml0cygxZikgKiBoIC8gdGV4dHVyZS5IZWlnaHQpLCBTcHJpdGVFZmZlY3RzLk5vbmUsIDBmKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlNhbXBsZXM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkNvbGxpc2lvbi5TaGFwZXM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkNvbW1vbjtcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuRHluYW1pY3M7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkZhY3RvcmllcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuVXRpbGl0eTtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5JbnB1dC5Ub3VjaDtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuSW5wdXQ7XHJcblxyXG5uYW1lc3BhY2UgRmFyc2VlclBoeXNpY3MuU2FtcGxlcy5EZW1vc1xyXG57XHJcbiAgICBpbnRlcm5hbCBjbGFzcyBEZW1vR2FtZVNjcmVlbiA6IFBoeXNpY3NHYW1lU2NyZWVuXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBjb25zdCBpbnQgUHlyYW1pZEJhc2VCb2R5Q291bnQgPSAxNDtcclxuICAgICAgICBwcml2YXRlIFRleHR1cmUyRCBiYWNrZ3JvdW5kO1xyXG5cclxuICAgICAgICBwcml2YXRlIFB5cmFtaWQgX3B5cmFtaWQ7XHJcbiAgICAgICAgcHJpdmF0ZSBBZ2VudCBhZ2VudDtcclxuICAgICAgICBwcml2YXRlIEJvcmRlciBiMSwgYjIsIGIzLCBiNDtcclxuICAgICAgICBwcml2YXRlIFZlY3RvcjIgdG91Y2hPbiwgdG91Y2hPZmY7XHJcbiAgICAgICAgcHJpdmF0ZSBib29sIGRpZFByZXNzID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHB1YmxpYyBEZW1vR2FtZVNjcmVlbihTY3JlZW5NYW5hZ2VyIHNjcmVlbk1hbmFnZXIpIDogYmFzZShzY3JlZW5NYW5hZ2VyKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIExvYWRDb250ZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuTG9hZENvbnRlbnQoKTtcclxuICAgICAgICAgICAgZmxvYXQgd29ybGRSYXRpbyA9IChmbG9hdClTY3JlZW5NYW5hZ2VyLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkhlaWdodCAvIDM1ZjtcclxuICAgICAgICAgICAgZmxvYXQgZnJhbWVXaWR0aCA9IDUwZjtcclxuICAgICAgICAgICAgZmxvYXQgZnJhbWVIZWlnaHQgPSAzMGY7XHJcbiAgICAgICAgICAgIGZsb2F0IGZyYW1lVGhpY2sgPSAxZjtcclxuICAgICAgICAgICAgVmVjdG9yMiBmcmFtZVN0YXJ0UG9zID0gbmV3IFZlY3RvcjIoMWYsIDJmKTtcclxuICAgICAgICAgICAgV29ybGQuR3Jhdml0eSA9IG5ldyBWZWN0b3IyKDBmLCA4MGYpO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kID0gU2NyZWVuTWFuYWdlci5Db250ZW50LkxvYWQ8VGV4dHVyZTJEPihcIkFzc2V0cy9CYWNrZ3JvdW5kXCIpO1xyXG4gICAgICAgICAgICBfcHlyYW1pZCA9IG5ldyBQeXJhbWlkKFdvcmxkLCBTY3JlZW5NYW5hZ2VyLCBuZXcgVmVjdG9yMigzNWYsIDMzZiksIDUsIDFmKTtcclxuICAgICAgICAgICAgYWdlbnQgPSBuZXcgQWdlbnQoV29ybGQsIFNjcmVlbk1hbmFnZXIsIG5ldyBWZWN0b3IyKDVmLCAyOGYpKTtcclxuICAgICAgICAgICAgYjEgPSBuZXcgQm9yZGVyKFdvcmxkLCBTY3JlZW5NYW5hZ2VyLCBuZXcgVmVjdG9yMihmcmFtZVN0YXJ0UG9zLlgsIGZyYW1lU3RhcnRQb3MuWSArIGZyYW1lSGVpZ2h0IC8gMmYpLCBmcmFtZVRoaWNrLCBmcmFtZUhlaWdodCwgX3B5cmFtaWQudGV4KTtcclxuICAgICAgICAgICAgYjIgPSBuZXcgQm9yZGVyKFdvcmxkLCBTY3JlZW5NYW5hZ2VyLCBuZXcgVmVjdG9yMihmcmFtZVN0YXJ0UG9zLlggKyBmcmFtZVdpZHRoLCBmcmFtZVN0YXJ0UG9zLlkgKyBmcmFtZUhlaWdodCAvIDJmKSwgZnJhbWVUaGljaywgZnJhbWVIZWlnaHQsIF9weXJhbWlkLnRleCk7XHJcbiAgICAgICAgICAgIGIzID0gbmV3IEJvcmRlcihXb3JsZCwgU2NyZWVuTWFuYWdlciwgbmV3IFZlY3RvcjIoZnJhbWVTdGFydFBvcy5YICsgZnJhbWVXaWR0aCAvIDJmLCBmcmFtZVN0YXJ0UG9zLlkpLCBmcmFtZVdpZHRoLCBmcmFtZVRoaWNrLCBfcHlyYW1pZC50ZXgpO1xyXG4gICAgICAgICAgICBiNCA9IG5ldyBCb3JkZXIoV29ybGQsIFNjcmVlbk1hbmFnZXIsIG5ldyBWZWN0b3IyKGZyYW1lU3RhcnRQb3MuWCArIGZyYW1lV2lkdGggLyAyZiwgZnJhbWVTdGFydFBvcy5ZICsgZnJhbWVIZWlnaHQpLCBmcmFtZVdpZHRoLCBmcmFtZVRoaWNrLCBfcHlyYW1pZC50ZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgVXBkYXRlKEdhbWVUaW1lIGdhbWVUaW1lLCBib29sIG90aGVyU2NyZWVuSGFzRm9jdXMsIGJvb2wgY292ZXJlZEJ5T3RoZXJTY3JlZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLlVwZGF0ZShnYW1lVGltZSwgb3RoZXJTY3JlZW5IYXNGb2N1cywgY292ZXJlZEJ5T3RoZXJTY3JlZW4pO1xyXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBUb3VjaFBhbmVsLkdldFN0YXRlKCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0b3VjaCBpbiBzdGF0ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0b3VjaC5TdGF0ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFRvdWNoTG9jYXRpb25TdGF0ZS5QcmVzc2VkOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE9uID0gdG91Y2guUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVG91Y2hMb2NhdGlvblN0YXRlLlJlbGVhc2VkOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE9mZiA9IHRvdWNoLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9yY2UgPSB0b3VjaE9mZiAtIHRvdWNoT247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZW50LkJvZHkuQXBwbHlGb3JjZShWZWN0b3IyLk11bHRpcGx5KGZvcmNlLCAzMDBmKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgbW91c2UgPSBNb3VzZS5HZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG1vdXNlLkxlZnRCdXR0b24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQnV0dG9uU3RhdGUuUHJlc3NlZDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRpZFByZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hPbiA9IG5ldyBWZWN0b3IyKG1vdXNlLlBvc2l0aW9uLlgsIG1vdXNlLlBvc2l0aW9uLlkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWRQcmVzcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdXR0b25TdGF0ZS5SZWxlYXNlZDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlkUHJlc3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE9mZiA9IG5ldyBWZWN0b3IyKG1vdXNlLlBvc2l0aW9uLlgsIG1vdXNlLlBvc2l0aW9uLlkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9yY2UgPSB0b3VjaE9mZiAtIHRvdWNoT247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZW50LkJvZHkuQXBwbHlGb3JjZShWZWN0b3IyLk11bHRpcGx5KGZvcmNlLCAxNTBmKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZFByZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBEcmF3KEdhbWVUaW1lIGdhbWVUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ29udmVydFVuaXRzLlNldERpc3BsYXlVbml0VG9TaW1Vbml0UmF0aW8oKGZsb2F0KVNjcmVlbk1hbmFnZXIuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuSGVpZ2h0IC8gMzVmKTtcclxuICAgICAgICAgICAgU2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaC5CZWdpbigwLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgU2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaC5EcmF3KGJhY2tncm91bmQsIG5ldyBWZWN0b3IyKFNjcmVlbk1hbmFnZXIuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuV2lkdGggLyAyZiwgU2NyZWVuTWFuYWdlci5HcmFwaGljc0RldmljZS5WaWV3cG9ydC5IZWlnaHQgLyAyZiksIG51bGwsIENvbG9yLldoaXRlLCAwZiwgbmV3IFZlY3RvcjIoYmFja2dyb3VuZC5XaWR0aCAvIDJmLCBiYWNrZ3JvdW5kLkhlaWdodCAvIDJmKSwgKGZsb2F0KVNjcmVlbk1hbmFnZXIuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuSGVpZ2h0IC8gKGZsb2F0KWJhY2tncm91bmQuSGVpZ2h0LCBTcHJpdGVFZmZlY3RzLk5vbmUsIDBmKTtcclxuICAgICAgICAgICAgU2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaC5FbmQoKTtcclxuICAgICAgICAgICAgU2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaC5CZWdpbigwLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBDYW1lcmEuVmlldyk7XHJcbiAgICAgICAgICAgIF9weXJhbWlkLkRyYXcoKTtcclxuICAgICAgICAgICAgYWdlbnQuRHJhdygpO1xyXG4gICAgICAgICAgICBiMS5EcmF3KCk7XHJcbiAgICAgICAgICAgIGIyLkRyYXcoKTtcclxuICAgICAgICAgICAgYjMuRHJhdygpO1xyXG4gICAgICAgICAgICBiNC5EcmF3KCk7XHJcbiAgICAgICAgICAgIFNjcmVlbk1hbmFnZXIuU3ByaXRlQmF0Y2guRW5kKCk7XHJcbiAgICAgICAgICAgIGJhc2UuRHJhdyhnYW1lVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5TYW1wbGVzLkRlbW9zO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5VdGlsaXR5O1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxuXHJcbm5hbWVzcGFjZSBGYXJzZWVyUGh5c2ljcy5TYW1wbGVzXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBUaGlzIGlzIHRoZSBtYWluIHR5cGUgZm9yIHlvdXIgZ2FtZVxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBjbGFzcyBQaHlzaWNzR2FtZSA6IEdhbWVcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIEdyYXBoaWNzRGV2aWNlTWFuYWdlciBfZ3JhcGhpY3M7XHJcblxyXG4gICAgICAgIHB1YmxpYyBQaHlzaWNzR2FtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfZ3JhcGhpY3MgPSBuZXcgR3JhcGhpY3NEZXZpY2VNYW5hZ2VyKHRoaXMpO1xyXG4gICAgICAgICAgICAvL19ncmFwaGljcy5QcmVmZXJyZWRCYWNrQnVmZmVyV2lkdGggPSAxOTAwO1xyXG4gICAgICAgICAgICAvL19ncmFwaGljcy5QcmVmZXJyZWRCYWNrQnVmZmVySGVpZ2h0ID0gMTAwMDtcclxuICAgICAgICAgICAgQ29udmVydFVuaXRzLlNldERpc3BsYXlVbml0VG9TaW1Vbml0UmF0aW8oKGZsb2F0KUdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkhlaWdodCAvIDM1Zik7XHJcbiAgICAgICAgICAgIElzRml4ZWRUaW1lU3RlcCA9IHRydWU7XHJcbiAgICAgICAgICAgIF9ncmFwaGljcy5Jc0Z1bGxTY3JlZW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIENvbnRlbnQuUm9vdERpcmVjdG9yeSA9IFwiQ29udGVudFwiO1xyXG5cclxuICAgICAgICAgICAgLy9uZXctdXAgY29tcG9uZW50cyBhbmQgYWRkIHRvIEdhbWUuQ29tcG9uZW50c1xyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyID0gbmV3IFNjcmVlbk1hbmFnZXIodGhpcyk7XHJcbiAgICAgICAgICAgIENvbXBvbmVudHMuQWRkKFNjcmVlbk1hbmFnZXIpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTY3JlZW5NYW5hZ2VyIFNjcmVlbk1hbmFnZXIgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEFsbG93cyB0aGUgZ2FtZSB0byBwZXJmb3JtIGFueSBpbml0aWFsaXphdGlvbiBpdCBuZWVkcyB0byBiZWZvcmUgc3RhcnRpbmcgdG8gcnVuLlxyXG4gICAgICAgIC8vLyBUaGlzIGlzIHdoZXJlIGl0IGNhbiBxdWVyeSBmb3IgYW55IHJlcXVpcmVkIHNlcnZpY2VzIGFuZCBsb2FkIGFueSBub24tZ3JhcGhpY1xyXG4gICAgICAgIC8vLyByZWxhdGVkIGNvbnRlbnQuICBDYWxsaW5nIGJhc2UuSW5pdGlhbGl6ZSB3aWxsIGVudW1lcmF0ZSB0aHJvdWdoIGFueSBjb21wb25lbnRzXHJcbiAgICAgICAgLy8vIGFuZCBpbml0aWFsaXplIHRoZW0gYXMgd2VsbC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEluaXRpYWxpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Jbml0aWFsaXplKCk7XHJcblxyXG4gICAgICAgICAgICBEZW1vR2FtZVNjcmVlbiBkZW1vID0gbmV3IERlbW9HYW1lU2NyZWVuKFNjcmVlbk1hbmFnZXIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIFNjcmVlbk1hbmFnZXIuQWRkU2NyZWVuKGRlbW8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5Db2xsaXNpb24uU2hhcGVzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5Db21tb247XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkR5bmFtaWNzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5GYWN0b3JpZXM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlV0aWxpdHk7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxuXHJcbm5hbWVzcGFjZSBGYXJzZWVyUGh5c2ljcy5TYW1wbGVzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQeXJhbWlkXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBTcHJpdGUgX2JveDtcclxuICAgICAgICBwcml2YXRlIExpc3Q8Qm9keT4gX2JveGVzO1xyXG4gICAgICAgIHByaXZhdGUgU3ByaXRlQmF0Y2ggX2JhdGNoO1xyXG4gICAgICAgIHByaXZhdGUgZmxvYXQgd2lkdGggPSAzZjtcclxuICAgICAgICBwdWJsaWMgVGV4dHVyZTJEIHRleDtcclxuXHJcbiAgICAgICAgcHVibGljIFB5cmFtaWQoV29ybGQgd29ybGQsIFNjcmVlbk1hbmFnZXIgc2NyZWVuTWFuYWdlciwgVmVjdG9yMiBwb3NpdGlvbiwgaW50IGNvdW50LCBmbG9hdCBkZW5zaXR5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2JhdGNoID0gc2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaDtcclxuXHJcbiAgICAgICAgICAgIFZlcnRpY2VzIHJlY3QgPSBQb2x5Z29uVG9vbHMuQ3JlYXRlUmVjdGFuZ2xlKHdpZHRoIC8gMmYsIHdpZHRoIC8gMmYpO1xyXG4gICAgICAgICAgICBQb2x5Z29uU2hhcGUgc2hhcGUgPSBuZXcgUG9seWdvblNoYXBlKHJlY3QsIGRlbnNpdHkpO1xyXG5cclxuICAgICAgICAgICAgVmVjdG9yMiByb3dTdGFydCA9IHBvc2l0aW9uO1xyXG4gICAgICAgICAgICByb3dTdGFydC5ZIC09IDAuNWYgKyBjb3VudCAqIHdpZHRoICogMS4xZjtcclxuXHJcbiAgICAgICAgICAgIFZlY3RvcjIgZGVsdGFSb3cgPSBuZXcgVmVjdG9yMigtKHdpZHRoICsgMC4yZikgLyAyZiwgd2lkdGggKyAwLjFmKTtcclxuICAgICAgICAgICAgZmxvYXQgc3BhY2luZyA9IHdpZHRoICsgMC41ZjtcclxuXHJcbiAgICAgICAgICAgIF9ib3hlcyA9IG5ldyBMaXN0PEJvZHk+KCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGNvdW50OyArK2kpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFZlY3RvcjIgcG9zID0gcm93U3RhcnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBpICsgMTsgKytqKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEJvZHkgYm9keSA9IEJvZHlGYWN0b3J5LkNyZWF0ZUJvZHkod29ybGQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvZHkuQm9keVR5cGUgPSBCb2R5VHlwZS5EeW5hbWljO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvZHkuUG9zaXRpb24gPSBwb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9keS5DcmVhdGVGaXh0dXJlKHNoYXBlKTtcclxuICAgICAgICAgICAgICAgICAgICBfYm94ZXMuQWRkKGJvZHkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBwb3MuWCArPSBzcGFjaW5nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJvd1N0YXJ0ICs9IGRlbHRhUm93O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0ZXggPSBzY3JlZW5NYW5hZ2VyLkNvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiQXNzZXRzL0JveFwiKTtcclxuICAgICAgICAgICAgLy9HRlhcclxuICAgICAgICAgICAgX2JveCA9IG5ldyBTcHJpdGUodGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBfYm94ZXMuQ291bnQ7ICsraSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2JhdGNoLkRyYXcoX2JveC5UZXh0dXJlLCBDb252ZXJ0VW5pdHMuVG9EaXNwbGF5VW5pdHMoX2JveGVzW2ldLlBvc2l0aW9uKSwgbnVsbCwgQ29sb3IuV2hpdGUsIF9ib3hlc1tpXS5Sb3RhdGlvbiwgbmV3IFZlY3RvcjIoX2JveC5UZXh0dXJlLldpZHRoIC8gMmYsIF9ib3guVGV4dHVyZS5IZWlnaHQgLyAyZiksIChmbG9hdClDb252ZXJ0VW5pdHMuVG9EaXNwbGF5VW5pdHMoMWYpICogd2lkdGggLyAoZmxvYXQpX2JveC5UZXh0dXJlLldpZHRoLCBTcHJpdGVFZmZlY3RzLk5vbmUsIDBmKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdCn0K
