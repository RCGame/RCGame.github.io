/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 17.2.0
 */
Bridge.assembly("FarseerPhysics.Demo", function ($asm, globals) {
    "use strict";

    Bridge.define("FarseerPhysics.Demo.App", {
        main: function Main () {
            var button = document.createElement("button");
            button.innerHTML = "Fullscreen Experience (use landscape)";
            button.setAttribute("style", "position: fixed;\r\n    top: 50%;\r\n    left: 50%;\r\n    width: 80%;\r\n    transform: translate(-50%, -50%);\r\n    font-size: 30px;");

            button.onclick = function (e) {
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
                document.body.removeChild(button);
                var game = new FarseerPhysics.Samples.PhysicsGame();
                game.Run();
            };
            document.body.appendChild(button);
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJGYXJzZWVyUGh5c2ljcy5EZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJBZ2VudC5jcyIsIkJvcmRlci5jcyIsIkRlbW9HYW1lU2NyZWVuLmNzIiwiUGh5c2ljc0dhbWUuY3MiLCJQeXJhbWlkLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O1lBY1lBLGFBQTJCQTtZQUMzQkE7WUFDQUE7O1lBUUFBLGlCQUFpQkEsVUFBQ0E7Z0JBRWRBOzs7Ozs7Ozs7Ozs7Ozs7O2dCQWlCQUEsMEJBQTBCQTtnQkFDMUJBLFdBQW1CQSxJQUFJQTtnQkFDdkJBOztZQUVKQSwwQkFBMEJBOzs7Ozs7Ozs7Ozs7OztvQkNmcEJBLE9BQU9BOzs7Ozs7Ozs7NEJBaEJKQSxPQUFhQSxlQUE2QkE7O2dCQUVuREEsY0FBU0E7O2dCQUVUQSxrQkFBYUEsa0RBQXlCQSxPQUFPQTtnQkFDN0NBO2dCQUNBQSwyQkFBc0JBO2dCQUN0QkE7Z0JBQ0FBLDJCQUFzQkE7Z0JBQ3RCQSxVQUFVQTtnQkFFVkEsY0FBU0EsSUFBSUEscUNBQU9BOzs7OztnQkFVcEJBLG1CQUFZQSxxQkFBZ0JBLG1EQUE0QkEsb0NBQXNCQSxNQUFNQSw4Q0FBYUEsMEJBQXFCQSxJQUFJQSx1Q0FBUUEsaUNBQTJCQSxtQ0FBNkJBLEFBQU9BLDREQUFrQ0Esb0JBQWNBLEFBQU9BLDJCQUFzQkE7Ozs7Ozs7Ozs7Ozs7OzRCQ3JCcFFBLE9BQWFBLGVBQTZCQSxVQUFrQkEsT0FBYUEsUUFBY0E7O2dCQUVqR0EsU0FBSUE7Z0JBQ0pBLFNBQUlBO2dCQUNKQSxjQUFTQTtnQkFDVEEsZUFBVUEscURBQTRCQSxPQUFPQSxPQUFPQTtnQkFDcERBLHdCQUFtQkE7Z0JBQ25CQSx3QkFBbUJBO2dCQUNuQkEsZUFBVUE7Ozs7O2dCQUtWQSxpQkFBWUEsY0FBU0EsbURBQTRCQSxpQ0FBbUJBLE1BQU1BLG1EQUFpQkEsSUFBSUEsdUNBQVFBLDBC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QTs7Z0JBRTVDQSxlQUFtQkE7Z0JBQ25CQSxjQUFjQSxNQUFPQSxRQUFRQTs7Z0JBRTdCQSxlQUFtQkEsSUFBSUEsdUNBQVFBLENBQUNBLENBQUNBLHlCQUFvQkE7Z0JBQ3JEQSxjQUFnQkE7O2dCQUVoQkEsY0FBU0EsS0FBSUE7O2dCQUViQSxLQUFLQSxXQUFXQSxJQUFJQSxPQUFTQTtvQkFFekJBLFVBQWNBOztvQkFFZEEsS0FBS0EsV0FBV0EsSUFBSUEsZUFBU0E7d0JBRXpCQSxXQUFZQSxnREFBdUJBO3dCQUNuQ0EsZ0JBQWdCQTt3QkFDaEJBLGdCQUFnQkE7d0JBQ2hCQSxtQkFBbUJBO3dCQUNuQkEsZ0JBQVdBOzt3QkFFWEEsU0FBU0E7OztvQkFHYkEsMEVBQVlBOzs7Z0JBR2hCQSxXQUFNQTtnQkFFTkEsWUFBT0EsSUFBSUEscUNBQU9BOzs7OztnQkFLbEJBLEtBQUtBLFdBQVdBLElBQUlBLG1CQUFnQkE7b0JBRWhDQSxtQkFBWUEsbUJBQWNBLG1EQUE0QkEsb0JBQU9BLHVCQUFjQSxNQUFNQSw4Q0FBYUEsb0JBQU9BLGFBQWFBLElBQUlBLHVDQUFRQSwrQkFBeUJBLGlDQUEyQkEsQUFBT0EsNERBQWtDQSxhQUFRQSxBQUFPQSx5QkFBb0JBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBCcmlkZ2U7XHJcbnVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlNhbXBsZXM7XHJcblxyXG5uYW1lc3BhY2UgRmFyc2VlclBoeXNpY3MuRGVtb1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSFRNTEJ1dHRvbkVsZW1lbnQgYnV0dG9uID0gbmV3IEhUTUxCdXR0b25FbGVtZW50KCk7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5Jbm5lckhUTUwgPSBcIkZ1bGxzY3JlZW4gRXhwZXJpZW5jZSAodXNlIGxhbmRzY2FwZSlcIjtcclxuICAgICAgICAgICAgYnV0dG9uLlNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFxyXG4gICAgICAgICAgICAgICAgQFwicG9zaXRpb246IGZpeGVkO1xyXG4gICAgdG9wOiA1MCU7XHJcbiAgICBsZWZ0OiA1MCU7XHJcbiAgICB3aWR0aDogODAlO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbiAgICBmb250LXNpemU6IDMwcHg7XCIpO1xyXG5cclxuICAgICAgICAgICAgYnV0dG9uLk9uQ2xpY2sgPSAoZSkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU2NyaXB0LldyaXRlKFxyXG4gICAgICAgICAgICAgICAgICAgIEBcImlmIChkb2N1bWVudC5ib2R5LnJlcXVlc3RGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBlbHNlIGlmIChkb2N1bWVudC5ib2R5Lm1velJlcXVlc3RGdWxsU2NyZWVuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5Lm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZG9jdW1lbnQuYm9keS53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRvY3VtZW50LmJvZHkubXNSZXF1ZXN0RnVsbHNjcmVlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXCIpO1xyXG4gICAgICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5SZW1vdmVDaGlsZChidXR0b24pO1xyXG4gICAgICAgICAgICAgICAgUGh5c2ljc0dhbWUgZ2FtZSA9IG5ldyBQaHlzaWNzR2FtZSgpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5SdW4oKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5BcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIEZhcnNlZXJQaHlzaWNzLkNvbW1vbjtcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuRHluYW1pY3M7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkZhY3RvcmllcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuVXRpbGl0eTtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG5cclxubmFtZXNwYWNlIEZhcnNlZXJQaHlzaWNzLlNhbXBsZXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFnZW50XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBCb2R5IF9hZ2VudEJvZHk7XHJcbiAgICAgICAgcHJpdmF0ZSBTcHJpdGUgc3ByaXRlO1xyXG4gICAgICAgIHByaXZhdGUgU3ByaXRlQmF0Y2ggX2JhdGNoO1xyXG4gICAgICAgIHByaXZhdGUgZmxvYXQgcmFkaXVzID0gMmY7XHJcblxyXG4gICAgICAgIHB1YmxpYyBBZ2VudChXb3JsZCB3b3JsZCwgU2NyZWVuTWFuYWdlciBzY3JlZW5NYW5hZ2VyLCBWZWN0b3IyIHBvc2l0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2JhdGNoID0gc2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaDtcclxuXHJcbiAgICAgICAgICAgIF9hZ2VudEJvZHkgPSBCb2R5RmFjdG9yeS5DcmVhdGVDaXJjbGUod29ybGQsIHJhZGl1cywgMWYpO1xyXG4gICAgICAgICAgICBfYWdlbnRCb2R5Lk1hc3MgPSAyMGY7XHJcbiAgICAgICAgICAgIF9hZ2VudEJvZHkuQm9keVR5cGUgPSBCb2R5VHlwZS5EeW5hbWljO1xyXG4gICAgICAgICAgICBfYWdlbnRCb2R5LlJlc3RpdHV0aW9uID0gMC41ZjtcclxuICAgICAgICAgICAgX2FnZW50Qm9keS5Qb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgICAgICB2YXIgdGV4ID0gc2NyZWVuTWFuYWdlci5Db250ZW50LkxvYWQ8VGV4dHVyZTJEPihcIkFzc2V0cy9CYWxsXCIpO1xyXG4gICAgICAgICAgICAvL0dGWFxyXG4gICAgICAgICAgICBzcHJpdGUgPSBuZXcgU3ByaXRlKHRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQm9keSBCb2R5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gX2FnZW50Qm9keTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYmF0Y2guRHJhdyhzcHJpdGUuVGV4dHVyZSwgQ29udmVydFVuaXRzLlRvRGlzcGxheVVuaXRzKF9hZ2VudEJvZHkuUG9zaXRpb24pLCBudWxsLCBDb2xvci5XaGl0ZSwgX2FnZW50Qm9keS5Sb3RhdGlvbiwgbmV3IFZlY3RvcjIoc3ByaXRlLlRleHR1cmUuV2lkdGggLyAyZiwgc3ByaXRlLlRleHR1cmUuSGVpZ2h0IC8gMmYpLCAoZmxvYXQpQ29udmVydFVuaXRzLlRvRGlzcGxheVVuaXRzKDFmKSAqIHJhZGl1cyAqIDJmIC8gKGZsb2F0KXNwcml0ZS5UZXh0dXJlLldpZHRoLCBTcHJpdGVFZmZlY3RzLk5vbmUsIDBmKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBGYXJzZWVyUGh5c2ljcy5Db21tb247XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkR5bmFtaWNzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5GYWN0b3JpZXM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlV0aWxpdHk7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxuXHJcbm5hbWVzcGFjZSBGYXJzZWVyUGh5c2ljcy5TYW1wbGVzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCb3JkZXJcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIEJvZHkgX2JvcmRlcjtcclxuICAgICAgICBwcml2YXRlIFNwcml0ZUJhdGNoIF9iYXRjaDtcclxuICAgICAgICBwcml2YXRlIFRleHR1cmUyRCB0ZXh0dXJlO1xyXG4gICAgICAgIHByaXZhdGUgZmxvYXQgdywgaDtcclxuXHJcbiAgICAgICAgcHVibGljIEJvcmRlcihXb3JsZCB3b3JsZCwgU2NyZWVuTWFuYWdlciBzY3JlZW5NYW5hZ2VyLCBWZWN0b3IyIHBvc2l0aW9uLCBmbG9hdCB3aWR0aCwgZmxvYXQgaGVpZ2h0LCBUZXh0dXJlMkQgdGV4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdyA9IHdpZHRoO1xyXG4gICAgICAgICAgICBoID0gaGVpZ2h0O1xyXG4gICAgICAgICAgICBfYmF0Y2ggPSBzY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoO1xyXG4gICAgICAgICAgICBfYm9yZGVyID0gQm9keUZhY3RvcnkuQ3JlYXRlUmVjdGFuZ2xlKHdvcmxkLCB3aWR0aCwgaGVpZ2h0LCAxZik7XHJcbiAgICAgICAgICAgIF9ib3JkZXIuUG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICAgICAgX2JvcmRlci5Cb2R5VHlwZSA9IEJvZHlUeXBlLlN0YXRpYztcclxuICAgICAgICAgICAgdGV4dHVyZSA9IHRleDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2JhdGNoLkRyYXcodGV4dHVyZSwgQ29udmVydFVuaXRzLlRvRGlzcGxheVVuaXRzKF9ib3JkZXIuUG9zaXRpb24pLCBudWxsLCBDb2xvci5XaGl0ZSwgMGYsIG5ldyBWZWN0b3IyKHRleHR1cmUuV2lkdGggLyAyZiwgdGV4dHVyZS5IZWlnaHQgLyAyZiksIG5ldyBWZWN0b3IyKENvbnZlcnRVbml0cy5Ub0Rpc3BsYXlVbml0cygxZikgKiB3IC8gdGV4dHVyZS5XaWR0aCwgQ29udmVydFVuaXRzLlRvRGlzcGxheVVuaXRzKDFmKSAqIGggLyB0ZXh0dXJlLkhlaWdodCksIFNwcml0ZUVmZmVjdHMuTm9uZSwgMGYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuU2FtcGxlcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuQ29sbGlzaW9uLlNoYXBlcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuQ29tbW9uO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5EeW5hbWljcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuRmFjdG9yaWVzO1xyXG51c2luZyBGYXJzZWVyUGh5c2ljcy5VdGlsaXR5O1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0LlRvdWNoO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5JbnB1dDtcclxuXHJcbm5hbWVzcGFjZSBGYXJzZWVyUGh5c2ljcy5TYW1wbGVzLkRlbW9zXHJcbntcclxuICAgIGludGVybmFsIGNsYXNzIERlbW9HYW1lU2NyZWVuIDogUGh5c2ljc0dhbWVTY3JlZW5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIGNvbnN0IGludCBQeXJhbWlkQmFzZUJvZHlDb3VudCA9IDE0O1xyXG4gICAgICAgIHByaXZhdGUgVGV4dHVyZTJEIGJhY2tncm91bmQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgUHlyYW1pZCBfcHlyYW1pZDtcclxuICAgICAgICBwcml2YXRlIEFnZW50IGFnZW50O1xyXG4gICAgICAgIHByaXZhdGUgQm9yZGVyIGIxLCBiMiwgYjMsIGI0O1xyXG4gICAgICAgIHByaXZhdGUgVmVjdG9yMiB0b3VjaE9uLCB0b3VjaE9mZjtcclxuICAgICAgICBwcml2YXRlIGJvb2wgZGlkUHJlc3MgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgcHVibGljIERlbW9HYW1lU2NyZWVuKFNjcmVlbk1hbmFnZXIgc2NyZWVuTWFuYWdlcikgOiBiYXNlKHNjcmVlbk1hbmFnZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTG9hZENvbnRlbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Mb2FkQ29udGVudCgpO1xyXG4gICAgICAgICAgICBmbG9hdCB3b3JsZFJhdGlvID0gKGZsb2F0KVNjcmVlbk1hbmFnZXIuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuSGVpZ2h0IC8gMzVmO1xyXG4gICAgICAgICAgICBmbG9hdCBmcmFtZVdpZHRoID0gNTBmO1xyXG4gICAgICAgICAgICBmbG9hdCBmcmFtZUhlaWdodCA9IDMwZjtcclxuICAgICAgICAgICAgZmxvYXQgZnJhbWVUaGljayA9IDFmO1xyXG4gICAgICAgICAgICBWZWN0b3IyIGZyYW1lU3RhcnRQb3MgPSBuZXcgVmVjdG9yMigxZiwgMmYpO1xyXG4gICAgICAgICAgICBXb3JsZC5HcmF2aXR5ID0gbmV3IFZlY3RvcjIoMGYsIDgwZik7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQgPSBTY3JlZW5NYW5hZ2VyLkNvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiQXNzZXRzL0JhY2tncm91bmRcIik7XHJcbiAgICAgICAgICAgIF9weXJhbWlkID0gbmV3IFB5cmFtaWQoV29ybGQsIFNjcmVlbk1hbmFnZXIsIG5ldyBWZWN0b3IyKDM1ZiwgMzNmKSwgNSwgMWYpO1xyXG4gICAgICAgICAgICBhZ2VudCA9IG5ldyBBZ2VudChXb3JsZCwgU2NyZWVuTWFuYWdlciwgbmV3IFZlY3RvcjIoNWYsIDI4ZikpO1xyXG4gICAgICAgICAgICBiMSA9IG5ldyBCb3JkZXIoV29ybGQsIFNjcmVlbk1hbmFnZXIsIG5ldyBWZWN0b3IyKGZyYW1lU3RhcnRQb3MuWCwgZnJhbWVTdGFydFBvcy5ZICsgZnJhbWVIZWlnaHQgLyAyZiksIGZyYW1lVGhpY2ssIGZyYW1lSGVpZ2h0LCBfcHlyYW1pZC50ZXgpO1xyXG4gICAgICAgICAgICBiMiA9IG5ldyBCb3JkZXIoV29ybGQsIFNjcmVlbk1hbmFnZXIsIG5ldyBWZWN0b3IyKGZyYW1lU3RhcnRQb3MuWCArIGZyYW1lV2lkdGgsIGZyYW1lU3RhcnRQb3MuWSArIGZyYW1lSGVpZ2h0IC8gMmYpLCBmcmFtZVRoaWNrLCBmcmFtZUhlaWdodCwgX3B5cmFtaWQudGV4KTtcclxuICAgICAgICAgICAgYjMgPSBuZXcgQm9yZGVyKFdvcmxkLCBTY3JlZW5NYW5hZ2VyLCBuZXcgVmVjdG9yMihmcmFtZVN0YXJ0UG9zLlggKyBmcmFtZVdpZHRoIC8gMmYsIGZyYW1lU3RhcnRQb3MuWSksIGZyYW1lV2lkdGgsIGZyYW1lVGhpY2ssIF9weXJhbWlkLnRleCk7XHJcbiAgICAgICAgICAgIGI0ID0gbmV3IEJvcmRlcihXb3JsZCwgU2NyZWVuTWFuYWdlciwgbmV3IFZlY3RvcjIoZnJhbWVTdGFydFBvcy5YICsgZnJhbWVXaWR0aCAvIDJmLCBmcmFtZVN0YXJ0UG9zLlkgKyBmcmFtZUhlaWdodCksIGZyYW1lV2lkdGgsIGZyYW1lVGhpY2ssIF9weXJhbWlkLnRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBVcGRhdGUoR2FtZVRpbWUgZ2FtZVRpbWUsIGJvb2wgb3RoZXJTY3JlZW5IYXNGb2N1cywgYm9vbCBjb3ZlcmVkQnlPdGhlclNjcmVlbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuVXBkYXRlKGdhbWVUaW1lLCBvdGhlclNjcmVlbkhhc0ZvY3VzLCBjb3ZlcmVkQnlPdGhlclNjcmVlbik7XHJcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IFRvdWNoUGFuZWwuR2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHRvdWNoIGluIHN0YXRlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRvdWNoLlN0YXRlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVG91Y2hMb2NhdGlvblN0YXRlLlByZXNzZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoT24gPSB0b3VjaC5Qb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBUb3VjaExvY2F0aW9uU3RhdGUuUmVsZWFzZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoT2ZmID0gdG91Y2guUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JjZSA9IHRvdWNoT2ZmIC0gdG91Y2hPbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWdlbnQuQm9keS5BcHBseUZvcmNlKFZlY3RvcjIuTXVsdGlwbHkoZm9yY2UsIDMwMGYpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBtb3VzZSA9IE1vdXNlLkdldFN0YXRlKCk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobW91c2UuTGVmdEJ1dHRvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdXR0b25TdGF0ZS5QcmVzc2VkOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGlkUHJlc3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE9uID0gbmV3IFZlY3RvcjIobW91c2UuUG9zaXRpb24uWCwgbW91c2UuUG9zaXRpb24uWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZFByZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1dHRvblN0YXRlLlJlbGVhc2VkOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkaWRQcmVzcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoT2ZmID0gbmV3IFZlY3RvcjIobW91c2UuUG9zaXRpb24uWCwgbW91c2UuUG9zaXRpb24uWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JjZSA9IHRvdWNoT2ZmIC0gdG91Y2hPbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWdlbnQuQm9keS5BcHBseUZvcmNlKFZlY3RvcjIuTXVsdGlwbHkoZm9yY2UsIDE1MGYpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlkUHJlc3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIERyYXcoR2FtZVRpbWUgZ2FtZVRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb252ZXJ0VW5pdHMuU2V0RGlzcGxheVVuaXRUb1NpbVVuaXRSYXRpbygoZmxvYXQpU2NyZWVuTWFuYWdlci5HcmFwaGljc0RldmljZS5WaWV3cG9ydC5IZWlnaHQgLyAzNWYpO1xyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoLkJlZ2luKDAsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoLkRyYXcoYmFja2dyb3VuZCwgbmV3IFZlY3RvcjIoU2NyZWVuTWFuYWdlci5HcmFwaGljc0RldmljZS5WaWV3cG9ydC5XaWR0aCAvIDJmLCBTY3JlZW5NYW5hZ2VyLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkhlaWdodCAvIDJmKSwgbnVsbCwgQ29sb3IuV2hpdGUsIDBmLCBuZXcgVmVjdG9yMihiYWNrZ3JvdW5kLldpZHRoIC8gMmYsIGJhY2tncm91bmQuSGVpZ2h0IC8gMmYpLCAoZmxvYXQpU2NyZWVuTWFuYWdlci5HcmFwaGljc0RldmljZS5WaWV3cG9ydC5IZWlnaHQgLyAoZmxvYXQpYmFja2dyb3VuZC5IZWlnaHQsIFNwcml0ZUVmZmVjdHMuTm9uZSwgMGYpO1xyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoLkVuZCgpO1xyXG4gICAgICAgICAgICBTY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoLkJlZ2luKDAsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIENhbWVyYS5WaWV3KTtcclxuICAgICAgICAgICAgX3B5cmFtaWQuRHJhdygpO1xyXG4gICAgICAgICAgICBhZ2VudC5EcmF3KCk7XHJcbiAgICAgICAgICAgIGIxLkRyYXcoKTtcclxuICAgICAgICAgICAgYjIuRHJhdygpO1xyXG4gICAgICAgICAgICBiMy5EcmF3KCk7XHJcbiAgICAgICAgICAgIGI0LkRyYXcoKTtcclxuICAgICAgICAgICAgU2NyZWVuTWFuYWdlci5TcHJpdGVCYXRjaC5FbmQoKTtcclxuICAgICAgICAgICAgYmFzZS5EcmF3KGdhbWVUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlNhbXBsZXMuRGVtb3M7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLlV0aWxpdHk7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG5cclxubmFtZXNwYWNlIEZhcnNlZXJQaHlzaWNzLlNhbXBsZXNcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIFRoaXMgaXMgdGhlIG1haW4gdHlwZSBmb3IgeW91ciBnYW1lXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgcHVibGljIGNsYXNzIFBoeXNpY3NHYW1lIDogR2FtZVxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgR3JhcGhpY3NEZXZpY2VNYW5hZ2VyIF9ncmFwaGljcztcclxuXHJcbiAgICAgICAgcHVibGljIFBoeXNpY3NHYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9ncmFwaGljcyA9IG5ldyBHcmFwaGljc0RldmljZU1hbmFnZXIodGhpcyk7XHJcbiAgICAgICAgICAgIC8vX2dyYXBoaWNzLlByZWZlcnJlZEJhY2tCdWZmZXJXaWR0aCA9IDE5MDA7XHJcbiAgICAgICAgICAgIC8vX2dyYXBoaWNzLlByZWZlcnJlZEJhY2tCdWZmZXJIZWlnaHQgPSAxMDAwO1xyXG4gICAgICAgICAgICBDb252ZXJ0VW5pdHMuU2V0RGlzcGxheVVuaXRUb1NpbVVuaXRSYXRpbygoZmxvYXQpR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuSGVpZ2h0IC8gMzVmKTtcclxuICAgICAgICAgICAgSXNGaXhlZFRpbWVTdGVwID0gdHJ1ZTtcclxuICAgICAgICAgICAgX2dyYXBoaWNzLklzRnVsbFNjcmVlbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgQ29udGVudC5Sb290RGlyZWN0b3J5ID0gXCJDb250ZW50XCI7XHJcblxyXG4gICAgICAgICAgICAvL25ldy11cCBjb21wb25lbnRzIGFuZCBhZGQgdG8gR2FtZS5Db21wb25lbnRzXHJcbiAgICAgICAgICAgIFNjcmVlbk1hbmFnZXIgPSBuZXcgU2NyZWVuTWFuYWdlcih0aGlzKTtcclxuICAgICAgICAgICAgQ29tcG9uZW50cy5BZGQoU2NyZWVuTWFuYWdlcik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFNjcmVlbk1hbmFnZXIgU2NyZWVuTWFuYWdlciB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQWxsb3dzIHRoZSBnYW1lIHRvIHBlcmZvcm0gYW55IGluaXRpYWxpemF0aW9uIGl0IG5lZWRzIHRvIGJlZm9yZSBzdGFydGluZyB0byBydW4uXHJcbiAgICAgICAgLy8vIFRoaXMgaXMgd2hlcmUgaXQgY2FuIHF1ZXJ5IGZvciBhbnkgcmVxdWlyZWQgc2VydmljZXMgYW5kIGxvYWQgYW55IG5vbi1ncmFwaGljXHJcbiAgICAgICAgLy8vIHJlbGF0ZWQgY29udGVudC4gIENhbGxpbmcgYmFzZS5Jbml0aWFsaXplIHdpbGwgZW51bWVyYXRlIHRocm91Z2ggYW55IGNvbXBvbmVudHNcclxuICAgICAgICAvLy8gYW5kIGluaXRpYWxpemUgdGhlbSBhcyB3ZWxsLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgSW5pdGlhbGl6ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLkluaXRpYWxpemUoKTtcclxuXHJcbiAgICAgICAgICAgIERlbW9HYW1lU2NyZWVuIGRlbW8gPSBuZXcgRGVtb0dhbWVTY3JlZW4oU2NyZWVuTWFuYWdlcik7XHJcblxyXG5cclxuICAgICAgICAgICAgU2NyZWVuTWFuYWdlci5BZGRTY3JlZW4oZGVtbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkNvbGxpc2lvbi5TaGFwZXM7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkNvbW1vbjtcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuRHluYW1pY3M7XHJcbnVzaW5nIEZhcnNlZXJQaHlzaWNzLkZhY3RvcmllcztcclxudXNpbmcgRmFyc2VlclBoeXNpY3MuVXRpbGl0eTtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG5cclxubmFtZXNwYWNlIEZhcnNlZXJQaHlzaWNzLlNhbXBsZXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFB5cmFtaWRcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIFNwcml0ZSBfYm94O1xyXG4gICAgICAgIHByaXZhdGUgTGlzdDxCb2R5PiBfYm94ZXM7XHJcbiAgICAgICAgcHJpdmF0ZSBTcHJpdGVCYXRjaCBfYmF0Y2g7XHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdCB3aWR0aCA9IDNmO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0dXJlMkQgdGV4O1xyXG5cclxuICAgICAgICBwdWJsaWMgUHlyYW1pZChXb3JsZCB3b3JsZCwgU2NyZWVuTWFuYWdlciBzY3JlZW5NYW5hZ2VyLCBWZWN0b3IyIHBvc2l0aW9uLCBpbnQgY291bnQsIGZsb2F0IGRlbnNpdHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYmF0Y2ggPSBzY3JlZW5NYW5hZ2VyLlNwcml0ZUJhdGNoO1xyXG5cclxuICAgICAgICAgICAgVmVydGljZXMgcmVjdCA9IFBvbHlnb25Ub29scy5DcmVhdGVSZWN0YW5nbGUod2lkdGggLyAyZiwgd2lkdGggLyAyZik7XHJcbiAgICAgICAgICAgIFBvbHlnb25TaGFwZSBzaGFwZSA9IG5ldyBQb2x5Z29uU2hhcGUocmVjdCwgZGVuc2l0eSk7XHJcblxyXG4gICAgICAgICAgICBWZWN0b3IyIHJvd1N0YXJ0ID0gcG9zaXRpb247XHJcbiAgICAgICAgICAgIHJvd1N0YXJ0LlkgLT0gMC41ZiArIGNvdW50ICogd2lkdGggKiAxLjFmO1xyXG5cclxuICAgICAgICAgICAgVmVjdG9yMiBkZWx0YVJvdyA9IG5ldyBWZWN0b3IyKC0od2lkdGggKyAwLjJmKSAvIDJmLCB3aWR0aCArIDAuMWYpO1xyXG4gICAgICAgICAgICBmbG9hdCBzcGFjaW5nID0gd2lkdGggKyAwLjVmO1xyXG5cclxuICAgICAgICAgICAgX2JveGVzID0gbmV3IExpc3Q8Qm9keT4oKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgY291bnQ7ICsraSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVmVjdG9yMiBwb3MgPSByb3dTdGFydDtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IGkgKyAxOyArK2opXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQm9keSBib2R5ID0gQm9keUZhY3RvcnkuQ3JlYXRlQm9keSh3b3JsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9keS5Cb2R5VHlwZSA9IEJvZHlUeXBlLkR5bmFtaWM7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9keS5Qb3NpdGlvbiA9IHBvcztcclxuICAgICAgICAgICAgICAgICAgICBib2R5LkNyZWF0ZUZpeHR1cmUoc2hhcGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9ib3hlcy5BZGQoYm9keSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBvcy5YICs9IHNwYWNpbmc7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcm93U3RhcnQgKz0gZGVsdGFSb3c7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRleCA9IHNjcmVlbk1hbmFnZXIuQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJBc3NldHMvQm94XCIpO1xyXG4gICAgICAgICAgICAvL0dGWFxyXG4gICAgICAgICAgICBfYm94ID0gbmV3IFNwcml0ZSh0ZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IF9ib3hlcy5Db3VudDsgKytpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfYmF0Y2guRHJhdyhfYm94LlRleHR1cmUsIENvbnZlcnRVbml0cy5Ub0Rpc3BsYXlVbml0cyhfYm94ZXNbaV0uUG9zaXRpb24pLCBudWxsLCBDb2xvci5XaGl0ZSwgX2JveGVzW2ldLlJvdGF0aW9uLCBuZXcgVmVjdG9yMihfYm94LlRleHR1cmUuV2lkdGggLyAyZiwgX2JveC5UZXh0dXJlLkhlaWdodCAvIDJmKSwgKGZsb2F0KUNvbnZlcnRVbml0cy5Ub0Rpc3BsYXlVbml0cygxZikgKiB3aWR0aCAvIChmbG9hdClfYm94LlRleHR1cmUuV2lkdGgsIFNwcml0ZUVmZmVjdHMuTm9uZSwgMGYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il0KfQo=
