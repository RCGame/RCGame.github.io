/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 17.2.0
 */
Bridge.assembly("FarseerPhysics.Demo", function ($asm, globals) {
    "use strict";

    Bridge.define("FarseerPhysics.Demo.App", {
        main: function Main () {
            var game = new FarseerPhysics.Samples.PhysicsGame();
            game.Run();
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
                var frameStartPos = new Microsoft.Xna.Framework.Vector2.$ctor2(2.0, 2.0);
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
                                this.agent.Body.ApplyForce(Microsoft.Xna.Framework.Vector2.Multiply$1(force.$clone(), 200.0));
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJGYXJzZWVyUGh5c2ljcy5EZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJBZ2VudC5jcyIsIkJvcmRlci5jcyIsIkRlbW9HYW1lU2NyZWVuLmNzIiwiUGh5c2ljc0dhbWUuY3MiLCJQeXJhbWlkLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O1lBY1lBLFdBQW1CQSxJQUFJQTtZQUN2QkE7Ozs7Ozs7Ozs7Ozs7O29CQ2lCTUEsT0FBT0E7Ozs7Ozs7Ozs0QkFoQkpBLE9BQWFBLGVBQTZCQTs7Z0JBRW5EQSxjQUFTQTs7Z0JBRVRBLGtCQUFhQSxrREFBeUJBLE9BQU9BO2dCQUM3Q0E7Z0JBQ0FBLDJCQUFzQkE7Z0JBQ3RCQTtnQkFDQUEsMkJBQXNCQTtnQkFDdEJBLFVBQVVBO2dCQUVWQSxjQUFTQSxJQUFJQSxxQ0FBT0E7Ozs7O2dCQVVwQkEsbUJBQVlBLHFCQUFnQkEsbURBQTRCQSxvQ0FBc0JBLE1BQU1BLDhDQUFhQSwwQkFBcUJBLElBQUlBLHVDQUFRQSxpQ0FBMkJBLG1DQUE2QkEsQUFBT0EsNERBQWtDQSxvQkFBY0EsQUFBT0EsMkJBQXNCQTs7Ozs7Ozs7Ozs7Ozs7NEJDckJwUUEsT0FBYUEsZUFBNkJBLFVBQWtCQSxPQUFhQSxRQUFjQTs7Z0JBRWpHQSxTQUFJQTtnQkFDSkEsU0FBSUE7Z0JBQ0pBLGNBQVNBO2dCQUNUQSxlQUFVQSxxREFBNEJBLE9BQU9BLE9BQU9BO2dCQUNwREEsd0JBQW1CQTtnQkFDbkJBLHdCQUFtQkE7Z0JBQ25CQSxlQUFVQTs7Ozs7Z0JBS1ZBLGlCQUFZQSxjQUFTQSxtREFBNEJBLGlDQUFtQkEsTUFBTUEsbURBQWlCQSxJQUFJQSx1Q0FBUUEsMEJBQW9CQSw0QkFBc0JBLElBQUlBLHVDQUFRQSw0REFBa0NBLFNBQUlBLG9CQUFlQSw0REFBa0NBLFNBQUlBLHNCQUFpQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QWdCQTs7Z0JBRWhCQSxjQUFTQSxLQUFJQTs7Z0JBRWJBLEtBQUtBLFdBQVdBLElBQUlBLE9BQVNBO29CQUV6QkEsVUFBY0E7O29CQUVkQSxLQUFLQSxXQUFXQSxJQUFJQSxlQUFTQTt3QkFFekJBLFdBQVlBLGdEQUF1QkE7d0JBQ25DQSxnQkFBZ0JBO3dCQUNoQkEsZ0JBQWdCQTt3QkFDaEJBLG1CQUFtQkE7d0JBQ25CQSxnQkFBV0E7O3dCQUVYQSxTQUFTQTs7O29CQUdiQSwwRUFBWUE7OztnQkFHaEJBLFdBQU1BO2dCQUVOQSxZQUFPQSxJQUFJQSxxQ0FBT0E7Ozs7O2dCQUtsQkEsS0FBS0EsV0FBV0EsSUFBSUEsbUJBQWdCQTtvQkFFaENBLG1CQUFZQSxtQkFBY0EsbURBQTRCQSxvQkFBT0EsdUJBQWNBLE1BQU1BLDhDQUFhQSxvQkFBT0EsYUFBYUEsSUFBSUEsdUNBQVFBLCtCQUF5QkEsaUNBQTJCQSxBQUFPQSw0REFBa0NBLGFBQVFBLEFBQU9BLHlCQUFvQkEiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIEJyaWRnZTtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuU2FtcGxlcztcclxuXHJcbm5hbWVzcGFjZSBGYXJzZWVyUGh5c2ljcy5EZW1vXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQaHlzaWNzR2FtZSBnYW1lID0gbmV3IFBoeXNpY3NHYW1lKCk7XHJcbiAgICAgICAgICAgIGdhbWUuUnVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgRmFyc2VlclBoeXNpY3MuQ29tbW9uO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5EeW5hbWljcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuRmFjdG9yaWVzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5VdGlsaXR5O1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcblxyXG5uYW1lc3BhY2UgRmFyc2VlclBoeXNpY3MuU2FtcGxlc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQWdlbnRcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIEJvZHkgX2FnZW50Qm9keTtcclxuICAgICAgICBwcml2YXRlIFNwcml0ZSBzcHJpdGU7XHJcbiAgICAgICAgcHJpdmF0ZSBTcHJpdGVCYXRjaCBfYmF0Y2g7XHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdCByYWRpdXMgPSAyZjtcclxuXHJcbiAgICAgICAgcHVibGljIEFnZW50KFdvcmxkIHdvcmxkLCBTY3JlZW5NYW5hZ2VyIHNjcmVlbk1hbmFnZXIsIFZlY3RvcjIgcG9zaXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYmF0Y2ggPSBzY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoO1xyXG5cclxuICAgICAgICAgICAgX2FnZW50Qm9keSA9IEJvZHlGYWN0b3J5LkNyZWF0ZUNpcmNsZSh3b3JsZCwgcmFkaXVzLCAxZik7XHJcbiAgICAgICAgICAgIF9hZ2VudEJvZHkuTWFzcyA9IDIwZjtcclxuICAgICAgICAgICAgX2FnZW50Qm9keS5Cb2R5VHlwZSA9IEJvZHlUeXBlLkR5bmFtaWM7XHJcbiAgICAgICAgICAgIF9hZ2VudEJvZHkuUmVzdGl0dXRpb24gPSAwLjVmO1xyXG4gICAgICAgICAgICBfYWdlbnRCb2R5LlBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgICAgIHZhciB0ZXggPSBzY3JlZW5NYW5hZ2VyLkNvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiQXNzZXRzL0JhbGxcIik7XHJcbiAgICAgICAgICAgIC8vR0ZYXHJcbiAgICAgICAgICAgIHNwcml0ZSA9IG5ldyBTcHJpdGUodGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBCb2R5IEJvZHlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBfYWdlbnRCb2R5OyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9iYXRjaC5EcmF3KHNwcml0ZS5UZXh0dXJlLCBDb252ZXJ0VW5pdHMuVG9EaXNwbGF5VW5pdHMoX2FnZW50Qm9keS5Qb3NpdGlvbiksIG51bGwsIENvbG9yLldoaXRlLCBfYWdlbnRCb2R5LlJvdGF0aW9uLCBuZXcgVmVjdG9yMihzcHJpdGUuVGV4dHVyZS5XaWR0aCAvIDJmLCBzcHJpdGUuVGV4dHVyZS5IZWlnaHQgLyAyZiksIChmbG9hdClDb252ZXJ0VW5pdHMuVG9EaXNwbGF5VW5pdHMoMWYpICogcmFkaXVzICogMmYgLyAoZmxvYXQpc3ByaXRlLlRleHR1cmUuV2lkdGgsIFNwcml0ZUVmZmVjdHMuTm9uZSwgMGYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIEZhcnNlZXJQaHlzaWNzLkNvbW1vbjtcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuRHluYW1pY3M7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkZhY3RvcmllcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuVXRpbGl0eTtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG5cclxubmFtZXNwYWNlIEZhcnNlZXJQaHlzaWNzLlNhbXBsZXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEJvcmRlclxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgQm9keSBfYm9yZGVyO1xyXG4gICAgICAgIHByaXZhdGUgU3ByaXRlQmF0Y2ggX2JhdGNoO1xyXG4gICAgICAgIHByaXZhdGUgVGV4dHVyZTJEIHRleHR1cmU7XHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdCB3LCBoO1xyXG5cclxuICAgICAgICBwdWJsaWMgQm9yZGVyKFdvcmxkIHdvcmxkLCBTY3JlZW5NYW5hZ2VyIHNjcmVlbk1hbmFnZXIsIFZlY3RvcjIgcG9zaXRpb24sIGZsb2F0IHdpZHRoLCBmbG9hdCBoZWlnaHQsIFRleHR1cmUyRCB0ZXgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3ID0gd2lkdGg7XHJcbiAgICAgICAgICAgIGggPSBoZWlnaHQ7XHJcbiAgICAgICAgICAgIF9iYXRjaCA9IHNjcmVlbk1hbmFnZXIuU3ByaXRlQmF0Y2g7XHJcbiAgICAgICAgICAgIF9ib3JkZXIgPSBCb2R5RmFjdG9yeS5DcmVhdGVSZWN0YW5nbGUod29ybGQsIHdpZHRoLCBoZWlnaHQsIDFmKTtcclxuICAgICAgICAgICAgX2JvcmRlci5Qb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgICAgICBfYm9yZGVyLkJvZHlUeXBlID0gQm9keVR5cGUuU3RhdGljO1xyXG4gICAgICAgICAgICB0ZXh0dXJlID0gdGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYmF0Y2guRHJhdyh0ZXh0dXJlLCBDb252ZXJ0VW5pdHMuVG9EaXNwbGF5VW5pdHMoX2JvcmRlci5Qb3NpdGlvbiksIG51bGwsIENvbG9yLldoaXRlLCAwZiwgbmV3IFZlY3RvcjIodGV4dHVyZS5XaWR0aCAvIDJmLCB0ZXh0dXJlLkhlaWdodCAvIDJmKSwgbmV3IFZlY3RvcjIoQ29udmVydFVuaXRzLlRvRGlzcGxheVVuaXRzKDFmKSAqIHcgLyB0ZXh0dXJlLldpZHRoLCBDb252ZXJ0VW5pdHMuVG9EaXNwbGF5VW5pdHMoMWYpICogaCAvIHRleHR1cmUuSGVpZ2h0KSwgU3ByaXRlRWZmZWN0cy5Ob25lLCAwZik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5TYW1wbGVzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5Db2xsaXNpb24uU2hhcGVzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5Db21tb247XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkR5bmFtaWNzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5GYWN0b3JpZXM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlV0aWxpdHk7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuSW5wdXQuVG91Y2g7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0O1xyXG5cclxubmFtZXNwYWNlIEZhcnNlZXJQaHlzaWNzLlNhbXBsZXMuRGVtb3Ncclxue1xyXG4gICAgaW50ZXJuYWwgY2xhc3MgRGVtb0dhbWVTY3JlZW4gOiBQaHlzaWNzR2FtZVNjcmVlblxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgY29uc3QgaW50IFB5cmFtaWRCYXNlQm9keUNvdW50ID0gMTQ7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0dXJlMkQgYmFja2dyb3VuZDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBQeXJhbWlkIF9weXJhbWlkO1xyXG4gICAgICAgIHByaXZhdGUgQWdlbnQgYWdlbnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBCb3JkZXIgYjEsIGIyLCBiMywgYjQ7XHJcbiAgICAgICAgcHJpdmF0ZSBWZWN0b3IyIHRvdWNoT24sIHRvdWNoT2ZmO1xyXG4gICAgICAgIHByaXZhdGUgYm9vbCBkaWRQcmVzcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwdWJsaWMgRGVtb0dhbWVTY3JlZW4oU2NyZWVuTWFuYWdlciBzY3JlZW5NYW5hZ2VyKSA6IGJhc2Uoc2NyZWVuTWFuYWdlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBMb2FkQ29udGVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLkxvYWRDb250ZW50KCk7XHJcbiAgICAgICAgICAgIGZsb2F0IHdvcmxkUmF0aW8gPSAoZmxvYXQpU2NyZWVuTWFuYWdlci5HcmFwaGljc0RldmljZS5WaWV3cG9ydC5IZWlnaHQgLyAzNWY7XHJcbiAgICAgICAgICAgIGZsb2F0IGZyYW1lV2lkdGggPSA1MGY7XHJcbiAgICAgICAgICAgIGZsb2F0IGZyYW1lSGVpZ2h0ID0gMzBmO1xyXG4gICAgICAgICAgICBmbG9hdCBmcmFtZVRoaWNrID0gMWY7XHJcbiAgICAgICAgICAgIFZlY3RvcjIgZnJhbWVTdGFydFBvcyA9IG5ldyBWZWN0b3IyKDJmLCAyZik7XHJcbiAgICAgICAgICAgIFdvcmxkLkdyYXZpdHkgPSBuZXcgVmVjdG9yMigwZiwgODBmKTtcclxuICAgICAgICAgICAgYmFja2dyb3VuZCA9IFNjcmVlbk1hbmFnZXIuQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJBc3NldHMvQmFja2dyb3VuZFwiKTtcclxuICAgICAgICAgICAgX3B5cmFtaWQgPSBuZXcgUHlyYW1pZChXb3JsZCwgU2NyZWVuTWFuYWdlciwgbmV3IFZlY3RvcjIoMzVmLCAzM2YpLCA1LCAxZik7XHJcbiAgICAgICAgICAgIGFnZW50ID0gbmV3IEFnZW50KFdvcmxkLCBTY3JlZW5NYW5hZ2VyLCBuZXcgVmVjdG9yMig1ZiwgMjhmKSk7XHJcbiAgICAgICAgICAgIGIxID0gbmV3IEJvcmRlcihXb3JsZCwgU2NyZWVuTWFuYWdlciwgbmV3IFZlY3RvcjIoZnJhbWVTdGFydFBvcy5YLCBmcmFtZVN0YXJ0UG9zLlkgKyBmcmFtZUhlaWdodCAvIDJmKSwgZnJhbWVUaGljaywgZnJhbWVIZWlnaHQsIF9weXJhbWlkLnRleCk7XHJcbiAgICAgICAgICAgIGIyID0gbmV3IEJvcmRlcihXb3JsZCwgU2NyZWVuTWFuYWdlciwgbmV3IFZlY3RvcjIoZnJhbWVTdGFydFBvcy5YICsgZnJhbWVXaWR0aCwgZnJhbWVTdGFydFBvcy5ZICsgZnJhbWVIZWlnaHQgLyAyZiksIGZyYW1lVGhpY2ssIGZyYW1lSGVpZ2h0LCBfcHlyYW1pZC50ZXgpO1xyXG4gICAgICAgICAgICBiMyA9IG5ldyBCb3JkZXIoV29ybGQsIFNjcmVlbk1hbmFnZXIsIG5ldyBWZWN0b3IyKGZyYW1lU3RhcnRQb3MuWCArIGZyYW1lV2lkdGggLyAyZiwgZnJhbWVTdGFydFBvcy5ZKSwgZnJhbWVXaWR0aCwgZnJhbWVUaGljaywgX3B5cmFtaWQudGV4KTtcclxuICAgICAgICAgICAgYjQgPSBuZXcgQm9yZGVyKFdvcmxkLCBTY3JlZW5NYW5hZ2VyLCBuZXcgVmVjdG9yMihmcmFtZVN0YXJ0UG9zLlggKyBmcmFtZVdpZHRoIC8gMmYsIGZyYW1lU3RhcnRQb3MuWSArIGZyYW1lSGVpZ2h0KSwgZnJhbWVXaWR0aCwgZnJhbWVUaGljaywgX3B5cmFtaWQudGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFVwZGF0ZShHYW1lVGltZSBnYW1lVGltZSwgYm9vbCBvdGhlclNjcmVlbkhhc0ZvY3VzLCBib29sIGNvdmVyZWRCeU90aGVyU2NyZWVuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5VcGRhdGUoZ2FtZVRpbWUsIG90aGVyU2NyZWVuSGFzRm9jdXMsIGNvdmVyZWRCeU90aGVyU2NyZWVuKTtcclxuICAgICAgICAgICAgdmFyIHN0YXRlID0gVG91Y2hQYW5lbC5HZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgdG91Y2ggaW4gc3RhdGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodG91Y2guU3RhdGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBUb3VjaExvY2F0aW9uU3RhdGUuUHJlc3NlZDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9TeXN0ZW0uQ29uc29sZS5Xcml0ZUxpbmUoXCJzdGFydDogXCIgKyB0b3VjaC5Qb3NpdGlvbi5YICsgXCIsXCIgKyB0b3VjaC5Qb3NpdGlvbi5ZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hPbiA9IHRvdWNoLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFRvdWNoTG9jYXRpb25TdGF0ZS5SZWxlYXNlZDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9TeXN0ZW0uQ29uc29sZS5Xcml0ZUxpbmUoXCJlbmQ6IFwiICsgdG91Y2guUG9zaXRpb24uWCArIFwiLFwiICsgdG91Y2guUG9zaXRpb24uWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoT2ZmID0gdG91Y2guUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JjZSA9IHRvdWNoT2ZmIC0gdG91Y2hPbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWdlbnQuQm9keS5BcHBseUZvcmNlKFZlY3RvcjIuTXVsdGlwbHkoZm9yY2UsIDIwMGYpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBtb3VzZSA9IE1vdXNlLkdldFN0YXRlKCk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobW91c2UuTGVmdEJ1dHRvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdXR0b25TdGF0ZS5QcmVzc2VkOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGlkUHJlc3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE9uID0gbmV3IFZlY3RvcjIobW91c2UuUG9zaXRpb24uWCwgbW91c2UuUG9zaXRpb24uWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZFByZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1dHRvblN0YXRlLlJlbGVhc2VkOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkaWRQcmVzcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoT2ZmID0gbmV3IFZlY3RvcjIobW91c2UuUG9zaXRpb24uWCwgbW91c2UuUG9zaXRpb24uWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JjZSA9IHRvdWNoT2ZmIC0gdG91Y2hPbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWdlbnQuQm9keS5BcHBseUZvcmNlKFZlY3RvcjIuTXVsdGlwbHkoZm9yY2UsIDE1MGYpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlkUHJlc3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIERyYXcoR2FtZVRpbWUgZ2FtZVRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb252ZXJ0VW5pdHMuU2V0RGlzcGxheVVuaXRUb1NpbVVuaXRSYXRpbygoZmxvYXQpU2NyZWVuTWFuYWdlci5HcmFwaGljc0RldmljZS5WaWV3cG9ydC5IZWlnaHQgLyAzNWYpO1xyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoLkJlZ2luKDAsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoLkRyYXcoYmFja2dyb3VuZCwgbmV3IFZlY3RvcjIoU2NyZWVuTWFuYWdlci5HcmFwaGljc0RldmljZS5WaWV3cG9ydC5XaWR0aCAvIDJmLCBTY3JlZW5NYW5hZ2VyLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkhlaWdodCAvIDJmKSwgbnVsbCwgQ29sb3IuV2hpdGUsIDBmLCBuZXcgVmVjdG9yMihiYWNrZ3JvdW5kLldpZHRoIC8gMmYsIGJhY2tncm91bmQuSGVpZ2h0IC8gMmYpLCAoZmxvYXQpU2NyZWVuTWFuYWdlci5HcmFwaGljc0RldmljZS5WaWV3cG9ydC5IZWlnaHQgLyAoZmxvYXQpYmFja2dyb3VuZC5IZWlnaHQsIFNwcml0ZUVmZmVjdHMuTm9uZSwgMGYpO1xyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoLkVuZCgpO1xyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoLkJlZ2luKDAsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIENhbWVyYS5WaWV3KTtcclxuICAgICAgICAgICAgX3B5cmFtaWQuRHJhdygpO1xyXG4gICAgICAgICAgICBhZ2VudC5EcmF3KCk7XHJcbiAgICAgICAgICAgIGIxLkRyYXcoKTtcclxuICAgICAgICAgICAgYjIuRHJhdygpO1xyXG4gICAgICAgICAgICBiMy5EcmF3KCk7XHJcbiAgICAgICAgICAgIGI0LkRyYXcoKTtcclxuICAgICAgICAgICAgU2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaC5FbmQoKTtcclxuICAgICAgICAgICAgYmFzZS5EcmF3KGdhbWVUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlNhbXBsZXMuRGVtb3M7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlV0aWxpdHk7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG5cclxubmFtZXNwYWNlIEZhcnNlZXJQaHlzaWNzLlNhbXBsZXNcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIFRoaXMgaXMgdGhlIG1haW4gdHlwZSBmb3IgeW91ciBnYW1lXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgcHVibGljIGNsYXNzIFBoeXNpY3NHYW1lIDogR2FtZVxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgR3JhcGhpY3NEZXZpY2VNYW5hZ2VyIF9ncmFwaGljcztcclxuXHJcbiAgICAgICAgcHVibGljIFBoeXNpY3NHYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9ncmFwaGljcyA9IG5ldyBHcmFwaGljc0RldmljZU1hbmFnZXIodGhpcyk7XHJcbiAgICAgICAgICAgIC8vX2dyYXBoaWNzLlByZWZlcnJlZEJhY2tCdWZmZXJXaWR0aCA9IDE5MDA7XHJcbiAgICAgICAgICAgIC8vX2dyYXBoaWNzLlByZWZlcnJlZEJhY2tCdWZmZXJIZWlnaHQgPSAxMDAwO1xyXG4gICAgICAgICAgICBDb252ZXJ0VW5pdHMuU2V0RGlzcGxheVVuaXRUb1NpbVVuaXRSYXRpbygoZmxvYXQpR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuSGVpZ2h0IC8gMzVmKTtcclxuICAgICAgICAgICAgSXNGaXhlZFRpbWVTdGVwID0gdHJ1ZTtcclxuICAgICAgICAgICAgX2dyYXBoaWNzLklzRnVsbFNjcmVlbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgQ29udGVudC5Sb290RGlyZWN0b3J5ID0gXCJDb250ZW50XCI7XHJcblxyXG4gICAgICAgICAgICAvL25ldy11cCBjb21wb25lbnRzIGFuZCBhZGQgdG8gR2FtZS5Db21wb25lbnRzXHJcbiAgICAgICAgICAgIFNjcmVlbk1hbmFnZXIgPSBuZXcgU2NyZWVuTWFuYWdlcih0aGlzKTtcclxuICAgICAgICAgICAgQ29tcG9uZW50cy5BZGQoU2NyZWVuTWFuYWdlcik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFNjcmVlbk1hbmFnZXIgU2NyZWVuTWFuYWdlciB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQWxsb3dzIHRoZSBnYW1lIHRvIHBlcmZvcm0gYW55IGluaXRpYWxpemF0aW9uIGl0IG5lZWRzIHRvIGJlZm9yZSBzdGFydGluZyB0byBydW4uXHJcbiAgICAgICAgLy8vIFRoaXMgaXMgd2hlcmUgaXQgY2FuIHF1ZXJ5IGZvciBhbnkgcmVxdWlyZWQgc2VydmljZXMgYW5kIGxvYWQgYW55IG5vbi1ncmFwaGljXHJcbiAgICAgICAgLy8vIHJlbGF0ZWQgY29udGVudC4gIENhbGxpbmcgYmFzZS5Jbml0aWFsaXplIHdpbGwgZW51bWVyYXRlIHRocm91Z2ggYW55IGNvbXBvbmVudHNcclxuICAgICAgICAvLy8gYW5kIGluaXRpYWxpemUgdGhlbSBhcyB3ZWxsLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgSW5pdGlhbGl6ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLkluaXRpYWxpemUoKTtcclxuXHJcbiAgICAgICAgICAgIERlbW9HYW1lU2NyZWVuIGRlbW8gPSBuZXcgRGVtb0dhbWVTY3JlZW4oU2NyZWVuTWFuYWdlcik7XHJcblxyXG5cclxuICAgICAgICAgICAgU2NyZWVuTWFuYWdlci5BZGRTY3JlZW4oZGVtbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkNvbGxpc2lvbi5TaGFwZXM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkNvbW1vbjtcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuRHluYW1pY3M7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkZhY3RvcmllcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuVXRpbGl0eTtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG5cclxubmFtZXNwYWNlIEZhcnNlZXJQaHlzaWNzLlNhbXBsZXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFB5cmFtaWRcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIFNwcml0ZSBfYm94O1xyXG4gICAgICAgIHByaXZhdGUgTGlzdDxCb2R5PiBfYm94ZXM7XHJcbiAgICAgICAgcHJpdmF0ZSBTcHJpdGVCYXRjaCBfYmF0Y2g7XHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdCB3aWR0aCA9IDNmO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0dXJlMkQgdGV4O1xyXG5cclxuICAgICAgICBwdWJsaWMgUHlyYW1pZChXb3JsZCB3b3JsZCwgU2NyZWVuTWFuYWdlciBzY3JlZW5NYW5hZ2VyLCBWZWN0b3IyIHBvc2l0aW9uLCBpbnQgY291bnQsIGZsb2F0IGRlbnNpdHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYmF0Y2ggPSBzY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoO1xyXG5cclxuICAgICAgICAgICAgVmVydGljZXMgcmVjdCA9IFBvbHlnb25Ub29scy5DcmVhdGVSZWN0YW5nbGUod2lkdGggLyAyZiwgd2lkdGggLyAyZik7XHJcbiAgICAgICAgICAgIFBvbHlnb25TaGFwZSBzaGFwZSA9IG5ldyBQb2x5Z29uU2hhcGUocmVjdCwgZGVuc2l0eSk7XHJcblxyXG4gICAgICAgICAgICBWZWN0b3IyIHJvd1N0YXJ0ID0gcG9zaXRpb247XHJcbiAgICAgICAgICAgIHJvd1N0YXJ0LlkgLT0gMC41ZiArIGNvdW50ICogd2lkdGggKiAxLjFmO1xyXG5cclxuICAgICAgICAgICAgVmVjdG9yMiBkZWx0YVJvdyA9IG5ldyBWZWN0b3IyKC0od2lkdGggKyAwLjJmKSAvIDJmLCB3aWR0aCArIDAuMWYpO1xyXG4gICAgICAgICAgICBmbG9hdCBzcGFjaW5nID0gd2lkdGggKyAwLjVmO1xyXG5cclxuICAgICAgICAgICAgX2JveGVzID0gbmV3IExpc3Q8Qm9keT4oKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgY291bnQ7ICsraSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVmVjdG9yMiBwb3MgPSByb3dTdGFydDtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IGkgKyAxOyArK2opXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQm9keSBib2R5ID0gQm9keUZhY3RvcnkuQ3JlYXRlQm9keSh3b3JsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9keS5Cb2R5VHlwZSA9IEJvZHlUeXBlLkR5bmFtaWM7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9keS5Qb3NpdGlvbiA9IHBvcztcclxuICAgICAgICAgICAgICAgICAgICBib2R5LkNyZWF0ZUZpeHR1cmUoc2hhcGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9ib3hlcy5BZGQoYm9keSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBvcy5YICs9IHNwYWNpbmc7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcm93U3RhcnQgKz0gZGVsdGFSb3c7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRleCA9IHNjcmVlbk1hbmFnZXIuQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJBc3NldHMvQm94XCIpO1xyXG4gICAgICAgICAgICAvL0dGWFxyXG4gICAgICAgICAgICBfYm94ID0gbmV3IFNwcml0ZSh0ZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IF9ib3hlcy5Db3VudDsgKytpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfYmF0Y2guRHJhdyhfYm94LlRleHR1cmUsIENvbnZlcnRVbml0cy5Ub0Rpc3BsYXlVbml0cyhfYm94ZXNbaV0uUG9zaXRpb24pLCBudWxsLCBDb2xvci5XaGl0ZSwgX2JveGVzW2ldLlJvdGF0aW9uLCBuZXcgVmVjdG9yMihfYm94LlRleHR1cmUuV2lkdGggLyAyZiwgX2JveC5UZXh0dXJlLkhlaWdodCAvIDJmKSwgKGZsb2F0KUNvbnZlcnRVbml0cy5Ub0Rpc3BsYXlVbml0cygxZikgKiB3aWR0aCAvIChmbG9hdClfYm94LlRleHR1cmUuV2lkdGgsIFNwcml0ZUVmZmVjdHMuTm9uZSwgMGYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il0KfQo=
