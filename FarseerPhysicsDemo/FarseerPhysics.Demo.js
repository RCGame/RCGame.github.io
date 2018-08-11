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
                FarseerPhysics.Utility.PhysicsGameScreen.prototype.Update.call(this, gameTime, otherScreenHasFocus, coveredByOtherScreen);

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
                            var force = Microsoft.Xna.Framework.Vector2.op_Subtraction(this.touchOff.$clone(), this.touchOn.$clone());
                            this.agent.Body.ApplyForce(Microsoft.Xna.Framework.Vector2.Multiply$1(force.$clone(), 150.0));
                            this.didPress = false;
                        }
                        break;
                }
            },
            Draw: function (gameTime) {
                this.ScreenManager.SpriteBatch.Begin$1(0, null, null, null, null, null, null);
                this.ScreenManager.SpriteBatch.Draw$1(this.background, new Microsoft.Xna.Framework.Vector2.$ctor2(0.0, 0.0), null, Microsoft.Xna.Framework.Color.White.$clone(), 0.0, new Microsoft.Xna.Framework.Vector2.$ctor2(0.0, 0.0), 1.0, Microsoft.Xna.Framework.Graphics.SpriteEffects.None, 0.0);
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
                FarseerPhysics.Utility.ConvertUnits.SetDisplayUnitToSimUnitRatio(25.0);
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJGYXJzZWVyUGh5c2ljcy5EZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJBZ2VudC5jcyIsIkJvcmRlci5jcyIsIkRlbW9HYW1lU2NyZWVuLmNzIiwiUGh5c2ljc0dhbWUuY3MiLCJQeXJhbWlkLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O1lBY1lBLFdBQW1CQSxJQUFJQTtZQUN2QkE7Ozs7Ozs7Ozs7Ozs7O29CQ2lCTUEsT0FBT0E7Ozs7Ozs7Ozs0QkFoQkpBLE9BQWFBLGVBQTZCQTs7Z0JBRW5EQSxjQUFTQTs7Z0JBRVRBLGtCQUFhQSxrREFBeUJBLE9BQU9BO2dCQUM3Q0E7Z0JBQ0FBLDJCQUFzQkE7Z0JBQ3RCQTtnQkFDQUEsMkJBQXNCQTtnQkFDdEJBLFVBQVVBO2dCQUVWQSxjQUFTQSxJQUFJQSxxQ0FBT0E7Ozs7O2dCQVVwQkEsbUJBQVlBLHFCQUFnQkEsbURBQTRCQSxvQ0FBc0JBLE1BQU1BLDhDQUFhQSwwQkFBcUJBLElBQUlBLHVDQUFRQSxpQ0FBMkJBLG1DQUE2QkEsQUFBT0EsNERBQWtDQSxvQkFBY0EsQUFBT0EsMkJBQXNCQTs7Ozs7Ozs7Ozs7Ozs7NEJDckJwUUEsT0FBYUEsZUFBNkJBLFVBQWtCQSxPQUFhQSxRQUFjQTs7Z0JBRWpHQSxTQUFJQTtnQkFDSkEsU0FBSUE7Z0JBQ0pBLGNBQVNBO2dCQUNUQSxlQUFVQSxxREFBNEJBLE9BQU9BLE9BQU9BO2dCQUNwREEsd0JBQW1CQTtnQkFDbkJBLHdCQUFtQkE7Z0JBQ25CQSxlQUFVQTs7Ozs7Z0JBS1ZBLGlCQUFZQSxjQUFTQSxtREFBNEJBLGlDQUFtQkEsTUFBTUEsbURBQWlCQSxJQUFJQSx1Q0FBUUEsMEJBQW9CQSw0QkFBc0JBLElBQUlBLHVDQUFRQSw0REFBa0NBLFNBQUlBLG9CQUFlQSw0REFBa0NBLFNBQUlBLHNCQUFpQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUFXQSxJQUFJQSxtQkFBZ0JBO29CQUVoQ0EsbUJBQVlBLG1CQUFjQSxtREFBNEJBLG9CQUFPQSx1QkFBY0EsTUFBTUEsOENBQWFBLG9CQUFPQSxhQUFhQSxJQUFJQSx1Q0FBUUEsK0JBQXlCQSxpQ0FBMkJBLEFBQU9BLDREQUFrQ0EsYUFBUUEsQUFBT0EseUJBQW9CQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgQnJpZGdlO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5TYW1wbGVzO1xyXG5cclxubmFtZXNwYWNlIEZhcnNlZXJQaHlzaWNzLkRlbW9cclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBoeXNpY3NHYW1lIGdhbWUgPSBuZXcgUGh5c2ljc0dhbWUoKTtcclxuICAgICAgICAgICAgZ2FtZS5SdW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBGYXJzZWVyUGh5c2ljcy5Db21tb247XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkR5bmFtaWNzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5GYWN0b3JpZXM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlV0aWxpdHk7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxuXHJcbm5hbWVzcGFjZSBGYXJzZWVyUGh5c2ljcy5TYW1wbGVzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBZ2VudFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgQm9keSBfYWdlbnRCb2R5O1xyXG4gICAgICAgIHByaXZhdGUgU3ByaXRlIHNwcml0ZTtcclxuICAgICAgICBwcml2YXRlIFNwcml0ZUJhdGNoIF9iYXRjaDtcclxuICAgICAgICBwcml2YXRlIGZsb2F0IHJhZGl1cyA9IDJmO1xyXG5cclxuICAgICAgICBwdWJsaWMgQWdlbnQoV29ybGQgd29ybGQsIFNjcmVlbk1hbmFnZXIgc2NyZWVuTWFuYWdlciwgVmVjdG9yMiBwb3NpdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9iYXRjaCA9IHNjcmVlbk1hbmFnZXIuU3ByaXRlQmF0Y2g7XHJcblxyXG4gICAgICAgICAgICBfYWdlbnRCb2R5ID0gQm9keUZhY3RvcnkuQ3JlYXRlQ2lyY2xlKHdvcmxkLCByYWRpdXMsIDFmKTtcclxuICAgICAgICAgICAgX2FnZW50Qm9keS5NYXNzID0gMjBmO1xyXG4gICAgICAgICAgICBfYWdlbnRCb2R5LkJvZHlUeXBlID0gQm9keVR5cGUuRHluYW1pYztcclxuICAgICAgICAgICAgX2FnZW50Qm9keS5SZXN0aXR1dGlvbiA9IDAuNWY7XHJcbiAgICAgICAgICAgIF9hZ2VudEJvZHkuUG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIHRleCA9IHNjcmVlbk1hbmFnZXIuQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJBc3NldHMvQmFsbFwiKTtcclxuICAgICAgICAgICAgLy9HRlhcclxuICAgICAgICAgICAgc3ByaXRlID0gbmV3IFNwcml0ZSh0ZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEJvZHkgQm9keVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIF9hZ2VudEJvZHk7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2JhdGNoLkRyYXcoc3ByaXRlLlRleHR1cmUsIENvbnZlcnRVbml0cy5Ub0Rpc3BsYXlVbml0cyhfYWdlbnRCb2R5LlBvc2l0aW9uKSwgbnVsbCwgQ29sb3IuV2hpdGUsIF9hZ2VudEJvZHkuUm90YXRpb24sIG5ldyBWZWN0b3IyKHNwcml0ZS5UZXh0dXJlLldpZHRoIC8gMmYsIHNwcml0ZS5UZXh0dXJlLkhlaWdodCAvIDJmKSwgKGZsb2F0KUNvbnZlcnRVbml0cy5Ub0Rpc3BsYXlVbml0cygxZikgKiByYWRpdXMgKiAyZiAvIChmbG9hdClzcHJpdGUuVGV4dHVyZS5XaWR0aCwgU3ByaXRlRWZmZWN0cy5Ob25lLCAwZik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgRmFyc2VlclBoeXNpY3MuQ29tbW9uO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5EeW5hbWljcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuRmFjdG9yaWVzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5VdGlsaXR5O1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcblxyXG5uYW1lc3BhY2UgRmFyc2VlclBoeXNpY3MuU2FtcGxlc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQm9yZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBCb2R5IF9ib3JkZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBTcHJpdGVCYXRjaCBfYmF0Y2g7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0dXJlMkQgdGV4dHVyZTtcclxuICAgICAgICBwcml2YXRlIGZsb2F0IHcsIGg7XHJcblxyXG4gICAgICAgIHB1YmxpYyBCb3JkZXIoV29ybGQgd29ybGQsIFNjcmVlbk1hbmFnZXIgc2NyZWVuTWFuYWdlciwgVmVjdG9yMiBwb3NpdGlvbiwgZmxvYXQgd2lkdGgsIGZsb2F0IGhlaWdodCwgVGV4dHVyZTJEIHRleClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHcgPSB3aWR0aDtcclxuICAgICAgICAgICAgaCA9IGhlaWdodDtcclxuICAgICAgICAgICAgX2JhdGNoID0gc2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaDtcclxuICAgICAgICAgICAgX2JvcmRlciA9IEJvZHlGYWN0b3J5LkNyZWF0ZVJlY3RhbmdsZSh3b3JsZCwgd2lkdGgsIGhlaWdodCwgMWYpO1xyXG4gICAgICAgICAgICBfYm9yZGVyLlBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgICAgIF9ib3JkZXIuQm9keVR5cGUgPSBCb2R5VHlwZS5TdGF0aWM7XHJcbiAgICAgICAgICAgIHRleHR1cmUgPSB0ZXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9iYXRjaC5EcmF3KHRleHR1cmUsIENvbnZlcnRVbml0cy5Ub0Rpc3BsYXlVbml0cyhfYm9yZGVyLlBvc2l0aW9uKSwgbnVsbCwgQ29sb3IuV2hpdGUsIDBmLCBuZXcgVmVjdG9yMih0ZXh0dXJlLldpZHRoIC8gMmYsIHRleHR1cmUuSGVpZ2h0IC8gMmYpLCBuZXcgVmVjdG9yMihDb252ZXJ0VW5pdHMuVG9EaXNwbGF5VW5pdHMoMWYpICogdyAvIHRleHR1cmUuV2lkdGgsIENvbnZlcnRVbml0cy5Ub0Rpc3BsYXlVbml0cygxZikgKiBoIC8gdGV4dHVyZS5IZWlnaHQpLCBTcHJpdGVFZmZlY3RzLk5vbmUsIDBmKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlNhbXBsZXM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkNvbGxpc2lvbi5TaGFwZXM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkNvbW1vbjtcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuRHluYW1pY3M7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkZhY3RvcmllcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuVXRpbGl0eTtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5JbnB1dC5Ub3VjaDtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuSW5wdXQ7XHJcblxyXG5uYW1lc3BhY2UgRmFyc2VlclBoeXNpY3MuU2FtcGxlcy5EZW1vc1xyXG57XHJcbiAgICBpbnRlcm5hbCBjbGFzcyBEZW1vR2FtZVNjcmVlbiA6IFBoeXNpY3NHYW1lU2NyZWVuXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBjb25zdCBpbnQgUHlyYW1pZEJhc2VCb2R5Q291bnQgPSAxNDtcclxuICAgICAgICBwcml2YXRlIFRleHR1cmUyRCBiYWNrZ3JvdW5kO1xyXG5cclxuICAgICAgICBwcml2YXRlIFB5cmFtaWQgX3B5cmFtaWQ7XHJcbiAgICAgICAgcHJpdmF0ZSBBZ2VudCBhZ2VudDtcclxuICAgICAgICBwcml2YXRlIEJvcmRlciBiMSwgYjIsIGIzLCBiNDtcclxuICAgICAgICBwcml2YXRlIFZlY3RvcjIgdG91Y2hPbiwgdG91Y2hPZmY7XHJcbiAgICAgICAgcHJpdmF0ZSBib29sIGRpZFByZXNzID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHB1YmxpYyBEZW1vR2FtZVNjcmVlbihTY3JlZW5NYW5hZ2VyIHNjcmVlbk1hbmFnZXIpIDogYmFzZShzY3JlZW5NYW5hZ2VyKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIExvYWRDb250ZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuTG9hZENvbnRlbnQoKTtcclxuICAgICAgICAgICAgZmxvYXQgZnJhbWVXaWR0aCA9IDUwZjtcclxuICAgICAgICAgICAgZmxvYXQgZnJhbWVIZWlnaHQgPSAzMGY7XHJcbiAgICAgICAgICAgIGZsb2F0IGZyYW1lVGhpY2sgPSAxZjtcclxuICAgICAgICAgICAgVmVjdG9yMiBmcmFtZVN0YXJ0UG9zID0gbmV3IFZlY3RvcjIoMmYsIDJmKTtcclxuICAgICAgICAgICAgV29ybGQuR3Jhdml0eSA9IG5ldyBWZWN0b3IyKDBmLCA4MGYpO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kID0gU2NyZWVuTWFuYWdlci5Db250ZW50LkxvYWQ8VGV4dHVyZTJEPihcIkFzc2V0cy9CYWNrZ3JvdW5kXCIpO1xyXG4gICAgICAgICAgICBfcHlyYW1pZCA9IG5ldyBQeXJhbWlkKFdvcmxkLCBTY3JlZW5NYW5hZ2VyLCBuZXcgVmVjdG9yMigzNWYsIDMzZiksIDUsIDFmKTtcclxuICAgICAgICAgICAgYWdlbnQgPSBuZXcgQWdlbnQoV29ybGQsIFNjcmVlbk1hbmFnZXIsIG5ldyBWZWN0b3IyKDVmLCAyOGYpKTtcclxuICAgICAgICAgICAgYjEgPSBuZXcgQm9yZGVyKFdvcmxkLCBTY3JlZW5NYW5hZ2VyLCBuZXcgVmVjdG9yMihmcmFtZVN0YXJ0UG9zLlgsIGZyYW1lU3RhcnRQb3MuWSArIGZyYW1lSGVpZ2h0IC8gMmYpLCBmcmFtZVRoaWNrLCBmcmFtZUhlaWdodCwgX3B5cmFtaWQudGV4KTtcclxuICAgICAgICAgICAgYjIgPSBuZXcgQm9yZGVyKFdvcmxkLCBTY3JlZW5NYW5hZ2VyLCBuZXcgVmVjdG9yMihmcmFtZVN0YXJ0UG9zLlggKyBmcmFtZVdpZHRoLCBmcmFtZVN0YXJ0UG9zLlkgKyBmcmFtZUhlaWdodCAvIDJmKSwgZnJhbWVUaGljaywgZnJhbWVIZWlnaHQsIF9weXJhbWlkLnRleCk7XHJcbiAgICAgICAgICAgIGIzID0gbmV3IEJvcmRlcihXb3JsZCwgU2NyZWVuTWFuYWdlciwgbmV3IFZlY3RvcjIoZnJhbWVTdGFydFBvcy5YICsgZnJhbWVXaWR0aCAvIDJmLCBmcmFtZVN0YXJ0UG9zLlkpLCBmcmFtZVdpZHRoLCBmcmFtZVRoaWNrLCBfcHlyYW1pZC50ZXgpO1xyXG4gICAgICAgICAgICBiNCA9IG5ldyBCb3JkZXIoV29ybGQsIFNjcmVlbk1hbmFnZXIsIG5ldyBWZWN0b3IyKGZyYW1lU3RhcnRQb3MuWCArIGZyYW1lV2lkdGggLyAyZiwgZnJhbWVTdGFydFBvcy5ZICsgZnJhbWVIZWlnaHQpLCBmcmFtZVdpZHRoLCBmcmFtZVRoaWNrLCBfcHlyYW1pZC50ZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgVXBkYXRlKEdhbWVUaW1lIGdhbWVUaW1lLCBib29sIG90aGVyU2NyZWVuSGFzRm9jdXMsIGJvb2wgY292ZXJlZEJ5T3RoZXJTY3JlZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLlVwZGF0ZShnYW1lVGltZSwgb3RoZXJTY3JlZW5IYXNGb2N1cywgY292ZXJlZEJ5T3RoZXJTY3JlZW4pO1xyXG4gICAgICAgICAgICAvL3ZhciBzdGF0ZSA9IFRvdWNoUGFuZWwuR2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgLy9mb3JlYWNoICh2YXIgdG91Y2ggaW4gc3RhdGUpXHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICBzd2l0Y2ggKHRvdWNoLlN0YXRlKVxyXG4gICAgICAgICAgICAvLyAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBjYXNlIFRvdWNoTG9jYXRpb25TdGF0ZS5QcmVzc2VkOlxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRvdWNoT24gPSB0b3VjaC5Qb3NpdGlvbjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgICAgIGNhc2UgVG91Y2hMb2NhdGlvblN0YXRlLlJlbGVhc2VkOlxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRvdWNoT2ZmID0gdG91Y2guUG9zaXRpb247XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdmFyIGZvcmNlID0gdG91Y2hPZmYgLSB0b3VjaE9uO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGFnZW50LkJvZHkuQXBwbHlGb3JjZShWZWN0b3IyLk11bHRpcGx5KGZvcmNlLCA1MGYpKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgIHZhciBtb3VzZSA9IE1vdXNlLkdldFN0YXRlKCk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobW91c2UuTGVmdEJ1dHRvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdXR0b25TdGF0ZS5QcmVzc2VkOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGlkUHJlc3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE9uID0gbmV3IFZlY3RvcjIobW91c2UuUG9zaXRpb24uWCwgbW91c2UuUG9zaXRpb24uWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZFByZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1dHRvblN0YXRlLlJlbGVhc2VkOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkaWRQcmVzcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoT2ZmID0gbmV3IFZlY3RvcjIobW91c2UuUG9zaXRpb24uWCwgbW91c2UuUG9zaXRpb24uWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JjZSA9IHRvdWNoT2ZmIC0gdG91Y2hPbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWdlbnQuQm9keS5BcHBseUZvcmNlKFZlY3RvcjIuTXVsdGlwbHkoZm9yY2UsIDE1MGYpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlkUHJlc3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIERyYXcoR2FtZVRpbWUgZ2FtZVRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoLkJlZ2luKDAsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoLkRyYXcoYmFja2dyb3VuZCwgbmV3IFZlY3RvcjIoMGYsIDBmKSwgbnVsbCwgQ29sb3IuV2hpdGUsIDBmLCBuZXcgVmVjdG9yMigwZiwgMGYpLCAxZiwgU3ByaXRlRWZmZWN0cy5Ob25lLCAwZik7XHJcbiAgICAgICAgICAgIFNjcmVlbk1hbmFnZXIuU3ByaXRlQmF0Y2guRW5kKCk7XHJcbiAgICAgICAgICAgIFNjcmVlbk1hbmFnZXIuU3ByaXRlQmF0Y2guQmVnaW4oMCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgQ2FtZXJhLlZpZXcpO1xyXG4gICAgICAgICAgICBfcHlyYW1pZC5EcmF3KCk7XHJcbiAgICAgICAgICAgIGFnZW50LkRyYXcoKTtcclxuICAgICAgICAgICAgYjEuRHJhdygpO1xyXG4gICAgICAgICAgICBiMi5EcmF3KCk7XHJcbiAgICAgICAgICAgIGIzLkRyYXcoKTtcclxuICAgICAgICAgICAgYjQuRHJhdygpO1xyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoLkVuZCgpO1xyXG4gICAgICAgICAgICBiYXNlLkRyYXcoZ2FtZVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuU2FtcGxlcy5EZW1vcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuVXRpbGl0eTtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcblxyXG5uYW1lc3BhY2UgRmFyc2VlclBoeXNpY3MuU2FtcGxlc1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gVGhpcyBpcyB0aGUgbWFpbiB0eXBlIGZvciB5b3VyIGdhbWVcclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgUGh5c2ljc0dhbWUgOiBHYW1lXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBHcmFwaGljc0RldmljZU1hbmFnZXIgX2dyYXBoaWNzO1xyXG5cclxuICAgICAgICBwdWJsaWMgUGh5c2ljc0dhbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2dyYXBoaWNzID0gbmV3IEdyYXBoaWNzRGV2aWNlTWFuYWdlcih0aGlzKTtcclxuICAgICAgICAgICAgLy9fZ3JhcGhpY3MuUHJlZmVycmVkQmFja0J1ZmZlcldpZHRoID0gMTkwMDtcclxuICAgICAgICAgICAgLy9fZ3JhcGhpY3MuUHJlZmVycmVkQmFja0J1ZmZlckhlaWdodCA9IDEwMDA7XHJcbiAgICAgICAgICAgIENvbnZlcnRVbml0cy5TZXREaXNwbGF5VW5pdFRvU2ltVW5pdFJhdGlvKDI1Zik7XHJcbiAgICAgICAgICAgIElzRml4ZWRUaW1lU3RlcCA9IHRydWU7XHJcbiAgICAgICAgICAgIF9ncmFwaGljcy5Jc0Z1bGxTY3JlZW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIENvbnRlbnQuUm9vdERpcmVjdG9yeSA9IFwiQ29udGVudFwiO1xyXG5cclxuICAgICAgICAgICAgLy9uZXctdXAgY29tcG9uZW50cyBhbmQgYWRkIHRvIEdhbWUuQ29tcG9uZW50c1xyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyID0gbmV3IFNjcmVlbk1hbmFnZXIodGhpcyk7XHJcbiAgICAgICAgICAgIENvbXBvbmVudHMuQWRkKFNjcmVlbk1hbmFnZXIpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTY3JlZW5NYW5hZ2VyIFNjcmVlbk1hbmFnZXIgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEFsbG93cyB0aGUgZ2FtZSB0byBwZXJmb3JtIGFueSBpbml0aWFsaXphdGlvbiBpdCBuZWVkcyB0byBiZWZvcmUgc3RhcnRpbmcgdG8gcnVuLlxyXG4gICAgICAgIC8vLyBUaGlzIGlzIHdoZXJlIGl0IGNhbiBxdWVyeSBmb3IgYW55IHJlcXVpcmVkIHNlcnZpY2VzIGFuZCBsb2FkIGFueSBub24tZ3JhcGhpY1xyXG4gICAgICAgIC8vLyByZWxhdGVkIGNvbnRlbnQuICBDYWxsaW5nIGJhc2UuSW5pdGlhbGl6ZSB3aWxsIGVudW1lcmF0ZSB0aHJvdWdoIGFueSBjb21wb25lbnRzXHJcbiAgICAgICAgLy8vIGFuZCBpbml0aWFsaXplIHRoZW0gYXMgd2VsbC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEluaXRpYWxpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Jbml0aWFsaXplKCk7XHJcblxyXG4gICAgICAgICAgICBEZW1vR2FtZVNjcmVlbiBkZW1vID0gbmV3IERlbW9HYW1lU2NyZWVuKFNjcmVlbk1hbmFnZXIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIFNjcmVlbk1hbmFnZXIuQWRkU2NyZWVuKGRlbW8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5Db2xsaXNpb24uU2hhcGVzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5Db21tb247XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkR5bmFtaWNzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5GYWN0b3JpZXM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlV0aWxpdHk7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxuXHJcbm5hbWVzcGFjZSBGYXJzZWVyUGh5c2ljcy5TYW1wbGVzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQeXJhbWlkXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBTcHJpdGUgX2JveDtcclxuICAgICAgICBwcml2YXRlIExpc3Q8Qm9keT4gX2JveGVzO1xyXG4gICAgICAgIHByaXZhdGUgU3ByaXRlQmF0Y2ggX2JhdGNoO1xyXG4gICAgICAgIHByaXZhdGUgZmxvYXQgd2lkdGggPSAzZjtcclxuICAgICAgICBwdWJsaWMgVGV4dHVyZTJEIHRleDtcclxuXHJcbiAgICAgICAgcHVibGljIFB5cmFtaWQoV29ybGQgd29ybGQsIFNjcmVlbk1hbmFnZXIgc2NyZWVuTWFuYWdlciwgVmVjdG9yMiBwb3NpdGlvbiwgaW50IGNvdW50LCBmbG9hdCBkZW5zaXR5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2JhdGNoID0gc2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaDtcclxuXHJcbiAgICAgICAgICAgIFZlcnRpY2VzIHJlY3QgPSBQb2x5Z29uVG9vbHMuQ3JlYXRlUmVjdGFuZ2xlKHdpZHRoIC8gMmYsIHdpZHRoIC8gMmYpO1xyXG4gICAgICAgICAgICBQb2x5Z29uU2hhcGUgc2hhcGUgPSBuZXcgUG9seWdvblNoYXBlKHJlY3QsIGRlbnNpdHkpO1xyXG5cclxuICAgICAgICAgICAgVmVjdG9yMiByb3dTdGFydCA9IHBvc2l0aW9uO1xyXG4gICAgICAgICAgICByb3dTdGFydC5ZIC09IDAuNWYgKyBjb3VudCAqIHdpZHRoICogMS4xZjtcclxuXHJcbiAgICAgICAgICAgIFZlY3RvcjIgZGVsdGFSb3cgPSBuZXcgVmVjdG9yMigtKHdpZHRoICsgMC4yZikgLyAyZiwgd2lkdGggKyAwLjFmKTtcclxuICAgICAgICAgICAgZmxvYXQgc3BhY2luZyA9IHdpZHRoICsgMC41ZjtcclxuXHJcbiAgICAgICAgICAgIF9ib3hlcyA9IG5ldyBMaXN0PEJvZHk+KCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGNvdW50OyArK2kpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFZlY3RvcjIgcG9zID0gcm93U3RhcnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBpICsgMTsgKytqKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEJvZHkgYm9keSA9IEJvZHlGYWN0b3J5LkNyZWF0ZUJvZHkod29ybGQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvZHkuQm9keVR5cGUgPSBCb2R5VHlwZS5EeW5hbWljO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvZHkuUG9zaXRpb24gPSBwb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9keS5DcmVhdGVGaXh0dXJlKHNoYXBlKTtcclxuICAgICAgICAgICAgICAgICAgICBfYm94ZXMuQWRkKGJvZHkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBwb3MuWCArPSBzcGFjaW5nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJvd1N0YXJ0ICs9IGRlbHRhUm93O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0ZXggPSBzY3JlZW5NYW5hZ2VyLkNvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiQXNzZXRzL0JveFwiKTtcclxuICAgICAgICAgICAgLy9HRlhcclxuICAgICAgICAgICAgX2JveCA9IG5ldyBTcHJpdGUodGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBfYm94ZXMuQ291bnQ7ICsraSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2JhdGNoLkRyYXcoX2JveC5UZXh0dXJlLCBDb252ZXJ0VW5pdHMuVG9EaXNwbGF5VW5pdHMoX2JveGVzW2ldLlBvc2l0aW9uKSwgbnVsbCwgQ29sb3IuV2hpdGUsIF9ib3hlc1tpXS5Sb3RhdGlvbiwgbmV3IFZlY3RvcjIoX2JveC5UZXh0dXJlLldpZHRoIC8gMmYsIF9ib3guVGV4dHVyZS5IZWlnaHQgLyAyZiksIChmbG9hdClDb252ZXJ0VW5pdHMuVG9EaXNwbGF5VW5pdHMoMWYpICogd2lkdGggLyAoZmxvYXQpX2JveC5UZXh0dXJlLldpZHRoLCBTcHJpdGVFZmZlY3RzLk5vbmUsIDBmKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdCn0K
