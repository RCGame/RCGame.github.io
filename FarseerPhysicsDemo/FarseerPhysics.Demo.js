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
            didPress: false,
            worldRatio: 0
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
                                this.agent.Body.ApplyForce(Microsoft.Xna.Framework.Vector2.Multiply$1(force.$clone(), 150.0));
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJGYXJzZWVyUGh5c2ljcy5EZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJBZ2VudC5jcyIsIkJvcmRlci5jcyIsIkRlbW9HYW1lU2NyZWVuLmNzIiwiUGh5c2ljc0dhbWUuY3MiLCJQeXJhbWlkLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O1lBY1lBLFdBQW1CQSxJQUFJQTtZQUN2QkE7Ozs7Ozs7Ozs7Ozs7O29CQ2lCTUEsT0FBT0E7Ozs7Ozs7Ozs0QkFoQkpBLE9BQWFBLGVBQTZCQTs7Z0JBRW5EQSxjQUFTQTs7Z0JBRVRBLGtCQUFhQSxrREFBeUJBLE9BQU9BO2dCQUM3Q0E7Z0JBQ0FBLDJCQUFzQkE7Z0JBQ3RCQTtnQkFDQUEsMkJBQXNCQTtnQkFDdEJBLFVBQVVBO2dCQUVWQSxjQUFTQSxJQUFJQSxxQ0FBT0E7Ozs7O2dCQVVwQkEsbUJBQVlBLHFCQUFnQkEsbURBQTRCQSxvQ0FBc0JBLE1BQU1BLDhDQUFhQSwwQkFBcUJBLElBQUlBLHVDQUFRQSxpQ0FBMkJBLG1DQUE2QkEsQUFBT0EsNERBQWtDQSxvQkFBY0EsQUFBT0EsMkJBQXNCQTs7Ozs7Ozs7Ozs7Ozs7NEJDckJwUUEsT0FBYUEsZUFBNkJBLFVBQWtCQSxPQUFhQSxRQUFjQTs7Z0JBRWpHQSxTQUFJQTtnQkFDSkEsU0FBSUE7Z0JBQ0pBLGNBQVNBO2dCQUNUQSxlQUFVQSxxREFBNEJBLE9BQU9BLE9BQU9BO2dCQUNwREEsd0JBQW1CQTtnQkFDbkJBLHdCQUFtQkE7Z0JBQ25CQSxlQUFVQTs7Ozs7Z0JBS1ZBLGlCQUFZQSxjQUFTQSxtREFBNEJBLGlDQUFtQkEsTUFBTUEsbURBQWlCQSxJQUFJQSx1Q0FBUUEsMEJBQW9CQSw0QkFBc0JBLElBQUlBLHVDQUFRQSw0REFBa0NBLFNBQUlBLG9CQUFlQSw0REFBa0NBLFNBQUlBLHNCQUFpQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUFnQkE7O2dCQUVoQkEsY0FBU0EsS0FBSUE7O2dCQUViQSxLQUFLQSxXQUFXQSxJQUFJQSxPQUFTQTtvQkFFekJBLFVBQWNBOztvQkFFZEEsS0FBS0EsV0FBV0EsSUFBSUEsZUFBU0E7d0JBRXpCQSxXQUFZQSxnREFBdUJBO3dCQUNuQ0EsZ0JBQWdCQTt3QkFDaEJBLGdCQUFnQkE7d0JBQ2hCQSxtQkFBbUJBO3dCQUNuQkEsZ0JBQVdBOzt3QkFFWEEsU0FBU0E7OztvQkFHYkEsMEVBQVlBOzs7Z0JBR2hCQSxXQUFNQTtnQkFFTkEsWUFBT0EsSUFBSUEscUNBQU9BOzs7OztnQkFLbEJBLEtBQUtBLFdBQVdBLElBQUlBLG1CQUFnQkE7b0JBRWhDQSxtQkFBWUEsbUJBQWNBLG1EQUE0QkEsb0JBQU9BLHVCQUFjQSxNQUFNQSw4Q0FBYUEsb0JBQU9BLGFBQWFBLElBQUlBLHVDQUFRQSwrQkFBeUJBLGlDQUEyQkEsQUFBT0EsNERBQWtDQSxhQUFRQSxBQUFPQSx5QkFBb0JBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBCcmlkZ2U7XHJcbnVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlNhbXBsZXM7XHJcblxyXG5uYW1lc3BhY2UgRmFyc2VlclBoeXNpY3MuRGVtb1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUGh5c2ljc0dhbWUgZ2FtZSA9IG5ldyBQaHlzaWNzR2FtZSgpO1xyXG4gICAgICAgICAgICBnYW1lLlJ1bigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIEZhcnNlZXJQaHlzaWNzLkNvbW1vbjtcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuRHluYW1pY3M7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkZhY3RvcmllcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuVXRpbGl0eTtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG5cclxubmFtZXNwYWNlIEZhcnNlZXJQaHlzaWNzLlNhbXBsZXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFnZW50XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBCb2R5IF9hZ2VudEJvZHk7XHJcbiAgICAgICAgcHJpdmF0ZSBTcHJpdGUgc3ByaXRlO1xyXG4gICAgICAgIHByaXZhdGUgU3ByaXRlQmF0Y2ggX2JhdGNoO1xyXG4gICAgICAgIHByaXZhdGUgZmxvYXQgcmFkaXVzID0gMmY7XHJcblxyXG4gICAgICAgIHB1YmxpYyBBZ2VudChXb3JsZCB3b3JsZCwgU2NyZWVuTWFuYWdlciBzY3JlZW5NYW5hZ2VyLCBWZWN0b3IyIHBvc2l0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2JhdGNoID0gc2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaDtcclxuXHJcbiAgICAgICAgICAgIF9hZ2VudEJvZHkgPSBCb2R5RmFjdG9yeS5DcmVhdGVDaXJjbGUod29ybGQsIHJhZGl1cywgMWYpO1xyXG4gICAgICAgICAgICBfYWdlbnRCb2R5Lk1hc3MgPSAyMGY7XHJcbiAgICAgICAgICAgIF9hZ2VudEJvZHkuQm9keVR5cGUgPSBCb2R5VHlwZS5EeW5hbWljO1xyXG4gICAgICAgICAgICBfYWdlbnRCb2R5LlJlc3RpdHV0aW9uID0gMC41ZjtcclxuICAgICAgICAgICAgX2FnZW50Qm9keS5Qb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgICAgICB2YXIgdGV4ID0gc2NyZWVuTWFuYWdlci5Db250ZW50LkxvYWQ8VGV4dHVyZTJEPihcIkFzc2V0cy9CYWxsXCIpO1xyXG4gICAgICAgICAgICAvL0dGWFxyXG4gICAgICAgICAgICBzcHJpdGUgPSBuZXcgU3ByaXRlKHRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQm9keSBCb2R5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gX2FnZW50Qm9keTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYmF0Y2guRHJhdyhzcHJpdGUuVGV4dHVyZSwgQ29udmVydFVuaXRzLlRvRGlzcGxheVVuaXRzKF9hZ2VudEJvZHkuUG9zaXRpb24pLCBudWxsLCBDb2xvci5XaGl0ZSwgX2FnZW50Qm9keS5Sb3RhdGlvbiwgbmV3IFZlY3RvcjIoc3ByaXRlLlRleHR1cmUuV2lkdGggLyAyZiwgc3ByaXRlLlRleHR1cmUuSGVpZ2h0IC8gMmYpLCAoZmxvYXQpQ29udmVydFVuaXRzLlRvRGlzcGxheVVuaXRzKDFmKSAqIHJhZGl1cyAqIDJmIC8gKGZsb2F0KXNwcml0ZS5UZXh0dXJlLldpZHRoLCBTcHJpdGVFZmZlY3RzLk5vbmUsIDBmKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBGYXJzZWVyUGh5c2ljcy5Db21tb247XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkR5bmFtaWNzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5GYWN0b3JpZXM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlV0aWxpdHk7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxuXHJcbm5hbWVzcGFjZSBGYXJzZWVyUGh5c2ljcy5TYW1wbGVzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCb3JkZXJcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIEJvZHkgX2JvcmRlcjtcclxuICAgICAgICBwcml2YXRlIFNwcml0ZUJhdGNoIF9iYXRjaDtcclxuICAgICAgICBwcml2YXRlIFRleHR1cmUyRCB0ZXh0dXJlO1xyXG4gICAgICAgIHByaXZhdGUgZmxvYXQgdywgaDtcclxuXHJcbiAgICAgICAgcHVibGljIEJvcmRlcihXb3JsZCB3b3JsZCwgU2NyZWVuTWFuYWdlciBzY3JlZW5NYW5hZ2VyLCBWZWN0b3IyIHBvc2l0aW9uLCBmbG9hdCB3aWR0aCwgZmxvYXQgaGVpZ2h0LCBUZXh0dXJlMkQgdGV4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdyA9IHdpZHRoO1xyXG4gICAgICAgICAgICBoID0gaGVpZ2h0O1xyXG4gICAgICAgICAgICBfYmF0Y2ggPSBzY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoO1xyXG4gICAgICAgICAgICBfYm9yZGVyID0gQm9keUZhY3RvcnkuQ3JlYXRlUmVjdGFuZ2xlKHdvcmxkLCB3aWR0aCwgaGVpZ2h0LCAxZik7XHJcbiAgICAgICAgICAgIF9ib3JkZXIuUG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICAgICAgX2JvcmRlci5Cb2R5VHlwZSA9IEJvZHlUeXBlLlN0YXRpYztcclxuICAgICAgICAgICAgdGV4dHVyZSA9IHRleDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2JhdGNoLkRyYXcodGV4dHVyZSwgQ29udmVydFVuaXRzLlRvRGlzcGxheVVuaXRzKF9ib3JkZXIuUG9zaXRpb24pLCBudWxsLCBDb2xvci5XaGl0ZSwgMGYsIG5ldyBWZWN0b3IyKHRleHR1cmUuV2lkdGggLyAyZiwgdGV4dHVyZS5IZWlnaHQgLyAyZiksIG5ldyBWZWN0b3IyKENvbnZlcnRVbml0cy5Ub0Rpc3BsYXlVbml0cygxZikgKiB3IC8gdGV4dHVyZS5XaWR0aCwgQ29udmVydFVuaXRzLlRvRGlzcGxheVVuaXRzKDFmKSAqIGggLyB0ZXh0dXJlLkhlaWdodCksIFNwcml0ZUVmZmVjdHMuTm9uZSwgMGYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuU2FtcGxlcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuQ29sbGlzaW9uLlNoYXBlcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuQ29tbW9uO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5EeW5hbWljcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuRmFjdG9yaWVzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5VdGlsaXR5O1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0LlRvdWNoO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5JbnB1dDtcclxuXHJcbm5hbWVzcGFjZSBGYXJzZWVyUGh5c2ljcy5TYW1wbGVzLkRlbW9zXHJcbntcclxuICAgIGludGVybmFsIGNsYXNzIERlbW9HYW1lU2NyZWVuIDogUGh5c2ljc0dhbWVTY3JlZW5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIGNvbnN0IGludCBQeXJhbWlkQmFzZUJvZHlDb3VudCA9IDE0O1xyXG4gICAgICAgIHByaXZhdGUgVGV4dHVyZTJEIGJhY2tncm91bmQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgUHlyYW1pZCBfcHlyYW1pZDtcclxuICAgICAgICBwcml2YXRlIEFnZW50IGFnZW50O1xyXG4gICAgICAgIHByaXZhdGUgQm9yZGVyIGIxLCBiMiwgYjMsIGI0O1xyXG4gICAgICAgIHByaXZhdGUgVmVjdG9yMiB0b3VjaE9uLCB0b3VjaE9mZjtcclxuICAgICAgICBwcml2YXRlIGJvb2wgZGlkUHJlc3MgPSBmYWxzZTtcclxuICAgICAgICBwcml2YXRlIGZsb2F0IHdvcmxkUmF0aW87XHJcblxyXG4gICAgICAgIHB1YmxpYyBEZW1vR2FtZVNjcmVlbihTY3JlZW5NYW5hZ2VyIHNjcmVlbk1hbmFnZXIpIDogYmFzZShzY3JlZW5NYW5hZ2VyKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIExvYWRDb250ZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuTG9hZENvbnRlbnQoKTtcclxuICAgICAgICAgICAgZmxvYXQgd29ybGRSYXRpbyA9IChmbG9hdClTY3JlZW5NYW5hZ2VyLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkhlaWdodCAvIDM1ZjtcclxuICAgICAgICAgICAgZmxvYXQgZnJhbWVXaWR0aCA9IDUwZjtcclxuICAgICAgICAgICAgZmxvYXQgZnJhbWVIZWlnaHQgPSAzMGY7XHJcbiAgICAgICAgICAgIGZsb2F0IGZyYW1lVGhpY2sgPSAxZjtcclxuICAgICAgICAgICAgVmVjdG9yMiBmcmFtZVN0YXJ0UG9zID0gbmV3IFZlY3RvcjIoMmYsIDJmKTtcclxuICAgICAgICAgICAgV29ybGQuR3Jhdml0eSA9IG5ldyBWZWN0b3IyKDBmLCA4MGYpO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kID0gU2NyZWVuTWFuYWdlci5Db250ZW50LkxvYWQ8VGV4dHVyZTJEPihcIkFzc2V0cy9CYWNrZ3JvdW5kXCIpO1xyXG4gICAgICAgICAgICBfcHlyYW1pZCA9IG5ldyBQeXJhbWlkKFdvcmxkLCBTY3JlZW5NYW5hZ2VyLCBuZXcgVmVjdG9yMigzNWYsIDMzZiksIDUsIDFmKTtcclxuICAgICAgICAgICAgYWdlbnQgPSBuZXcgQWdlbnQoV29ybGQsIFNjcmVlbk1hbmFnZXIsIG5ldyBWZWN0b3IyKDVmLCAyOGYpKTtcclxuICAgICAgICAgICAgYjEgPSBuZXcgQm9yZGVyKFdvcmxkLCBTY3JlZW5NYW5hZ2VyLCBuZXcgVmVjdG9yMihmcmFtZVN0YXJ0UG9zLlgsIGZyYW1lU3RhcnRQb3MuWSArIGZyYW1lSGVpZ2h0IC8gMmYpLCBmcmFtZVRoaWNrLCBmcmFtZUhlaWdodCwgX3B5cmFtaWQudGV4KTtcclxuICAgICAgICAgICAgYjIgPSBuZXcgQm9yZGVyKFdvcmxkLCBTY3JlZW5NYW5hZ2VyLCBuZXcgVmVjdG9yMihmcmFtZVN0YXJ0UG9zLlggKyBmcmFtZVdpZHRoLCBmcmFtZVN0YXJ0UG9zLlkgKyBmcmFtZUhlaWdodCAvIDJmKSwgZnJhbWVUaGljaywgZnJhbWVIZWlnaHQsIF9weXJhbWlkLnRleCk7XHJcbiAgICAgICAgICAgIGIzID0gbmV3IEJvcmRlcihXb3JsZCwgU2NyZWVuTWFuYWdlciwgbmV3IFZlY3RvcjIoZnJhbWVTdGFydFBvcy5YICsgZnJhbWVXaWR0aCAvIDJmLCBmcmFtZVN0YXJ0UG9zLlkpLCBmcmFtZVdpZHRoLCBmcmFtZVRoaWNrLCBfcHlyYW1pZC50ZXgpO1xyXG4gICAgICAgICAgICBiNCA9IG5ldyBCb3JkZXIoV29ybGQsIFNjcmVlbk1hbmFnZXIsIG5ldyBWZWN0b3IyKGZyYW1lU3RhcnRQb3MuWCArIGZyYW1lV2lkdGggLyAyZiwgZnJhbWVTdGFydFBvcy5ZICsgZnJhbWVIZWlnaHQpLCBmcmFtZVdpZHRoLCBmcmFtZVRoaWNrLCBfcHlyYW1pZC50ZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgVXBkYXRlKEdhbWVUaW1lIGdhbWVUaW1lLCBib29sIG90aGVyU2NyZWVuSGFzRm9jdXMsIGJvb2wgY292ZXJlZEJ5T3RoZXJTY3JlZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLlVwZGF0ZShnYW1lVGltZSwgb3RoZXJTY3JlZW5IYXNGb2N1cywgY292ZXJlZEJ5T3RoZXJTY3JlZW4pO1xyXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBUb3VjaFBhbmVsLkdldFN0YXRlKCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0b3VjaCBpbiBzdGF0ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0b3VjaC5TdGF0ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFRvdWNoTG9jYXRpb25TdGF0ZS5QcmVzc2VkOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE9uID0gdG91Y2guUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVG91Y2hMb2NhdGlvblN0YXRlLlJlbGVhc2VkOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE9mZiA9IHRvdWNoLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9yY2UgPSB0b3VjaE9mZiAtIHRvdWNoT247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZW50LkJvZHkuQXBwbHlGb3JjZShWZWN0b3IyLk11bHRpcGx5KGZvcmNlLCAxNTBmKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgbW91c2UgPSBNb3VzZS5HZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG1vdXNlLkxlZnRCdXR0b24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQnV0dG9uU3RhdGUuUHJlc3NlZDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRpZFByZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hPbiA9IG5ldyBWZWN0b3IyKG1vdXNlLlBvc2l0aW9uLlgsIG1vdXNlLlBvc2l0aW9uLlkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWRQcmVzcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdXR0b25TdGF0ZS5SZWxlYXNlZDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlkUHJlc3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE9mZiA9IG5ldyBWZWN0b3IyKG1vdXNlLlBvc2l0aW9uLlgsIG1vdXNlLlBvc2l0aW9uLlkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9yY2UgPSB0b3VjaE9mZiAtIHRvdWNoT247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZW50LkJvZHkuQXBwbHlGb3JjZShWZWN0b3IyLk11bHRpcGx5KGZvcmNlLCAxNTBmKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZFByZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBEcmF3KEdhbWVUaW1lIGdhbWVUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ29udmVydFVuaXRzLlNldERpc3BsYXlVbml0VG9TaW1Vbml0UmF0aW8oKGZsb2F0KVNjcmVlbk1hbmFnZXIuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuSGVpZ2h0IC8gMzVmKTtcclxuICAgICAgICAgICAgU2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaC5CZWdpbigwLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgU2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaC5EcmF3KGJhY2tncm91bmQsIG5ldyBWZWN0b3IyKFNjcmVlbk1hbmFnZXIuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuV2lkdGggLyAyZiwgU2NyZWVuTWFuYWdlci5HcmFwaGljc0RldmljZS5WaWV3cG9ydC5IZWlnaHQgLyAyZiksIG51bGwsIENvbG9yLldoaXRlLCAwZiwgbmV3IFZlY3RvcjIoYmFja2dyb3VuZC5XaWR0aCAvIDJmLCBiYWNrZ3JvdW5kLkhlaWdodCAvIDJmKSwgKGZsb2F0KVNjcmVlbk1hbmFnZXIuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuSGVpZ2h0IC8gKGZsb2F0KWJhY2tncm91bmQuSGVpZ2h0LCBTcHJpdGVFZmZlY3RzLk5vbmUsIDBmKTtcclxuICAgICAgICAgICAgU2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaC5FbmQoKTtcclxuICAgICAgICAgICAgU2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaC5CZWdpbigwLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBDYW1lcmEuVmlldyk7XHJcbiAgICAgICAgICAgIF9weXJhbWlkLkRyYXcoKTtcclxuICAgICAgICAgICAgYWdlbnQuRHJhdygpO1xyXG4gICAgICAgICAgICBiMS5EcmF3KCk7XHJcbiAgICAgICAgICAgIGIyLkRyYXcoKTtcclxuICAgICAgICAgICAgYjMuRHJhdygpO1xyXG4gICAgICAgICAgICBiNC5EcmF3KCk7XHJcbiAgICAgICAgICAgIFNjcmVlbk1hbmFnZXIuU3ByaXRlQmF0Y2guRW5kKCk7XHJcbiAgICAgICAgICAgIGJhc2UuRHJhdyhnYW1lVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5TYW1wbGVzLkRlbW9zO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5VdGlsaXR5O1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxuXHJcbm5hbWVzcGFjZSBGYXJzZWVyUGh5c2ljcy5TYW1wbGVzXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBUaGlzIGlzIHRoZSBtYWluIHR5cGUgZm9yIHlvdXIgZ2FtZVxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBjbGFzcyBQaHlzaWNzR2FtZSA6IEdhbWVcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIEdyYXBoaWNzRGV2aWNlTWFuYWdlciBfZ3JhcGhpY3M7XHJcblxyXG4gICAgICAgIHB1YmxpYyBQaHlzaWNzR2FtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfZ3JhcGhpY3MgPSBuZXcgR3JhcGhpY3NEZXZpY2VNYW5hZ2VyKHRoaXMpO1xyXG4gICAgICAgICAgICAvL19ncmFwaGljcy5QcmVmZXJyZWRCYWNrQnVmZmVyV2lkdGggPSAxOTAwO1xyXG4gICAgICAgICAgICAvL19ncmFwaGljcy5QcmVmZXJyZWRCYWNrQnVmZmVySGVpZ2h0ID0gMTAwMDtcclxuICAgICAgICAgICAgQ29udmVydFVuaXRzLlNldERpc3BsYXlVbml0VG9TaW1Vbml0UmF0aW8oKGZsb2F0KUdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkhlaWdodCAvIDM1Zik7XHJcbiAgICAgICAgICAgIElzRml4ZWRUaW1lU3RlcCA9IHRydWU7XHJcbiAgICAgICAgICAgIF9ncmFwaGljcy5Jc0Z1bGxTY3JlZW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIENvbnRlbnQuUm9vdERpcmVjdG9yeSA9IFwiQ29udGVudFwiO1xyXG5cclxuICAgICAgICAgICAgLy9uZXctdXAgY29tcG9uZW50cyBhbmQgYWRkIHRvIEdhbWUuQ29tcG9uZW50c1xyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyID0gbmV3IFNjcmVlbk1hbmFnZXIodGhpcyk7XHJcbiAgICAgICAgICAgIENvbXBvbmVudHMuQWRkKFNjcmVlbk1hbmFnZXIpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTY3JlZW5NYW5hZ2VyIFNjcmVlbk1hbmFnZXIgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEFsbG93cyB0aGUgZ2FtZSB0byBwZXJmb3JtIGFueSBpbml0aWFsaXphdGlvbiBpdCBuZWVkcyB0byBiZWZvcmUgc3RhcnRpbmcgdG8gcnVuLlxyXG4gICAgICAgIC8vLyBUaGlzIGlzIHdoZXJlIGl0IGNhbiBxdWVyeSBmb3IgYW55IHJlcXVpcmVkIHNlcnZpY2VzIGFuZCBsb2FkIGFueSBub24tZ3JhcGhpY1xyXG4gICAgICAgIC8vLyByZWxhdGVkIGNvbnRlbnQuICBDYWxsaW5nIGJhc2UuSW5pdGlhbGl6ZSB3aWxsIGVudW1lcmF0ZSB0aHJvdWdoIGFueSBjb21wb25lbnRzXHJcbiAgICAgICAgLy8vIGFuZCBpbml0aWFsaXplIHRoZW0gYXMgd2VsbC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEluaXRpYWxpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Jbml0aWFsaXplKCk7XHJcblxyXG4gICAgICAgICAgICBEZW1vR2FtZVNjcmVlbiBkZW1vID0gbmV3IERlbW9HYW1lU2NyZWVuKFNjcmVlbk1hbmFnZXIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIFNjcmVlbk1hbmFnZXIuQWRkU2NyZWVuKGRlbW8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5Db2xsaXNpb24uU2hhcGVzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5Db21tb247XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkR5bmFtaWNzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5GYWN0b3JpZXM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlV0aWxpdHk7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxuXHJcbm5hbWVzcGFjZSBGYXJzZWVyUGh5c2ljcy5TYW1wbGVzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQeXJhbWlkXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBTcHJpdGUgX2JveDtcclxuICAgICAgICBwcml2YXRlIExpc3Q8Qm9keT4gX2JveGVzO1xyXG4gICAgICAgIHByaXZhdGUgU3ByaXRlQmF0Y2ggX2JhdGNoO1xyXG4gICAgICAgIHByaXZhdGUgZmxvYXQgd2lkdGggPSAzZjtcclxuICAgICAgICBwdWJsaWMgVGV4dHVyZTJEIHRleDtcclxuXHJcbiAgICAgICAgcHVibGljIFB5cmFtaWQoV29ybGQgd29ybGQsIFNjcmVlbk1hbmFnZXIgc2NyZWVuTWFuYWdlciwgVmVjdG9yMiBwb3NpdGlvbiwgaW50IGNvdW50LCBmbG9hdCBkZW5zaXR5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2JhdGNoID0gc2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaDtcclxuXHJcbiAgICAgICAgICAgIFZlcnRpY2VzIHJlY3QgPSBQb2x5Z29uVG9vbHMuQ3JlYXRlUmVjdGFuZ2xlKHdpZHRoIC8gMmYsIHdpZHRoIC8gMmYpO1xyXG4gICAgICAgICAgICBQb2x5Z29uU2hhcGUgc2hhcGUgPSBuZXcgUG9seWdvblNoYXBlKHJlY3QsIGRlbnNpdHkpO1xyXG5cclxuICAgICAgICAgICAgVmVjdG9yMiByb3dTdGFydCA9IHBvc2l0aW9uO1xyXG4gICAgICAgICAgICByb3dTdGFydC5ZIC09IDAuNWYgKyBjb3VudCAqIHdpZHRoICogMS4xZjtcclxuXHJcbiAgICAgICAgICAgIFZlY3RvcjIgZGVsdGFSb3cgPSBuZXcgVmVjdG9yMigtKHdpZHRoICsgMC4yZikgLyAyZiwgd2lkdGggKyAwLjFmKTtcclxuICAgICAgICAgICAgZmxvYXQgc3BhY2luZyA9IHdpZHRoICsgMC41ZjtcclxuXHJcbiAgICAgICAgICAgIF9ib3hlcyA9IG5ldyBMaXN0PEJvZHk+KCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGNvdW50OyArK2kpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFZlY3RvcjIgcG9zID0gcm93U3RhcnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBpICsgMTsgKytqKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEJvZHkgYm9keSA9IEJvZHlGYWN0b3J5LkNyZWF0ZUJvZHkod29ybGQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvZHkuQm9keVR5cGUgPSBCb2R5VHlwZS5EeW5hbWljO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvZHkuUG9zaXRpb24gPSBwb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9keS5DcmVhdGVGaXh0dXJlKHNoYXBlKTtcclxuICAgICAgICAgICAgICAgICAgICBfYm94ZXMuQWRkKGJvZHkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBwb3MuWCArPSBzcGFjaW5nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJvd1N0YXJ0ICs9IGRlbHRhUm93O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0ZXggPSBzY3JlZW5NYW5hZ2VyLkNvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiQXNzZXRzL0JveFwiKTtcclxuICAgICAgICAgICAgLy9HRlhcclxuICAgICAgICAgICAgX2JveCA9IG5ldyBTcHJpdGUodGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBfYm94ZXMuQ291bnQ7ICsraSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2JhdGNoLkRyYXcoX2JveC5UZXh0dXJlLCBDb252ZXJ0VW5pdHMuVG9EaXNwbGF5VW5pdHMoX2JveGVzW2ldLlBvc2l0aW9uKSwgbnVsbCwgQ29sb3IuV2hpdGUsIF9ib3hlc1tpXS5Sb3RhdGlvbiwgbmV3IFZlY3RvcjIoX2JveC5UZXh0dXJlLldpZHRoIC8gMmYsIF9ib3guVGV4dHVyZS5IZWlnaHQgLyAyZiksIChmbG9hdClDb252ZXJ0VW5pdHMuVG9EaXNwbGF5VW5pdHMoMWYpICogd2lkdGggLyAoZmxvYXQpX2JveC5UZXh0dXJlLldpZHRoLCBTcHJpdGVFZmZlY3RzLk5vbmUsIDBmKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdCn0K
