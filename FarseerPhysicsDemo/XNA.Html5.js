/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 17.2.0
 */
Bridge.assembly("XNA.Html5", function ($asm, globals) {
    "use strict";

    Bridge.define("Microsoft.Xna.Framework.Content.Loadable", {
        fields: {
            Name: null
        }
    });

    Bridge.define("Microsoft.Xna.Framework.BoundingBox", {
        inherits: function () { return [System.IEquatable$1(Microsoft.Xna.Framework.BoundingBox)]; },
        $kind: "struct",
        statics: {
            fields: {
                CornerCount: 0,
                MaxVector3: null,
                MinVector3: null
            },
            ctors: {
                init: function () {
                    this.MaxVector3 = new Microsoft.Xna.Framework.Vector3();
                    this.MinVector3 = new Microsoft.Xna.Framework.Vector3();
                    this.CornerCount = 8;
                    this.MaxVector3 = new Microsoft.Xna.Framework.Vector3.$ctor2(3.40282347E+38);
                    this.MinVector3 = new Microsoft.Xna.Framework.Vector3.$ctor2(-3.40282347E+38);
                }
            },
            methods: {
                /**
                 * Create a bounding box from the given list of points.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.BoundingBox
                 * @memberof Microsoft.Xna.Framework.BoundingBox
                 * @throws {System.ArgumentException} Thrown if the given list has no points.
                 * @param   {System.Collections.Generic.IEnumerable$1}    points    The list of Vector3 instances defining the point cloud to bound
                 * @return  {Microsoft.Xna.Framework.BoundingBox}                   A bounding box that encapsulates the given point cloud.
                 */
                CreateFromPoints: function (points) {
                    var $t;
                    if (points == null) {
                        throw new System.ArgumentNullException.ctor();
                    }

                    var empty = true;
                    var minVec = Microsoft.Xna.Framework.BoundingBox.MaxVector3.$clone();
                    var maxVec = Microsoft.Xna.Framework.BoundingBox.MinVector3.$clone();
                    $t = Bridge.getEnumerator(points, Microsoft.Xna.Framework.Vector3);
                    try {
                        while ($t.moveNext()) {
                            var ptVector = $t.Current.$clone();
                            minVec.X = (minVec.X < ptVector.X) ? minVec.X : ptVector.X;
                            minVec.Y = (minVec.Y < ptVector.Y) ? minVec.Y : ptVector.Y;
                            minVec.Z = (minVec.Z < ptVector.Z) ? minVec.Z : ptVector.Z;

                            maxVec.X = (maxVec.X > ptVector.X) ? maxVec.X : ptVector.X;
                            maxVec.Y = (maxVec.Y > ptVector.Y) ? maxVec.Y : ptVector.Y;
                            maxVec.Z = (maxVec.Z > ptVector.Z) ? maxVec.Z : ptVector.Z;

                            empty = false;
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }if (empty) {
                        throw new System.ArgumentException.ctor();
                    }

                    return new Microsoft.Xna.Framework.BoundingBox.$ctor1(minVec.$clone(), maxVec.$clone());
                },
                CreateFromSphere: function (sphere) {
                    sphere = {v:sphere};
                    var result = { v : new Microsoft.Xna.Framework.BoundingBox() };
                    Microsoft.Xna.Framework.BoundingBox.CreateFromSphere$1(sphere, result);
                    return result.v.$clone();
                },
                CreateFromSphere$1: function (sphere, result) {
                    var corner = new Microsoft.Xna.Framework.Vector3.$ctor2(sphere.v.Radius);
                    result.v.Min = Microsoft.Xna.Framework.Vector3.op_Subtraction(sphere.v.Center.$clone(), corner.$clone());
                    result.v.Max = Microsoft.Xna.Framework.Vector3.op_Addition(sphere.v.Center.$clone(), corner.$clone());
                },
                CreateMerged: function (original, additional) {
                    original = {v:original};
                    additional = {v:additional};
                    var result = { v : new Microsoft.Xna.Framework.BoundingBox() };
                    Microsoft.Xna.Framework.BoundingBox.CreateMerged$1(original, additional, result);
                    return result.v.$clone();
                },
                CreateMerged$1: function (original, additional, result) {
                    result.v.Min.X = Math.min(original.v.Min.X, additional.v.Min.X);
                    result.v.Min.Y = Math.min(original.v.Min.Y, additional.v.Min.Y);
                    result.v.Min.Z = Math.min(original.v.Min.Z, additional.v.Min.Z);
                    result.v.Max.X = Math.max(original.v.Max.X, additional.v.Max.X);
                    result.v.Max.Y = Math.max(original.v.Max.Y, additional.v.Max.Y);
                    result.v.Max.Z = Math.max(original.v.Max.Z, additional.v.Max.Z);
                },
                op_Equality: function (a, b) {
                    return a.equalsT(b.$clone());
                },
                op_Inequality: function (a, b) {
                    return !a.equalsT(b.$clone());
                },
                getDefaultValue: function () { return new Microsoft.Xna.Framework.BoundingBox(); }
            }
        },
        fields: {
            Min: null,
            Max: null
        },
        props: {
            DebugDisplayString: {
                get: function () {
                    return System.String.concat(["Min( ", this.Min.DebugDisplayString, " )  \r\n", "Max( ", this.Max.DebugDisplayString, " )"]);
                }
            }
        },
        alias: ["equalsT", "System$IEquatable$1$Microsoft$Xna$Framework$BoundingBox$equalsT"],
        ctors: {
            init: function () {
                this.Min = new Microsoft.Xna.Framework.Vector3();
                this.Max = new Microsoft.Xna.Framework.Vector3();
            },
            $ctor1: function (min, max) {
                this.$initialize();
                this.Min = min.$clone();
                this.Max = max.$clone();
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            Contains: function (box) {
                if (box.Max.X < this.Min.X || box.Min.X > this.Max.X || box.Max.Y < this.Min.Y || box.Min.Y > this.Max.Y || box.Max.Z < this.Min.Z || box.Min.Z > this.Max.Z) {
                    return Microsoft.Xna.Framework.ContainmentType.Disjoint;
                }


                if (box.Min.X >= this.Min.X && box.Max.X <= this.Max.X && box.Min.Y >= this.Min.Y && box.Max.Y <= this.Max.Y && box.Min.Z >= this.Min.Z && box.Max.Z <= this.Max.Z) {
                    return Microsoft.Xna.Framework.ContainmentType.Contains;
                }

                return Microsoft.Xna.Framework.ContainmentType.Intersects;
            },
            Contains$4: function (box, result) {
                result.v = this.Contains(box.v.$clone());
            },
            Contains$1: function (frustum) {
                var i;
                var contained = { v : new Microsoft.Xna.Framework.ContainmentType() };
                var corners = frustum.GetCorners();

                for (i = 0; i < corners.length; i = (i + 1) | 0) {
                    this.Contains$6(Bridge.ref(corners, i), contained);
                    if (contained.v === Microsoft.Xna.Framework.ContainmentType.Disjoint) {
                        break;
                    }
                }

                if (i === corners.length) {
                    return Microsoft.Xna.Framework.ContainmentType.Contains;
                }

                if (i !== 0) {
                    return Microsoft.Xna.Framework.ContainmentType.Intersects;
                }


                i = (i + 1) | 0;
                for (; i < corners.length; i = (i + 1) | 0) {
                    this.Contains$6(Bridge.ref(corners, i), contained);
                    if (contained.v !== Microsoft.Xna.Framework.ContainmentType.Contains) {
                        return Microsoft.Xna.Framework.ContainmentType.Intersects;
                    }

                }

                return Microsoft.Xna.Framework.ContainmentType.Contains;
            },
            Contains$2: function (sphere) {
                if (sphere.Center.X - this.Min.X >= sphere.Radius && sphere.Center.Y - this.Min.Y >= sphere.Radius && sphere.Center.Z - this.Min.Z >= sphere.Radius && this.Max.X - sphere.Center.X >= sphere.Radius && this.Max.Y - sphere.Center.Y >= sphere.Radius && this.Max.Z - sphere.Center.Z >= sphere.Radius) {
                    return Microsoft.Xna.Framework.ContainmentType.Contains;
                }

                var dmin = 0;

                var e = sphere.Center.X - this.Min.X;
                if (e < 0) {
                    if (e < -sphere.Radius) {
                        return Microsoft.Xna.Framework.ContainmentType.Disjoint;
                    }
                    dmin += e * e;
                } else {
                    e = sphere.Center.X - this.Max.X;
                    if (e > 0) {
                        if (e > sphere.Radius) {
                            return Microsoft.Xna.Framework.ContainmentType.Disjoint;
                        }
                        dmin += e * e;
                    }
                }

                e = sphere.Center.Y - this.Min.Y;
                if (e < 0) {
                    if (e < -sphere.Radius) {
                        return Microsoft.Xna.Framework.ContainmentType.Disjoint;
                    }
                    dmin += e * e;
                } else {
                    e = sphere.Center.Y - this.Max.Y;
                    if (e > 0) {
                        if (e > sphere.Radius) {
                            return Microsoft.Xna.Framework.ContainmentType.Disjoint;
                        }
                        dmin += e * e;
                    }
                }

                e = sphere.Center.Z - this.Min.Z;
                if (e < 0) {
                    if (e < -sphere.Radius) {
                        return Microsoft.Xna.Framework.ContainmentType.Disjoint;
                    }
                    dmin += e * e;
                } else {
                    e = sphere.Center.Z - this.Max.Z;
                    if (e > 0) {
                        if (e > sphere.Radius) {
                            return Microsoft.Xna.Framework.ContainmentType.Disjoint;
                        }
                        dmin += e * e;
                    }
                }

                if (dmin <= sphere.Radius * sphere.Radius) {
                    return Microsoft.Xna.Framework.ContainmentType.Intersects;
                }

                return Microsoft.Xna.Framework.ContainmentType.Disjoint;
            },
            Contains$5: function (sphere, result) {
                result.v = this.Contains$2(sphere.v.$clone());
            },
            Contains$3: function (point) {
                point = {v:point};
                var result = { v : new Microsoft.Xna.Framework.ContainmentType() };
                this.Contains$6(point, result);
                return result.v;
            },
            Contains$6: function (point, result) {
                if (point.v.X < this.Min.X || point.v.X > this.Max.X || point.v.Y < this.Min.Y || point.v.Y > this.Max.Y || point.v.Z < this.Min.Z || point.v.Z > this.Max.Z) {
                    result.v = Microsoft.Xna.Framework.ContainmentType.Disjoint;
                } else {
                    result.v = Microsoft.Xna.Framework.ContainmentType.Contains;
                }
            },
            equalsT: function (other) {
                return (Microsoft.Xna.Framework.Vector3.op_Equality(this.Min.$clone(), other.Min.$clone())) && (Microsoft.Xna.Framework.Vector3.op_Equality(this.Max.$clone(), other.Max.$clone()));
            },
            equals: function (obj) {
                return (Bridge.is(obj, Microsoft.Xna.Framework.BoundingBox)) ? this.equalsT(System.Nullable.getValue(Bridge.cast(Bridge.unbox(obj, Microsoft.Xna.Framework.BoundingBox), Microsoft.Xna.Framework.BoundingBox))) : false;
            },
            GetCorners: function () {
                return System.Array.init([new Microsoft.Xna.Framework.Vector3.$ctor3(this.Min.X, this.Max.Y, this.Max.Z), new Microsoft.Xna.Framework.Vector3.$ctor3(this.Max.X, this.Max.Y, this.Max.Z), new Microsoft.Xna.Framework.Vector3.$ctor3(this.Max.X, this.Min.Y, this.Max.Z), new Microsoft.Xna.Framework.Vector3.$ctor3(this.Min.X, this.Min.Y, this.Max.Z), new Microsoft.Xna.Framework.Vector3.$ctor3(this.Min.X, this.Max.Y, this.Min.Z), new Microsoft.Xna.Framework.Vector3.$ctor3(this.Max.X, this.Max.Y, this.Min.Z), new Microsoft.Xna.Framework.Vector3.$ctor3(this.Max.X, this.Min.Y, this.Min.Z), new Microsoft.Xna.Framework.Vector3.$ctor3(this.Min.X, this.Min.Y, this.Min.Z)], Microsoft.Xna.Framework.Vector3);
            },
            GetCorners$1: function (corners) {
                if (corners == null) {
                    throw new System.ArgumentNullException.$ctor1("corners");
                }
                if (corners.length < 8) {
                    throw new System.ArgumentOutOfRangeException.$ctor4("corners", "Not Enought Corners");
                }
                corners[System.Array.index(0, corners)].X = this.Min.X;
                corners[System.Array.index(0, corners)].Y = this.Max.Y;
                corners[System.Array.index(0, corners)].Z = this.Max.Z;
                corners[System.Array.index(1, corners)].X = this.Max.X;
                corners[System.Array.index(1, corners)].Y = this.Max.Y;
                corners[System.Array.index(1, corners)].Z = this.Max.Z;
                corners[System.Array.index(2, corners)].X = this.Max.X;
                corners[System.Array.index(2, corners)].Y = this.Min.Y;
                corners[System.Array.index(2, corners)].Z = this.Max.Z;
                corners[System.Array.index(3, corners)].X = this.Min.X;
                corners[System.Array.index(3, corners)].Y = this.Min.Y;
                corners[System.Array.index(3, corners)].Z = this.Max.Z;
                corners[System.Array.index(4, corners)].X = this.Min.X;
                corners[System.Array.index(4, corners)].Y = this.Max.Y;
                corners[System.Array.index(4, corners)].Z = this.Min.Z;
                corners[System.Array.index(5, corners)].X = this.Max.X;
                corners[System.Array.index(5, corners)].Y = this.Max.Y;
                corners[System.Array.index(5, corners)].Z = this.Min.Z;
                corners[System.Array.index(6, corners)].X = this.Max.X;
                corners[System.Array.index(6, corners)].Y = this.Min.Y;
                corners[System.Array.index(6, corners)].Z = this.Min.Z;
                corners[System.Array.index(7, corners)].X = this.Min.X;
                corners[System.Array.index(7, corners)].Y = this.Min.Y;
                corners[System.Array.index(7, corners)].Z = this.Min.Z;
            },
            getHashCode: function () {
                return ((this.Min.getHashCode() + this.Max.getHashCode()) | 0);
            },
            Intersects$1: function (box) {
                box = {v:box};
                var result = { };
                this.Intersects$5(box, result);
                return result.v;
            },
            Intersects$5: function (box, result) {
                if ((this.Max.X >= box.v.Min.X) && (this.Min.X <= box.v.Max.X)) {
                    if ((this.Max.Y < box.v.Min.Y) || (this.Min.Y > box.v.Max.Y)) {
                        result.v = false;
                        return;
                    }

                    result.v = (this.Max.Z >= box.v.Min.Z) && (this.Min.Z <= box.v.Max.Z);
                    return;
                }

                result.v = false;
                return;
            },
            Intersects$2: function (frustum) {
                return frustum.Intersects$1(this);
            },
            Intersects$3: function (sphere) {
                if (sphere.Center.X - this.Min.X > sphere.Radius && sphere.Center.Y - this.Min.Y > sphere.Radius && sphere.Center.Z - this.Min.Z > sphere.Radius && this.Max.X - sphere.Center.X > sphere.Radius && this.Max.Y - sphere.Center.Y > sphere.Radius && this.Max.Z - sphere.Center.Z > sphere.Radius) {
                    return true;
                }

                var dmin = 0;

                if (sphere.Center.X - this.Min.X <= sphere.Radius) {
                    dmin += (sphere.Center.X - this.Min.X) * (sphere.Center.X - this.Min.X);
                } else {
                    if (this.Max.X - sphere.Center.X <= sphere.Radius) {
                        dmin += (sphere.Center.X - this.Max.X) * (sphere.Center.X - this.Max.X);
                    }
                }

                if (sphere.Center.Y - this.Min.Y <= sphere.Radius) {
                    dmin += (sphere.Center.Y - this.Min.Y) * (sphere.Center.Y - this.Min.Y);
                } else {
                    if (this.Max.Y - sphere.Center.Y <= sphere.Radius) {
                        dmin += (sphere.Center.Y - this.Max.Y) * (sphere.Center.Y - this.Max.Y);
                    }
                }

                if (sphere.Center.Z - this.Min.Z <= sphere.Radius) {
                    dmin += (sphere.Center.Z - this.Min.Z) * (sphere.Center.Z - this.Min.Z);
                } else {
                    if (this.Max.Z - sphere.Center.Z <= sphere.Radius) {
                        dmin += (sphere.Center.Z - this.Max.Z) * (sphere.Center.Z - this.Max.Z);
                    }
                }

                if (dmin <= sphere.Radius * sphere.Radius) {
                    return true;
                }

                return false;
            },
            Intersects$6: function (sphere, result) {
                result.v = this.Intersects$3(sphere.v.$clone());
            },
            Intersects: function (plane) {
                plane = {v:plane};
                var result = { v : new Microsoft.Xna.Framework.PlaneIntersectionType() };
                this.Intersects$7(plane, result);
                return result.v;
            },
            Intersects$7: function (plane, result) {

                var positiveVertex = new Microsoft.Xna.Framework.Vector3();
                var negativeVertex = new Microsoft.Xna.Framework.Vector3();

                if (plane.v.Normal.X >= 0) {
                    positiveVertex.X = this.Max.X;
                    negativeVertex.X = this.Min.X;
                } else {
                    positiveVertex.X = this.Min.X;
                    negativeVertex.X = this.Max.X;
                }

                if (plane.v.Normal.Y >= 0) {
                    positiveVertex.Y = this.Max.Y;
                    negativeVertex.Y = this.Min.Y;
                } else {
                    positiveVertex.Y = this.Min.Y;
                    negativeVertex.Y = this.Max.Y;
                }

                if (plane.v.Normal.Z >= 0) {
                    positiveVertex.Z = this.Max.Z;
                    negativeVertex.Z = this.Min.Z;
                } else {
                    positiveVertex.Z = this.Min.Z;
                    negativeVertex.Z = this.Max.Z;
                }

                var distance = plane.v.Normal.X * negativeVertex.X + plane.v.Normal.Y * negativeVertex.Y + plane.v.Normal.Z * negativeVertex.Z + plane.v.D;
                if (distance > 0) {
                    result.v = Microsoft.Xna.Framework.PlaneIntersectionType.Front;
                    return;
                }

                distance = plane.v.Normal.X * positiveVertex.X + plane.v.Normal.Y * positiveVertex.Y + plane.v.Normal.Z * positiveVertex.Z + plane.v.D;
                if (distance < 0) {
                    result.v = Microsoft.Xna.Framework.PlaneIntersectionType.Back;
                    return;
                }

                result.v = Microsoft.Xna.Framework.PlaneIntersectionType.Intersecting;
            },
            Intersects$4: function (ray) {
                return ray.Intersects(this);
            },
            Intersects$8: function (ray, result) {
                result.v = this.Intersects$4(ray.v.$clone());
            },
            toString: function () {
                return "{{Min:" + (this.Min.toString() || "") + " Max:" + (this.Max.toString() || "") + "}}";
            },
            /**
             * Deconstruction method for {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingBox
             * @memberof Microsoft.Xna.Framework.BoundingBox
             * @param   {Microsoft.Xna.Framework.Vector3}    min    
             * @param   {Microsoft.Xna.Framework.Vector3}    max
             * @return  {void}
             */
            Deconstruct: function (min, max) {
                min.v = this.Min.$clone();
                max.v = this.Max.$clone();
            },
            $clone: function (to) {
                var s = to || new Microsoft.Xna.Framework.BoundingBox();
                s.Min = this.Min.$clone();
                s.Max = this.Max.$clone();
                return s;
            }
        }
    });

    /** @namespace Microsoft.Xna.Framework */

    /**
     * Defines a viewing frustum for intersection operations.
     *
     * @public
     * @class Microsoft.Xna.Framework.BoundingFrustum
     * @implements  System.IEquatable$1
     */
    Bridge.define("Microsoft.Xna.Framework.BoundingFrustum", {
        inherits: function () { return [System.IEquatable$1(Microsoft.Xna.Framework.BoundingFrustum)]; },
        statics: {
            fields: {
                /**
                 * The number of planes in the frustum.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.BoundingFrustum
                 * @constant
                 * @default 6
                 * @type number
                 */
                PlaneCount: 0,
                /**
                 * The number of corner points in the frustum.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.BoundingFrustum
                 * @constant
                 * @default 8
                 * @type number
                 */
                CornerCount: 0
            },
            ctors: {
                init: function () {
                    this.PlaneCount = 6;
                    this.CornerCount = 8;
                }
            },
            methods: {
                IntersectionPoint: function (a, b, c, result) {

                    var v1 = { v : new Microsoft.Xna.Framework.Vector3() }, v2 = { v : new Microsoft.Xna.Framework.Vector3() }, v3 = { v : new Microsoft.Xna.Framework.Vector3() };
                    var cross = { v : new Microsoft.Xna.Framework.Vector3() };

                    Microsoft.Xna.Framework.Vector3.Cross$1(Bridge.ref(b.v, "Normal"), Bridge.ref(c.v, "Normal"), cross);

                    var f = { };
                    Microsoft.Xna.Framework.Vector3.Dot$1(Bridge.ref(a.v, "Normal"), cross, f);
                    f.v *= -1.0;

                    Microsoft.Xna.Framework.Vector3.Cross$1(Bridge.ref(b.v, "Normal"), Bridge.ref(c.v, "Normal"), cross);
                    Microsoft.Xna.Framework.Vector3.Multiply$3(cross, a.v.D, v1);


                    Microsoft.Xna.Framework.Vector3.Cross$1(Bridge.ref(c.v, "Normal"), Bridge.ref(a.v, "Normal"), cross);
                    Microsoft.Xna.Framework.Vector3.Multiply$3(cross, b.v.D, v2);


                    Microsoft.Xna.Framework.Vector3.Cross$1(Bridge.ref(a.v, "Normal"), Bridge.ref(b.v, "Normal"), cross);
                    Microsoft.Xna.Framework.Vector3.Multiply$3(cross, c.v.D, v3);

                    result.v.X = (v1.v.X + v2.v.X + v3.v.X) / f.v;
                    result.v.Y = (v1.v.Y + v2.v.Y + v3.v.Y) / f.v;
                    result.v.Z = (v1.v.Z + v2.v.Z + v3.v.Z) / f.v;
                }/**
                 * Compares whether two {@link } instances are equal.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.BoundingFrustum
                 * @memberof Microsoft.Xna.Framework.BoundingFrustum
                 * @param   {Microsoft.Xna.Framework.BoundingFrustum}    a    {@link } instance on the left of the equal sign.
                 * @param   {Microsoft.Xna.Framework.BoundingFrustum}    b    {@link } instance on the right of the equal sign.
                 * @return  {boolean}                                         <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
                 */
                ,
                op_Equality: function (a, b) {
                    if (Bridge.equals(a, null)) {
                        return (Bridge.equals(b, null));
                    }

                    if (Bridge.equals(b, null)) {
                        return (Bridge.equals(a, null));
                    }

                    return Microsoft.Xna.Framework.Matrix.op_Equality(a._matrix.$clone(), (b._matrix));
                }/**
                 * Compares whether two {@link } instances are not equal.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.BoundingFrustum
                 * @memberof Microsoft.Xna.Framework.BoundingFrustum
                 * @param   {Microsoft.Xna.Framework.BoundingFrustum}    a    {@link } instance on the left of the not equal sign.
                 * @param   {Microsoft.Xna.Framework.BoundingFrustum}    b    {@link } instance on the right of the not equal sign.
                 * @return  {boolean}                                         <pre><code>true</code></pre> if the instances are not equal; <pre><code>false</code></pre> otherwise.
                 */
                ,
                op_Inequality: function (a, b) {
                    return !(Microsoft.Xna.Framework.BoundingFrustum.op_Equality(a, b));
                }
            }
        },
        fields: {
            _matrix: null,
            _corners: null,
            _planes: null
        },
        props: {
            /**
             * Gets or sets the {@link } of the frustum.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @function Matrix
             * @type Microsoft.Xna.Framework.Matrix
             */
            Matrix: {
                get: function () {
                    return this._matrix.$clone();
                },
                set: function (value) {
                    this._matrix = value.$clone();
                    this.CreatePlanes();
                    this.CreateCorners();
                }
            },
            /**
             * Gets the near plane of the frustum.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @function Near
             * @type Microsoft.Xna.Framework.Plane
             */
            Near: {
                get: function () {
                    return this._planes[System.Array.index(0, this._planes)].$clone();
                }
            },
            /**
             * Gets the far plane of the frustum.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @function Far
             * @type Microsoft.Xna.Framework.Plane
             */
            Far: {
                get: function () {
                    return this._planes[System.Array.index(1, this._planes)].$clone();
                }
            },
            /**
             * Gets the left plane of the frustum.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @function Left
             * @type Microsoft.Xna.Framework.Plane
             */
            Left: {
                get: function () {
                    return this._planes[System.Array.index(2, this._planes)].$clone();
                }
            },
            /**
             * Gets the right plane of the frustum.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @function Right
             * @type Microsoft.Xna.Framework.Plane
             */
            Right: {
                get: function () {
                    return this._planes[System.Array.index(3, this._planes)].$clone();
                }
            },
            /**
             * Gets the top plane of the frustum.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @function Top
             * @type Microsoft.Xna.Framework.Plane
             */
            Top: {
                get: function () {
                    return this._planes[System.Array.index(4, this._planes)].$clone();
                }
            },
            /**
             * Gets the bottom plane of the frustum.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @function Bottom
             * @type Microsoft.Xna.Framework.Plane
             */
            Bottom: {
                get: function () {
                    return this._planes[System.Array.index(5, this._planes)].$clone();
                }
            },
            DebugDisplayString: {
                get: function () {
                    return System.String.concat(["Near( ", this._planes[System.Array.index(0, this._planes)].DebugDisplayString, " )  \r\n", "Far( ", this._planes[System.Array.index(1, this._planes)].DebugDisplayString, " )  \r\n", "Left( ", this._planes[System.Array.index(2, this._planes)].DebugDisplayString, " )  \r\n", "Right( ", this._planes[System.Array.index(3, this._planes)].DebugDisplayString, " )  \r\n", "Top( ", this._planes[System.Array.index(4, this._planes)].DebugDisplayString, " )  \r\n", "Bottom( ", this._planes[System.Array.index(5, this._planes)].DebugDisplayString, " )  "]);
                }
            }
        },
        alias: ["equalsT", "System$IEquatable$1$Microsoft$Xna$Framework$BoundingFrustum$equalsT"],
        ctors: {
            init: function () {
                this._matrix = new Microsoft.Xna.Framework.Matrix();
                this._corners = System.Array.init(Microsoft.Xna.Framework.BoundingFrustum.CornerCount, function (){
                    return new Microsoft.Xna.Framework.Vector3();
                }, Microsoft.Xna.Framework.Vector3);
                this._planes = System.Array.init(Microsoft.Xna.Framework.BoundingFrustum.PlaneCount, function (){
                    return new Microsoft.Xna.Framework.Plane();
                }, Microsoft.Xna.Framework.Plane);
            },
            /**
             * Constructs the frustum by extracting the view planes from a matrix.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingFrustum
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @param   {Microsoft.Xna.Framework.Matrix}    value    Combined matrix which usually is (View * Projection).
             * @return  {void}
             */
            ctor: function (value) {
                this.$initialize();
                this._matrix = value.$clone();
                this.CreatePlanes();
                this.CreateCorners();
            }
        },
        methods: {
            /**
             * Containment test between this {@link } and specified {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingFrustum
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @param   {Microsoft.Xna.Framework.BoundingBox}        box    A {@link } for testing.
             * @return  {Microsoft.Xna.Framework.ContainmentType}           Result of testing for containment between this {@link } and specified {@link }.
             */
            Contains: function (box) {
                box = {v:box};
                var result = { v : 0 };
                this.Contains$4(box, result);
                return result.v;
            },
            /**
             * Containment test between this {@link } and specified {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingFrustum
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @param   {Microsoft.Xna.Framework.BoundingBox}        box       A {@link } for testing.
             * @param   {Microsoft.Xna.Framework.ContainmentType}    result    Result of testing for containment between this {@link } and specified {@link } as an output parameter.
             * @return  {void}
             */
            Contains$4: function (box, result) {
                var intersects = false;
                for (var i = 0; i < Microsoft.Xna.Framework.BoundingFrustum.PlaneCount; i = (i + 1) | 0) {
                    var planeIntersectionType = { v : 0 };
                    box.v.Intersects$7(Bridge.ref(this._planes, i), planeIntersectionType);
                    switch (planeIntersectionType.v) {
                        case Microsoft.Xna.Framework.PlaneIntersectionType.Front: 
                            result.v = Microsoft.Xna.Framework.ContainmentType.Disjoint;
                            return;
                        case Microsoft.Xna.Framework.PlaneIntersectionType.Intersecting: 
                            intersects = true;
                            break;
                    }
                }
                result.v = intersects ? Microsoft.Xna.Framework.ContainmentType.Intersects : Microsoft.Xna.Framework.ContainmentType.Contains;
            },
            /**
             * Containment test between this {@link } and specified {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingFrustum
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @param   {Microsoft.Xna.Framework.BoundingFrustum}    frustum    A {@link } for testing.
             * @return  {Microsoft.Xna.Framework.ContainmentType}               Result of testing for containment between this {@link } and specified {@link }.
             */
            Contains$1: function (frustum) {
                if (Microsoft.Xna.Framework.BoundingFrustum.op_Equality(this, frustum)) {
                    return Microsoft.Xna.Framework.ContainmentType.Contains;
                }

                var intersects = false;
                for (var i = 0; i < Microsoft.Xna.Framework.BoundingFrustum.PlaneCount; i = (i + 1) | 0) {
                    var planeIntersectionType = { v : new Microsoft.Xna.Framework.PlaneIntersectionType() };
                    frustum.Intersects$7(Bridge.ref(this._planes, i), planeIntersectionType);
                    switch (planeIntersectionType.v) {
                        case Microsoft.Xna.Framework.PlaneIntersectionType.Front: 
                            return Microsoft.Xna.Framework.ContainmentType.Disjoint;
                        case Microsoft.Xna.Framework.PlaneIntersectionType.Intersecting: 
                            intersects = true;
                            break;
                    }
                }
                return intersects ? Microsoft.Xna.Framework.ContainmentType.Intersects : Microsoft.Xna.Framework.ContainmentType.Contains;
            },
            /**
             * Containment test between this {@link } and specified {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingFrustum
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @param   {Microsoft.Xna.Framework.BoundingSphere}     sphere    A {@link } for testing.
             * @return  {Microsoft.Xna.Framework.ContainmentType}              Result of testing for containment between this {@link } and specified {@link }.
             */
            Contains$2: function (sphere) {
                sphere = {v:sphere};
                var result = { v : 0 };
                this.Contains$5(sphere, result);
                return result.v;
            },
            /**
             * Containment test between this {@link } and specified {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingFrustum
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @param   {Microsoft.Xna.Framework.BoundingSphere}     sphere    A {@link } for testing.
             * @param   {Microsoft.Xna.Framework.ContainmentType}    result    Result of testing for containment between this {@link } and specified {@link } as an output parameter.
             * @return  {void}
             */
            Contains$5: function (sphere, result) {
                var intersects = false;
                for (var i = 0; i < Microsoft.Xna.Framework.BoundingFrustum.PlaneCount; i = (i + 1) | 0) {
                    var planeIntersectionType = { v : 0 };

                    sphere.v.Intersects$6(Bridge.ref(this._planes, i), planeIntersectionType);
                    switch (planeIntersectionType.v) {
                        case Microsoft.Xna.Framework.PlaneIntersectionType.Front: 
                            result.v = Microsoft.Xna.Framework.ContainmentType.Disjoint;
                            return;
                        case Microsoft.Xna.Framework.PlaneIntersectionType.Intersecting: 
                            intersects = true;
                            break;
                    }
                }
                result.v = intersects ? Microsoft.Xna.Framework.ContainmentType.Intersects : Microsoft.Xna.Framework.ContainmentType.Contains;
            },
            /**
             * Containment test between this {@link } and specified {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingFrustum
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @param   {Microsoft.Xna.Framework.Vector3}            point    A {@link } for testing.
             * @return  {Microsoft.Xna.Framework.ContainmentType}             Result of testing for containment between this {@link } and specified {@link }.
             */
            Contains$3: function (point) {
                point = {v:point};
                var result = { v : 0 };
                this.Contains$6(point, result);
                return result.v;
            },
            /**
             * Containment test between this {@link } and specified {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingFrustum
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @param   {Microsoft.Xna.Framework.Vector3}            point     A {@link } for testing.
             * @param   {Microsoft.Xna.Framework.ContainmentType}    result    Result of testing for containment between this {@link } and specified {@link } as an output parameter.
             * @return  {void}
             */
            Contains$6: function (point, result) {
                for (var i = 0; i < Microsoft.Xna.Framework.BoundingFrustum.PlaneCount; i = (i + 1) | 0) {
                    if (Microsoft.Xna.Framework.PlaneHelper.ClassifyPoint(point, Bridge.ref(this._planes, i)) > 0) {
                        result.v = Microsoft.Xna.Framework.ContainmentType.Disjoint;
                        return;
                    }
                }
                result.v = Microsoft.Xna.Framework.ContainmentType.Contains;
            },
            /**
             * Compares whether current instance is equal to specified {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingFrustum
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @param   {Microsoft.Xna.Framework.BoundingFrustum}    other    The {@link } to compare.
             * @return  {boolean}                                             <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
             */
            equalsT: function (other) {
                return (Microsoft.Xna.Framework.BoundingFrustum.op_Equality(this, other));
            },
            /**
             * Compares whether current instance is equal to specified {@link }.
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.BoundingFrustum
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @param   {System.Object}    obj    The {@link } to compare.
             * @return  {boolean}                 <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
             */
            equals: function (obj) {
                return (Bridge.is(obj, Microsoft.Xna.Framework.BoundingFrustum)) && Microsoft.Xna.Framework.BoundingFrustum.op_Equality(this, Bridge.cast(obj, Microsoft.Xna.Framework.BoundingFrustum));
            },
            /**
             * Returns a copy of internal corners array.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingFrustum
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @return  {Array.<Microsoft.Xna.Framework.Vector3>}        The array of corners.
             */
            GetCorners: function () {
                return Bridge.cast(System.Array.clone(this._corners), System.Array.type(Microsoft.Xna.Framework.Vector3));
            },
            /**
             * Returns a copy of internal corners array.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingFrustum
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @param   {Array.<Microsoft.Xna.Framework.Vector3>}    corners    The array which values will be replaced to corner values of this instance. It must have size of {@link }.
             * @return  {void}
             */
            GetCorners$1: function (corners) {
                var $t;
                if (corners == null) {
                    throw new System.ArgumentNullException.$ctor1("corners");
                }
                if (corners.length < Microsoft.Xna.Framework.BoundingFrustum.CornerCount) {
                    throw new System.ArgumentOutOfRangeException.$ctor1("corners");
                }

                ($t = this._corners, System.Array.copy($t, 0, corners, 0, $t.length));
            },
            /**
             * Gets the hash code of this {@link }.
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.BoundingFrustum
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @return  {number}        Hash code of this {@link }.
             */
            getHashCode: function () {
                return this._matrix.getHashCode();
            },
            /**
             * Gets whether or not a specified {@link } intersects with this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingFrustum
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @param   {Microsoft.Xna.Framework.BoundingBox}    box    A {@link } for intersection test.
             * @return  {boolean}                                       <pre><code>true</code></pre> if specified {@link } intersects with this {@link }; <pre><code>false</code></pre> otherwise.
             */
            Intersects$1: function (box) {
                box = {v:box};
                var result = { v : false };
                this.Intersects$5(box, result);
                return result.v;
            },
            /**
             * Gets whether or not a specified {@link } intersects with this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingFrustum
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @param   {Microsoft.Xna.Framework.BoundingBox}    box       A {@link } for intersection test.
             * @param   {System.Boolean}                         result    <pre><code>true</code></pre> if specified {@link } intersects with this {@link }; <pre><code>false</code></pre> otherwise as an output parameter.
             * @return  {void}
             */
            Intersects$5: function (box, result) {
                var containment = { v : 0 };
                this.Contains$4(box, containment);
                result.v = containment.v !== Microsoft.Xna.Framework.ContainmentType.Disjoint;
            },
            /**
             * Gets whether or not a specified {@link } intersects with this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingFrustum
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @param   {Microsoft.Xna.Framework.BoundingFrustum}    frustum    An other {@link } for intersection test.
             * @return  {boolean}                                               <pre><code>true</code></pre> if other {@link } intersects with this {@link }; <pre><code>false</code></pre> otherwise.
             */
            Intersects$2: function (frustum) {
                return this.Contains$1(frustum) !== Microsoft.Xna.Framework.ContainmentType.Disjoint;
            },
            /**
             * Gets whether or not a specified {@link } intersects with this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingFrustum
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @param   {Microsoft.Xna.Framework.BoundingSphere}    sphere    A {@link } for intersection test.
             * @return  {boolean}                                             <pre><code>true</code></pre> if specified {@link } intersects with this {@link }; <pre><code>false</code></pre> otherwise.
             */
            Intersects$3: function (sphere) {
                sphere = {v:sphere};
                var result = { v : Bridge.getDefaultValue(System.Boolean) };
                this.Intersects$6(sphere, result);
                return result.v;
            },
            /**
             * Gets whether or not a specified {@link } intersects with this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingFrustum
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @param   {Microsoft.Xna.Framework.BoundingSphere}    sphere    A {@link } for intersection test.
             * @param   {System.Boolean}                            result    <pre><code>true</code></pre> if specified {@link } intersects with this {@link }; <pre><code>false</code></pre> otherwise as an output parameter.
             * @return  {void}
             */
            Intersects$6: function (sphere, result) {
                var containment = { v : 0 };
                this.Contains$5(sphere, containment);
                result.v = containment.v !== Microsoft.Xna.Framework.ContainmentType.Disjoint;
            },
            /**
             * Gets type of intersection between specified {@link } and this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingFrustum
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @param   {Microsoft.Xna.Framework.Plane}                    plane    A {@link } for intersection test.
             * @return  {Microsoft.Xna.Framework.PlaneIntersectionType}             A plane intersection type.
             */
            Intersects: function (plane) {
                plane = {v:plane};
                var result = { v : new Microsoft.Xna.Framework.PlaneIntersectionType() };
                this.Intersects$7(plane, result);
                return result.v;
            },
            /**
             * Gets type of intersection between specified {@link } and this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingFrustum
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @param   {Microsoft.Xna.Framework.Plane}                    plane     A {@link } for intersection test.
             * @param   {Microsoft.Xna.Framework.PlaneIntersectionType}    result    A plane intersection type as an output parameter.
             * @return  {void}
             */
            Intersects$7: function (plane, result) {
                result.v = plane.v.Intersects$5(Bridge.ref(this._corners, 0));
                for (var i = 1; i < this._corners.length; i = (i + 1) | 0) {
                    if (plane.v.Intersects$5(Bridge.ref(this._corners, i)) !== result.v) {
                        result.v = Microsoft.Xna.Framework.PlaneIntersectionType.Intersecting;
                    }
                }
            },
            /**
             * Gets the distance of intersection of {@link } and this {@link } or null if no intersection happens.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingFrustum
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @param   {Microsoft.Xna.Framework.Ray}    ray    A {@link } for intersection test.
             * @return  {?number}                               Distance at which ray intersects with this {@link } or null if no intersection happens.
             */
            Intersects$4: function (ray) {
                ray = {v:ray};
                var result = { };
                this.Intersects$8(ray, result);
                return result.v;
            },
            /**
             * Gets the distance of intersection of {@link } and this {@link } or null if no intersection happens.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingFrustum
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @param   {Microsoft.Xna.Framework.Ray}    ray       A {@link } for intersection test.
             * @param   {System.Nullable}                result    Distance at which ray intersects with this {@link } or null if no intersection happens as an output parameter.
             * @return  {void}
             */
            Intersects$8: function (ray, result) {
                var ctype = { v : new Microsoft.Xna.Framework.ContainmentType() };
                this.Contains$6(Bridge.ref(ray.v, "Position"), ctype);

                switch (ctype.v) {
                    case Microsoft.Xna.Framework.ContainmentType.Disjoint: 
                        result.v = null;
                        return;
                    case Microsoft.Xna.Framework.ContainmentType.Contains: 
                        result.v = 0.0;
                        return;
                    case Microsoft.Xna.Framework.ContainmentType.Intersects: 
                        throw new System.NotImplementedException.ctor();
                    default: 
                        throw new System.ArgumentOutOfRangeException.ctor();
                }
            },
            /**
             * Returns a {@link } representation of this {@link } in the format:
             {Near:[nearPlane] Far:[farPlane] Left:[leftPlane] Right:[rightPlane] Top:[topPlane] Bottom:[bottomPlane]}
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.BoundingFrustum
             * @memberof Microsoft.Xna.Framework.BoundingFrustum
             * @return  {string}        {@link } representation of this {@link }.
             */
            toString: function () {
                return "{Near: " + this._planes[System.Array.index(0, this._planes)] + " Far:" + this._planes[System.Array.index(1, this._planes)] + " Left:" + this._planes[System.Array.index(2, this._planes)] + " Right:" + this._planes[System.Array.index(3, this._planes)] + " Top:" + this._planes[System.Array.index(4, this._planes)] + " Bottom:" + this._planes[System.Array.index(5, this._planes)] + "}";
            },
            CreateCorners: function () {
                Microsoft.Xna.Framework.BoundingFrustum.IntersectionPoint(Bridge.ref(this._planes, 0), Bridge.ref(this._planes, 2), Bridge.ref(this._planes, 4), Bridge.ref(this._corners, 0));
                Microsoft.Xna.Framework.BoundingFrustum.IntersectionPoint(Bridge.ref(this._planes, 0), Bridge.ref(this._planes, 3), Bridge.ref(this._planes, 4), Bridge.ref(this._corners, 1));
                Microsoft.Xna.Framework.BoundingFrustum.IntersectionPoint(Bridge.ref(this._planes, 0), Bridge.ref(this._planes, 3), Bridge.ref(this._planes, 5), Bridge.ref(this._corners, 2));
                Microsoft.Xna.Framework.BoundingFrustum.IntersectionPoint(Bridge.ref(this._planes, 0), Bridge.ref(this._planes, 2), Bridge.ref(this._planes, 5), Bridge.ref(this._corners, 3));
                Microsoft.Xna.Framework.BoundingFrustum.IntersectionPoint(Bridge.ref(this._planes, 1), Bridge.ref(this._planes, 2), Bridge.ref(this._planes, 4), Bridge.ref(this._corners, 4));
                Microsoft.Xna.Framework.BoundingFrustum.IntersectionPoint(Bridge.ref(this._planes, 1), Bridge.ref(this._planes, 3), Bridge.ref(this._planes, 4), Bridge.ref(this._corners, 5));
                Microsoft.Xna.Framework.BoundingFrustum.IntersectionPoint(Bridge.ref(this._planes, 1), Bridge.ref(this._planes, 3), Bridge.ref(this._planes, 5), Bridge.ref(this._corners, 6));
                Microsoft.Xna.Framework.BoundingFrustum.IntersectionPoint(Bridge.ref(this._planes, 1), Bridge.ref(this._planes, 2), Bridge.ref(this._planes, 5), Bridge.ref(this._corners, 7));
            },
            CreatePlanes: function () {
                this._planes[System.Array.index(0, this._planes)] = new Microsoft.Xna.Framework.Plane.$ctor4(-this._matrix.M13, -this._matrix.M23, -this._matrix.M33, -this._matrix.M43);
                this._planes[System.Array.index(1, this._planes)] = new Microsoft.Xna.Framework.Plane.$ctor4(this._matrix.M13 - this._matrix.M14, this._matrix.M23 - this._matrix.M24, this._matrix.M33 - this._matrix.M34, this._matrix.M43 - this._matrix.M44);
                this._planes[System.Array.index(2, this._planes)] = new Microsoft.Xna.Framework.Plane.$ctor4(-this._matrix.M14 - this._matrix.M11, -this._matrix.M24 - this._matrix.M21, -this._matrix.M34 - this._matrix.M31, -this._matrix.M44 - this._matrix.M41);
                this._planes[System.Array.index(3, this._planes)] = new Microsoft.Xna.Framework.Plane.$ctor4(this._matrix.M11 - this._matrix.M14, this._matrix.M21 - this._matrix.M24, this._matrix.M31 - this._matrix.M34, this._matrix.M41 - this._matrix.M44);
                this._planes[System.Array.index(4, this._planes)] = new Microsoft.Xna.Framework.Plane.$ctor4(this._matrix.M12 - this._matrix.M14, this._matrix.M22 - this._matrix.M24, this._matrix.M32 - this._matrix.M34, this._matrix.M42 - this._matrix.M44);
                this._planes[System.Array.index(5, this._planes)] = new Microsoft.Xna.Framework.Plane.$ctor4(-this._matrix.M14 - this._matrix.M12, -this._matrix.M24 - this._matrix.M22, -this._matrix.M34 - this._matrix.M32, -this._matrix.M44 - this._matrix.M42);

                this.NormalizePlane(Bridge.ref(this._planes, 0));
                this.NormalizePlane(Bridge.ref(this._planes, 1));
                this.NormalizePlane(Bridge.ref(this._planes, 2));
                this.NormalizePlane(Bridge.ref(this._planes, 3));
                this.NormalizePlane(Bridge.ref(this._planes, 4));
                this.NormalizePlane(Bridge.ref(this._planes, 5));
            },
            NormalizePlane: function (p) {
                var factor = 1.0 / p.v.Normal.Length();
                p.v.Normal.X *= factor;
                p.v.Normal.Y *= factor;
                p.v.Normal.Z *= factor;
                p.v.D *= factor;
            }
        }
    });

    /**
     * Describes a sphere in 3D-space for bounding operations.
     *
     * @public
     * @class Microsoft.Xna.Framework.BoundingSphere
     * @implements  System.IEquatable$1
     */
    Bridge.define("Microsoft.Xna.Framework.BoundingSphere", {
        inherits: function () { return [System.IEquatable$1(Microsoft.Xna.Framework.BoundingSphere)]; },
        $kind: "struct",
        statics: {
            methods: {
                /**
                 * Creates the smallest {@link } that can contain a specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.BoundingSphere
                 * @memberof Microsoft.Xna.Framework.BoundingSphere
                 * @param   {Microsoft.Xna.Framework.BoundingBox}       box    The box to create the sphere from.
                 * @return  {Microsoft.Xna.Framework.BoundingSphere}           The new {@link }.
                 */
                CreateFromBoundingBox: function (box) {
                    box = {v:box};
                    var result = { v : new Microsoft.Xna.Framework.BoundingSphere() };
                    Microsoft.Xna.Framework.BoundingSphere.CreateFromBoundingBox$1(box, result);
                    return result.v.$clone();
                },
                /**
                 * Creates the smallest {@link } that can contain a specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.BoundingSphere
                 * @memberof Microsoft.Xna.Framework.BoundingSphere
                 * @param   {Microsoft.Xna.Framework.BoundingBox}       box       The box to create the sphere from.
                 * @param   {Microsoft.Xna.Framework.BoundingSphere}    result    The new {@link } as an output parameter.
                 * @return  {void}
                 */
                CreateFromBoundingBox$1: function (box, result) {
                    var center = new Microsoft.Xna.Framework.Vector3.$ctor3((box.v.Min.X + box.v.Max.X) / 2.0, (box.v.Min.Y + box.v.Max.Y) / 2.0, (box.v.Min.Z + box.v.Max.Z) / 2.0);

                    var radius = Microsoft.Xna.Framework.Vector3.Distance(center.$clone(), box.v.Max.$clone());

                    result.v = new Microsoft.Xna.Framework.BoundingSphere.$ctor1(center.$clone(), radius);
                },
                /**
                 * Creates the smallest {@link } that can contain a specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.BoundingSphere
                 * @memberof Microsoft.Xna.Framework.BoundingSphere
                 * @param   {Microsoft.Xna.Framework.BoundingFrustum}    frustum    The frustum to create the sphere from.
                 * @return  {Microsoft.Xna.Framework.BoundingSphere}                The new {@link }.
                 */
                CreateFromFrustum: function (frustum) {
                    return Microsoft.Xna.Framework.BoundingSphere.CreateFromPoints(frustum.GetCorners());
                },
                /**
                 * Creates the smallest {@link } that can contain a specified list of points in 3D-space.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.BoundingSphere
                 * @memberof Microsoft.Xna.Framework.BoundingSphere
                 * @param   {System.Collections.Generic.IEnumerable$1}    points    List of point to create the sphere from.
                 * @return  {Microsoft.Xna.Framework.BoundingSphere}                The new {@link }.
                 */
                CreateFromPoints: function (points) {
                    var $t, $t1;
                    if (points == null) {
                        throw new System.ArgumentNullException.$ctor1("points");
                    }


                    var minx = new Microsoft.Xna.Framework.Vector3.$ctor3(3.40282347E+38, 3.40282347E+38, 3.40282347E+38);
                    var maxx = Microsoft.Xna.Framework.Vector3.op_UnaryNegation(minx.$clone());
                    var miny = minx.$clone();
                    var maxy = Microsoft.Xna.Framework.Vector3.op_UnaryNegation(minx.$clone());
                    var minz = minx.$clone();
                    var maxz = Microsoft.Xna.Framework.Vector3.op_UnaryNegation(minx.$clone());

                    var numPoints = 0;
                    $t = Bridge.getEnumerator(points, Microsoft.Xna.Framework.Vector3);
                    try {
                        while ($t.moveNext()) {
                            var pt = $t.Current.$clone();
                            numPoints = (numPoints + 1) | 0;

                            if (pt.X < minx.X) {
                                minx = pt.$clone();
                            }
                            if (pt.X > maxx.X) {
                                maxx = pt.$clone();
                            }
                            if (pt.Y < miny.Y) {
                                miny = pt.$clone();
                            }
                            if (pt.Y > maxy.Y) {
                                maxy = pt.$clone();
                            }
                            if (pt.Z < minz.Z) {
                                minz = pt.$clone();
                            }
                            if (pt.Z > maxz.Z) {
                                maxz = pt.$clone();
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    if (numPoints === 0) {
                        throw new System.ArgumentException.$ctor1("You should have at least one point in points.");
                    }

                    var sqDistX = Microsoft.Xna.Framework.Vector3.DistanceSquared(maxx.$clone(), minx.$clone());
                    var sqDistY = Microsoft.Xna.Framework.Vector3.DistanceSquared(maxy.$clone(), miny.$clone());
                    var sqDistZ = Microsoft.Xna.Framework.Vector3.DistanceSquared(maxz.$clone(), minz.$clone());

                    var min = minx.$clone();
                    var max = maxx.$clone();
                    if (sqDistY > sqDistX && sqDistY > sqDistZ) {
                        max = maxy.$clone();
                        min = miny.$clone();
                    }
                    if (sqDistZ > sqDistX && sqDistZ > sqDistY) {
                        max = maxz.$clone();
                        min = minz.$clone();
                    }

                    var center = Microsoft.Xna.Framework.Vector3.op_Multiply$1((Microsoft.Xna.Framework.Vector3.op_Addition(min.$clone(), max.$clone())), 0.5);
                    var radius = Microsoft.Xna.Framework.Vector3.Distance(max.$clone(), center.$clone());

                    var sqRadius = radius * radius;
                    $t1 = Bridge.getEnumerator(points, Microsoft.Xna.Framework.Vector3);
                    try {
                        while ($t1.moveNext()) {
                            var pt1 = $t1.Current.$clone();
                            var diff = (Microsoft.Xna.Framework.Vector3.op_Subtraction(pt1.$clone(), center.$clone()));
                            var sqDist = diff.LengthSquared();
                            if (sqDist > sqRadius) {
                                var distance = Math.sqrt(sqDist);
                                var direction = Microsoft.Xna.Framework.Vector3.op_Division$1(diff.$clone(), distance);
                                var G = Microsoft.Xna.Framework.Vector3.op_Subtraction(center.$clone(), Microsoft.Xna.Framework.Vector3.op_Multiply$2(radius, direction.$clone()));
                                center = Microsoft.Xna.Framework.Vector3.op_Division$1((Microsoft.Xna.Framework.Vector3.op_Addition(G.$clone(), pt1.$clone())), 2);
                                radius = Microsoft.Xna.Framework.Vector3.Distance(pt1.$clone(), center.$clone());
                                sqRadius = radius * radius;
                            }
                        }
                    } finally {
                        if (Bridge.is($t1, System.IDisposable)) {
                            $t1.System$IDisposable$Dispose();
                        }
                    }
                    return new Microsoft.Xna.Framework.BoundingSphere.$ctor1(center.$clone(), radius);
                },
                /**
                 * Creates the smallest {@link } that can contain two spheres.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.BoundingSphere
                 * @memberof Microsoft.Xna.Framework.BoundingSphere
                 * @param   {Microsoft.Xna.Framework.BoundingSphere}    original      First sphere.
                 * @param   {Microsoft.Xna.Framework.BoundingSphere}    additional    Second sphere.
                 * @return  {Microsoft.Xna.Framework.BoundingSphere}                  The new {@link }.
                 */
                CreateMerged: function (original, additional) {
                    original = {v:original};
                    additional = {v:additional};
                    var result = { v : new Microsoft.Xna.Framework.BoundingSphere() };
                    Microsoft.Xna.Framework.BoundingSphere.CreateMerged$1(original, additional, result);
                    return result.v.$clone();
                },
                /**
                 * Creates the smallest {@link } that can contain two spheres.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.BoundingSphere
                 * @memberof Microsoft.Xna.Framework.BoundingSphere
                 * @param   {Microsoft.Xna.Framework.BoundingSphere}    original      First sphere.
                 * @param   {Microsoft.Xna.Framework.BoundingSphere}    additional    Second sphere.
                 * @param   {Microsoft.Xna.Framework.BoundingSphere}    result        The new {@link } as an output parameter.
                 * @return  {void}
                 */
                CreateMerged$1: function (original, additional, result) {
                    var ocenterToaCenter = Microsoft.Xna.Framework.Vector3.Subtract(additional.v.Center.$clone(), original.v.Center.$clone());
                    var distance = ocenterToaCenter.Length();
                    if (distance <= original.v.Radius + additional.v.Radius) {
                        if (distance <= original.v.Radius - additional.v.Radius) {
                            result.v = original.v.$clone();
                            return;
                        }
                        if (distance <= additional.v.Radius - original.v.Radius) {
                            result.v = additional.v.$clone();
                            return;
                        }
                    }
                    var leftRadius = Math.max(original.v.Radius - distance, additional.v.Radius);
                    var Rightradius = Math.max(original.v.Radius + distance, additional.v.Radius);
                    ocenterToaCenter = Microsoft.Xna.Framework.Vector3.op_Addition(ocenterToaCenter.$clone(), (Microsoft.Xna.Framework.Vector3.op_Multiply$2(((leftRadius - Rightradius) / (2 * ocenterToaCenter.Length())), ocenterToaCenter.$clone())));

                    result.v = new Microsoft.Xna.Framework.BoundingSphere.ctor();
                    result.v.Center = Microsoft.Xna.Framework.Vector3.op_Addition(original.v.Center.$clone(), ocenterToaCenter.$clone());
                    result.v.Radius = (leftRadius + Rightradius) / 2;
                }/**
                 * Compares whether two {@link } instances are equal.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.BoundingSphere
                 * @memberof Microsoft.Xna.Framework.BoundingSphere
                 * @param   {Microsoft.Xna.Framework.BoundingSphere}    a    {@link } instance on the left of the equal sign.
                 * @param   {Microsoft.Xna.Framework.BoundingSphere}    b    {@link } instance on the right of the equal sign.
                 * @return  {boolean}                                        <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
                 */
                ,
                op_Equality: function (a, b) {
                    return a.equalsT(b.$clone());
                }/**
                 * Compares whether two {@link } instances are not equal.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.BoundingSphere
                 * @memberof Microsoft.Xna.Framework.BoundingSphere
                 * @param   {Microsoft.Xna.Framework.BoundingSphere}    a    {@link } instance on the left of the not equal sign.
                 * @param   {Microsoft.Xna.Framework.BoundingSphere}    b    {@link } instance on the right of the not equal sign.
                 * @return  {boolean}                                        <pre><code>true</code></pre> if the instances are not equal; <pre><code>false</code></pre> otherwise.
                 */
                ,
                op_Inequality: function (a, b) {
                    return !a.equalsT(b.$clone());
                },
                getDefaultValue: function () { return new Microsoft.Xna.Framework.BoundingSphere(); }
            }
        },
        fields: {
            /**
             * The sphere center.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @type Microsoft.Xna.Framework.Vector3
             */
            Center: null,
            /**
             * The sphere radius.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @type number
             */
            Radius: 0
        },
        props: {
            DebugDisplayString: {
                get: function () {
                    return System.String.concat(["Center( ", this.Center.DebugDisplayString, " )  \r\n", "Radius( ", System.Single.format(this.Radius), " )"]);
                }
            }
        },
        alias: ["equalsT", "System$IEquatable$1$Microsoft$Xna$Framework$BoundingSphere$equalsT"],
        ctors: {
            init: function () {
                this.Center = new Microsoft.Xna.Framework.Vector3();
            },
            /**
             * Constructs a bounding sphere with the specified center and radius.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingSphere
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @param   {Microsoft.Xna.Framework.Vector3}    center    The sphere center.
             * @param   {number}                             radius    The sphere radius.
             * @return  {void}
             */
            $ctor1: function (center, radius) {
                this.$initialize();
                this.Center = center.$clone();
                this.Radius = radius;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Test if a bounding box is fully inside, outside, or just intersecting the sphere.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingSphere
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @param   {Microsoft.Xna.Framework.BoundingBox}        box    The box for testing.
             * @return  {Microsoft.Xna.Framework.ContainmentType}           The containment type.
             */
            Contains: function (box) {
                var $t;
                var inside = true;
                $t = Bridge.getEnumerator(box.GetCorners());
                try {
                    while ($t.moveNext()) {
                        var corner = $t.Current.$clone();
                        if (this.Contains$3(corner.$clone()) === Microsoft.Xna.Framework.ContainmentType.Disjoint) {
                            inside = false;
                            break;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                if (inside) {
                    return Microsoft.Xna.Framework.ContainmentType.Contains;
                }

                var dmin = 0;

                if (this.Center.X < box.Min.X) {
                    dmin += (this.Center.X - box.Min.X) * (this.Center.X - box.Min.X);
                } else {
                    if (this.Center.X > box.Max.X) {
                        dmin += (this.Center.X - box.Max.X) * (this.Center.X - box.Max.X);
                    }
                }

                if (this.Center.Y < box.Min.Y) {
                    dmin += (this.Center.Y - box.Min.Y) * (this.Center.Y - box.Min.Y);
                } else {
                    if (this.Center.Y > box.Max.Y) {
                        dmin += (this.Center.Y - box.Max.Y) * (this.Center.Y - box.Max.Y);
                    }
                }

                if (this.Center.Z < box.Min.Z) {
                    dmin += (this.Center.Z - box.Min.Z) * (this.Center.Z - box.Min.Z);
                } else {
                    if (this.Center.Z > box.Max.Z) {
                        dmin += (this.Center.Z - box.Max.Z) * (this.Center.Z - box.Max.Z);
                    }
                }

                if (dmin <= this.Radius * this.Radius) {
                    return Microsoft.Xna.Framework.ContainmentType.Intersects;
                }

                return Microsoft.Xna.Framework.ContainmentType.Disjoint;
            },
            /**
             * Test if a bounding box is fully inside, outside, or just intersecting the sphere.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingSphere
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @param   {Microsoft.Xna.Framework.BoundingBox}        box       The box for testing.
             * @param   {Microsoft.Xna.Framework.ContainmentType}    result    The containment type as an output parameter.
             * @return  {void}
             */
            Contains$4: function (box, result) {
                result.v = this.Contains(box.v.$clone());
            },
            /**
             * Test if a frustum is fully inside, outside, or just intersecting the sphere.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingSphere
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @param   {Microsoft.Xna.Framework.BoundingFrustum}    frustum    The frustum for testing.
             * @return  {Microsoft.Xna.Framework.ContainmentType}               The containment type.
             */
            Contains$1: function (frustum) {
                var $t;
                var inside = true;

                var corners = frustum.GetCorners();
                $t = Bridge.getEnumerator(corners);
                try {
                    while ($t.moveNext()) {
                        var corner = $t.Current.$clone();
                        if (this.Contains$3(corner.$clone()) === Microsoft.Xna.Framework.ContainmentType.Disjoint) {
                            inside = false;
                            break;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }if (inside) {
                    return Microsoft.Xna.Framework.ContainmentType.Contains;
                }

                var dmin = 0;

                if (dmin <= this.Radius * this.Radius) {
                    return Microsoft.Xna.Framework.ContainmentType.Intersects;
                }

                return Microsoft.Xna.Framework.ContainmentType.Disjoint;
            },
            /**
             * Test if a frustum is fully inside, outside, or just intersecting the sphere.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingSphere
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @param   {Microsoft.Xna.Framework.BoundingFrustum}    frustum    The frustum for testing.
             * @param   {Microsoft.Xna.Framework.ContainmentType}    result     The containment type as an output parameter.
             * @return  {void}
             */
            Contains$5: function (frustum, result) {
                result.v = this.Contains$1(frustum.v);
            },
            /**
             * Test if a sphere is fully inside, outside, or just intersecting the sphere.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingSphere
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @param   {Microsoft.Xna.Framework.BoundingSphere}     sphere    The other sphere for testing.
             * @return  {Microsoft.Xna.Framework.ContainmentType}              The containment type.
             */
            Contains$2: function (sphere) {
                sphere = {v:sphere};
                var result = { v : new Microsoft.Xna.Framework.ContainmentType() };
                this.Contains$6(sphere, result);
                return result.v;
            },
            /**
             * Test if a sphere is fully inside, outside, or just intersecting the sphere.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingSphere
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @param   {Microsoft.Xna.Framework.BoundingSphere}     sphere    The other sphere for testing.
             * @param   {Microsoft.Xna.Framework.ContainmentType}    result    The containment type as an output parameter.
             * @return  {void}
             */
            Contains$6: function (sphere, result) {
                var sqDistance = { };
                Microsoft.Xna.Framework.Vector3.DistanceSquared$1(Bridge.ref(sphere.v, "Center"), Bridge.ref(this, "Center"), sqDistance);

                if (sqDistance.v > (sphere.v.Radius + this.Radius) * (sphere.v.Radius + this.Radius)) {
                    result.v = Microsoft.Xna.Framework.ContainmentType.Disjoint;
                } else {
                    if (sqDistance.v <= (this.Radius - sphere.v.Radius) * (this.Radius - sphere.v.Radius)) {
                        result.v = Microsoft.Xna.Framework.ContainmentType.Contains;
                    } else {
                        result.v = Microsoft.Xna.Framework.ContainmentType.Intersects;
                    }
                }
            },
            /**
             * Test if a point is fully inside, outside, or just intersecting the sphere.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingSphere
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @param   {Microsoft.Xna.Framework.Vector3}            point    The vector in 3D-space for testing.
             * @return  {Microsoft.Xna.Framework.ContainmentType}             The containment type.
             */
            Contains$3: function (point) {
                point = {v:point};
                var result = { v : new Microsoft.Xna.Framework.ContainmentType() };
                this.Contains$7(point, result);
                return result.v;
            },
            /**
             * Test if a point is fully inside, outside, or just intersecting the sphere.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingSphere
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @param   {Microsoft.Xna.Framework.Vector3}            point     The vector in 3D-space for testing.
             * @param   {Microsoft.Xna.Framework.ContainmentType}    result    The containment type as an output parameter.
             * @return  {void}
             */
            Contains$7: function (point, result) {
                var sqRadius = this.Radius * this.Radius;
                var sqDistance = { };
                Microsoft.Xna.Framework.Vector3.DistanceSquared$1(point, Bridge.ref(this, "Center"), sqDistance);

                if (sqDistance.v > sqRadius) {
                    result.v = Microsoft.Xna.Framework.ContainmentType.Disjoint;
                } else {
                    if (sqDistance.v < sqRadius) {
                        result.v = Microsoft.Xna.Framework.ContainmentType.Contains;
                    } else {
                        result.v = Microsoft.Xna.Framework.ContainmentType.Intersects;
                    }
                }
            },
            /**
             * Compares whether current instance is equal to specified {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingSphere
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @param   {Microsoft.Xna.Framework.BoundingSphere}    other    The {@link } to compare.
             * @return  {boolean}                                            <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
             */
            equalsT: function (other) {
                return Microsoft.Xna.Framework.Vector3.op_Equality(this.Center.$clone(), other.Center.$clone()) && this.Radius === other.Radius;
            },
            /**
             * Compares whether current instance is equal to specified {@link }.
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.BoundingSphere
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @param   {System.Object}    obj    The {@link } to compare.
             * @return  {boolean}                 <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
             */
            equals: function (obj) {
                if (Bridge.is(obj, Microsoft.Xna.Framework.BoundingSphere)) {
                    return this.equalsT(System.Nullable.getValue(Bridge.cast(Bridge.unbox(obj, Microsoft.Xna.Framework.BoundingSphere), Microsoft.Xna.Framework.BoundingSphere)));
                }

                return false;
            },
            /**
             * Gets the hash code of this {@link }.
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.BoundingSphere
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @return  {number}        Hash code of this {@link }.
             */
            getHashCode: function () {
                return ((this.Center.getHashCode() + System.Single.getHashCode(this.Radius)) | 0);
            },
            /**
             * Gets whether or not a specified {@link } intersects with this sphere.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingSphere
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @param   {Microsoft.Xna.Framework.BoundingBox}    box    The box for testing.
             * @return  {boolean}                                       <pre><code>true</code></pre> if {@link } intersects with this sphere; <pre><code>false</code></pre> otherwise.
             */
            Intersects$1: function (box) {
                return box.Intersects$3(this);
            },
            /**
             * Gets whether or not a specified {@link } intersects with this sphere.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingSphere
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @param   {Microsoft.Xna.Framework.BoundingBox}    box       The box for testing.
             * @param   {System.Boolean}                         result    <pre><code>true</code></pre> if {@link } intersects with this sphere; <pre><code>false</code></pre> otherwise. As an output parameter.
             * @return  {void}
             */
            Intersects$4: function (box, result) {
                box.v.Intersects$6(Bridge.ref(this), result);
            },
            /**
             * Gets whether or not the other {@link } intersects with this sphere.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingSphere
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @param   {Microsoft.Xna.Framework.BoundingSphere}    sphere    The other sphere for testing.
             * @return  {boolean}                                             <pre><code>true</code></pre> if other {@link } intersects with this sphere; <pre><code>false</code></pre> otherwise.
             */
            Intersects$2: function (sphere) {
                sphere = {v:sphere};
                var result = { };
                this.Intersects$5(sphere, result);
                return result.v;
            },
            /**
             * Gets whether or not the other {@link } intersects with this sphere.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingSphere
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @param   {Microsoft.Xna.Framework.BoundingSphere}    sphere    The other sphere for testing.
             * @param   {System.Boolean}                            result    <pre><code>true</code></pre> if other {@link } intersects with this sphere; <pre><code>false</code></pre> otherwise. As an output parameter.
             * @return  {void}
             */
            Intersects$5: function (sphere, result) {
                var sqDistance = { };
                Microsoft.Xna.Framework.Vector3.DistanceSquared$1(Bridge.ref(sphere.v, "Center"), Bridge.ref(this, "Center"), sqDistance);

                if (sqDistance.v > (sphere.v.Radius + this.Radius) * (sphere.v.Radius + this.Radius)) {
                    result.v = false;
                } else {
                    result.v = true;
                }
            },
            /**
             * Gets whether or not a specified {@link } intersects with this sphere.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingSphere
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @param   {Microsoft.Xna.Framework.Plane}                    plane    The plane for testing.
             * @return  {Microsoft.Xna.Framework.PlaneIntersectionType}             Type of intersection.
             */
            Intersects: function (plane) {
                plane = {v:plane};
                var result = { v : 0 };
                this.Intersects$6(plane, result);
                return result.v;
            },
            /**
             * Gets whether or not a specified {@link } intersects with this sphere.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingSphere
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @param   {Microsoft.Xna.Framework.Plane}                    plane     The plane for testing.
             * @param   {Microsoft.Xna.Framework.PlaneIntersectionType}    result    Type of intersection as an output parameter.
             * @return  {void}
             */
            Intersects$6: function (plane, result) {
                var distance = { v : Bridge.getDefaultValue(System.Single) };
                Microsoft.Xna.Framework.Vector3.Dot$1(Bridge.ref(plane.v, "Normal"), Bridge.ref(this, "Center"), distance);
                distance.v += plane.v.D;
                if (distance.v > this.Radius) {
                    result.v = Microsoft.Xna.Framework.PlaneIntersectionType.Front;
                } else {
                    if (distance.v < -this.Radius) {
                        result.v = Microsoft.Xna.Framework.PlaneIntersectionType.Back;
                    } else {
                        result.v = Microsoft.Xna.Framework.PlaneIntersectionType.Intersecting;
                    }
                }
            },
            /**
             * Gets whether or not a specified {@link } intersects with this sphere.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingSphere
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @param   {Microsoft.Xna.Framework.Ray}    ray    The ray for testing.
             * @return  {?number}                               Distance of ray intersection or <pre><code>null</code></pre> if there is no intersection.
             */
            Intersects$3: function (ray) {
                return ray.Intersects$1(this);
            },
            /**
             * Gets whether or not a specified {@link } intersects with this sphere.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingSphere
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @param   {Microsoft.Xna.Framework.Ray}    ray       The ray for testing.
             * @param   {System.Nullable}                result    Distance of ray intersection or <pre><code>null</code></pre> if there is no intersection as an output parameter.
             * @return  {void}
             */
            Intersects$7: function (ray, result) {
                ray.v.Intersects$4(Bridge.ref(this), result);
            },
            /**
             * Returns a {@link } representation of this {@link } in the format:
             {Center:[{@link }] Radius:[{@link }]}
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.BoundingSphere
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @return  {string}        A {@link } representation of this {@link }.
             */
            toString: function () {
                return "{Center:" + this.Center + " Radius:" + System.Single.format(this.Radius) + "}";
            },
            /**
             * Creates a new {@link } that contains a transformation of translation and scale from this sphere by the specified {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingSphere
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @param   {Microsoft.Xna.Framework.Matrix}            matrix    The transformation {@link }.
             * @return  {Microsoft.Xna.Framework.BoundingSphere}              Transformed {@link }.
             */
            Transform: function (matrix) {
                var sphere = new Microsoft.Xna.Framework.BoundingSphere.ctor();
                sphere.Center = Microsoft.Xna.Framework.Vector3.Transform(this.Center.$clone(), matrix.$clone());
                sphere.Radius = this.Radius * Math.sqrt(Math.max(((matrix.M11 * matrix.M11) + (matrix.M12 * matrix.M12)) + (matrix.M13 * matrix.M13), Math.max(((matrix.M21 * matrix.M21) + (matrix.M22 * matrix.M22)) + (matrix.M23 * matrix.M23), ((matrix.M31 * matrix.M31) + (matrix.M32 * matrix.M32)) + (matrix.M33 * matrix.M33))));
                return sphere.$clone();
            },
            /**
             * Creates a new {@link } that contains a transformation of translation and scale from this sphere by the specified {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingSphere
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @param   {Microsoft.Xna.Framework.Matrix}            matrix    The transformation {@link }.
             * @param   {Microsoft.Xna.Framework.BoundingSphere}    result    Transformed {@link } as an output parameter.
             * @return  {void}
             */
            Transform$1: function (matrix, result) {
                result.v.Center = Microsoft.Xna.Framework.Vector3.Transform(this.Center.$clone(), matrix.v.$clone());
                result.v.Radius = this.Radius * Math.sqrt(Math.max(((matrix.v.M11 * matrix.v.M11) + (matrix.v.M12 * matrix.v.M12)) + (matrix.v.M13 * matrix.v.M13), Math.max(((matrix.v.M21 * matrix.v.M21) + (matrix.v.M22 * matrix.v.M22)) + (matrix.v.M23 * matrix.v.M23), ((matrix.v.M31 * matrix.v.M31) + (matrix.v.M32 * matrix.v.M32)) + (matrix.v.M33 * matrix.v.M33))));
            },
            /**
             * Deconstruction method for {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.BoundingSphere
             * @memberof Microsoft.Xna.Framework.BoundingSphere
             * @param   {Microsoft.Xna.Framework.Vector3}    center    
             * @param   {System.Single}                      radius
             * @return  {void}
             */
            Deconstruct: function (center, radius) {
                center.v = this.Center.$clone();
                radius.v = this.Radius;
            },
            $clone: function (to) {
                var s = to || new Microsoft.Xna.Framework.BoundingSphere();
                s.Center = this.Center.$clone();
                s.Radius = this.Radius;
                return s;
            }
        }
    });

    /**
     * Describes a 32-bit packed color.
     *
     * @public
     * @class Microsoft.Xna.Framework.Color
     * @implements  System.IEquatable$1
     */
    Bridge.define("Microsoft.Xna.Framework.Color", {
        inherits: function () { return [System.IEquatable$1(Microsoft.Xna.Framework.Color)]; },
        $kind: "struct",
        statics: {
            fields: {
                /**
                 * TransparentBlack color (R:0,G:0,B:0,A:0).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function TransparentBlack
                 * @type Microsoft.Xna.Framework.Color
                 */
                TransparentBlack: null,
                /**
                 * Transparent color (R:0,G:0,B:0,A:0).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Transparent
                 * @type Microsoft.Xna.Framework.Color
                 */
                Transparent: null,
                /**
                 * AliceBlue color (R:240,G:248,B:255,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function AliceBlue
                 * @type Microsoft.Xna.Framework.Color
                 */
                AliceBlue: null,
                /**
                 * AntiqueWhite color (R:250,G:235,B:215,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function AntiqueWhite
                 * @type Microsoft.Xna.Framework.Color
                 */
                AntiqueWhite: null,
                /**
                 * Aqua color (R:0,G:255,B:255,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Aqua
                 * @type Microsoft.Xna.Framework.Color
                 */
                Aqua: null,
                /**
                 * Aquamarine color (R:127,G:255,B:212,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Aquamarine
                 * @type Microsoft.Xna.Framework.Color
                 */
                Aquamarine: null,
                /**
                 * Azure color (R:240,G:255,B:255,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Azure
                 * @type Microsoft.Xna.Framework.Color
                 */
                Azure: null,
                /**
                 * Beige color (R:245,G:245,B:220,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Beige
                 * @type Microsoft.Xna.Framework.Color
                 */
                Beige: null,
                /**
                 * Bisque color (R:255,G:228,B:196,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Bisque
                 * @type Microsoft.Xna.Framework.Color
                 */
                Bisque: null,
                /**
                 * Black color (R:0,G:0,B:0,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Black
                 * @type Microsoft.Xna.Framework.Color
                 */
                Black: null,
                /**
                 * BlanchedAlmond color (R:255,G:235,B:205,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function BlanchedAlmond
                 * @type Microsoft.Xna.Framework.Color
                 */
                BlanchedAlmond: null,
                /**
                 * Blue color (R:0,G:0,B:255,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Blue
                 * @type Microsoft.Xna.Framework.Color
                 */
                Blue: null,
                /**
                 * BlueViolet color (R:138,G:43,B:226,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function BlueViolet
                 * @type Microsoft.Xna.Framework.Color
                 */
                BlueViolet: null,
                /**
                 * Brown color (R:165,G:42,B:42,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Brown
                 * @type Microsoft.Xna.Framework.Color
                 */
                Brown: null,
                /**
                 * BurlyWood color (R:222,G:184,B:135,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function BurlyWood
                 * @type Microsoft.Xna.Framework.Color
                 */
                BurlyWood: null,
                /**
                 * CadetBlue color (R:95,G:158,B:160,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function CadetBlue
                 * @type Microsoft.Xna.Framework.Color
                 */
                CadetBlue: null,
                /**
                 * Chartreuse color (R:127,G:255,B:0,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Chartreuse
                 * @type Microsoft.Xna.Framework.Color
                 */
                Chartreuse: null,
                /**
                 * Chocolate color (R:210,G:105,B:30,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Chocolate
                 * @type Microsoft.Xna.Framework.Color
                 */
                Chocolate: null,
                /**
                 * Coral color (R:255,G:127,B:80,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Coral
                 * @type Microsoft.Xna.Framework.Color
                 */
                Coral: null,
                /**
                 * CornflowerBlue color (R:100,G:149,B:237,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function CornflowerBlue
                 * @type Microsoft.Xna.Framework.Color
                 */
                CornflowerBlue: null,
                /**
                 * Cornsilk color (R:255,G:248,B:220,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Cornsilk
                 * @type Microsoft.Xna.Framework.Color
                 */
                Cornsilk: null,
                /**
                 * Crimson color (R:220,G:20,B:60,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Crimson
                 * @type Microsoft.Xna.Framework.Color
                 */
                Crimson: null,
                /**
                 * Cyan color (R:0,G:255,B:255,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Cyan
                 * @type Microsoft.Xna.Framework.Color
                 */
                Cyan: null,
                /**
                 * DarkBlue color (R:0,G:0,B:139,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function DarkBlue
                 * @type Microsoft.Xna.Framework.Color
                 */
                DarkBlue: null,
                /**
                 * DarkCyan color (R:0,G:139,B:139,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function DarkCyan
                 * @type Microsoft.Xna.Framework.Color
                 */
                DarkCyan: null,
                /**
                 * DarkGoldenrod color (R:184,G:134,B:11,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function DarkGoldenrod
                 * @type Microsoft.Xna.Framework.Color
                 */
                DarkGoldenrod: null,
                /**
                 * DarkGray color (R:169,G:169,B:169,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function DarkGray
                 * @type Microsoft.Xna.Framework.Color
                 */
                DarkGray: null,
                /**
                 * DarkGreen color (R:0,G:100,B:0,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function DarkGreen
                 * @type Microsoft.Xna.Framework.Color
                 */
                DarkGreen: null,
                /**
                 * DarkKhaki color (R:189,G:183,B:107,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function DarkKhaki
                 * @type Microsoft.Xna.Framework.Color
                 */
                DarkKhaki: null,
                /**
                 * DarkMagenta color (R:139,G:0,B:139,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function DarkMagenta
                 * @type Microsoft.Xna.Framework.Color
                 */
                DarkMagenta: null,
                /**
                 * DarkOliveGreen color (R:85,G:107,B:47,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function DarkOliveGreen
                 * @type Microsoft.Xna.Framework.Color
                 */
                DarkOliveGreen: null,
                /**
                 * DarkOrange color (R:255,G:140,B:0,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function DarkOrange
                 * @type Microsoft.Xna.Framework.Color
                 */
                DarkOrange: null,
                /**
                 * DarkOrchid color (R:153,G:50,B:204,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function DarkOrchid
                 * @type Microsoft.Xna.Framework.Color
                 */
                DarkOrchid: null,
                /**
                 * DarkRed color (R:139,G:0,B:0,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function DarkRed
                 * @type Microsoft.Xna.Framework.Color
                 */
                DarkRed: null,
                /**
                 * DarkSalmon color (R:233,G:150,B:122,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function DarkSalmon
                 * @type Microsoft.Xna.Framework.Color
                 */
                DarkSalmon: null,
                /**
                 * DarkSeaGreen color (R:143,G:188,B:139,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function DarkSeaGreen
                 * @type Microsoft.Xna.Framework.Color
                 */
                DarkSeaGreen: null,
                /**
                 * DarkSlateBlue color (R:72,G:61,B:139,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function DarkSlateBlue
                 * @type Microsoft.Xna.Framework.Color
                 */
                DarkSlateBlue: null,
                /**
                 * DarkSlateGray color (R:47,G:79,B:79,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function DarkSlateGray
                 * @type Microsoft.Xna.Framework.Color
                 */
                DarkSlateGray: null,
                /**
                 * DarkTurquoise color (R:0,G:206,B:209,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function DarkTurquoise
                 * @type Microsoft.Xna.Framework.Color
                 */
                DarkTurquoise: null,
                /**
                 * DarkViolet color (R:148,G:0,B:211,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function DarkViolet
                 * @type Microsoft.Xna.Framework.Color
                 */
                DarkViolet: null,
                /**
                 * DeepPink color (R:255,G:20,B:147,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function DeepPink
                 * @type Microsoft.Xna.Framework.Color
                 */
                DeepPink: null,
                /**
                 * DeepSkyBlue color (R:0,G:191,B:255,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function DeepSkyBlue
                 * @type Microsoft.Xna.Framework.Color
                 */
                DeepSkyBlue: null,
                /**
                 * DimGray color (R:105,G:105,B:105,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function DimGray
                 * @type Microsoft.Xna.Framework.Color
                 */
                DimGray: null,
                /**
                 * DodgerBlue color (R:30,G:144,B:255,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function DodgerBlue
                 * @type Microsoft.Xna.Framework.Color
                 */
                DodgerBlue: null,
                /**
                 * Firebrick color (R:178,G:34,B:34,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Firebrick
                 * @type Microsoft.Xna.Framework.Color
                 */
                Firebrick: null,
                /**
                 * FloralWhite color (R:255,G:250,B:240,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function FloralWhite
                 * @type Microsoft.Xna.Framework.Color
                 */
                FloralWhite: null,
                /**
                 * ForestGreen color (R:34,G:139,B:34,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function ForestGreen
                 * @type Microsoft.Xna.Framework.Color
                 */
                ForestGreen: null,
                /**
                 * Fuchsia color (R:255,G:0,B:255,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Fuchsia
                 * @type Microsoft.Xna.Framework.Color
                 */
                Fuchsia: null,
                /**
                 * Gainsboro color (R:220,G:220,B:220,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Gainsboro
                 * @type Microsoft.Xna.Framework.Color
                 */
                Gainsboro: null,
                /**
                 * GhostWhite color (R:248,G:248,B:255,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function GhostWhite
                 * @type Microsoft.Xna.Framework.Color
                 */
                GhostWhite: null,
                /**
                 * Gold color (R:255,G:215,B:0,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Gold
                 * @type Microsoft.Xna.Framework.Color
                 */
                Gold: null,
                /**
                 * Goldenrod color (R:218,G:165,B:32,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Goldenrod
                 * @type Microsoft.Xna.Framework.Color
                 */
                Goldenrod: null,
                /**
                 * Gray color (R:128,G:128,B:128,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Gray
                 * @type Microsoft.Xna.Framework.Color
                 */
                Gray: null,
                /**
                 * Green color (R:0,G:128,B:0,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Green
                 * @type Microsoft.Xna.Framework.Color
                 */
                Green: null,
                /**
                 * GreenYellow color (R:173,G:255,B:47,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function GreenYellow
                 * @type Microsoft.Xna.Framework.Color
                 */
                GreenYellow: null,
                /**
                 * Honeydew color (R:240,G:255,B:240,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Honeydew
                 * @type Microsoft.Xna.Framework.Color
                 */
                Honeydew: null,
                /**
                 * HotPink color (R:255,G:105,B:180,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function HotPink
                 * @type Microsoft.Xna.Framework.Color
                 */
                HotPink: null,
                /**
                 * IndianRed color (R:205,G:92,B:92,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function IndianRed
                 * @type Microsoft.Xna.Framework.Color
                 */
                IndianRed: null,
                /**
                 * Indigo color (R:75,G:0,B:130,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Indigo
                 * @type Microsoft.Xna.Framework.Color
                 */
                Indigo: null,
                /**
                 * Ivory color (R:255,G:255,B:240,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Ivory
                 * @type Microsoft.Xna.Framework.Color
                 */
                Ivory: null,
                /**
                 * Khaki color (R:240,G:230,B:140,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Khaki
                 * @type Microsoft.Xna.Framework.Color
                 */
                Khaki: null,
                /**
                 * Lavender color (R:230,G:230,B:250,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Lavender
                 * @type Microsoft.Xna.Framework.Color
                 */
                Lavender: null,
                /**
                 * LavenderBlush color (R:255,G:240,B:245,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function LavenderBlush
                 * @type Microsoft.Xna.Framework.Color
                 */
                LavenderBlush: null,
                /**
                 * LawnGreen color (R:124,G:252,B:0,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function LawnGreen
                 * @type Microsoft.Xna.Framework.Color
                 */
                LawnGreen: null,
                /**
                 * LemonChiffon color (R:255,G:250,B:205,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function LemonChiffon
                 * @type Microsoft.Xna.Framework.Color
                 */
                LemonChiffon: null,
                /**
                 * LightBlue color (R:173,G:216,B:230,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function LightBlue
                 * @type Microsoft.Xna.Framework.Color
                 */
                LightBlue: null,
                /**
                 * LightCoral color (R:240,G:128,B:128,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function LightCoral
                 * @type Microsoft.Xna.Framework.Color
                 */
                LightCoral: null,
                /**
                 * LightCyan color (R:224,G:255,B:255,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function LightCyan
                 * @type Microsoft.Xna.Framework.Color
                 */
                LightCyan: null,
                /**
                 * LightGoldenrodYellow color (R:250,G:250,B:210,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function LightGoldenrodYellow
                 * @type Microsoft.Xna.Framework.Color
                 */
                LightGoldenrodYellow: null,
                /**
                 * LightGray color (R:211,G:211,B:211,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function LightGray
                 * @type Microsoft.Xna.Framework.Color
                 */
                LightGray: null,
                /**
                 * LightGreen color (R:144,G:238,B:144,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function LightGreen
                 * @type Microsoft.Xna.Framework.Color
                 */
                LightGreen: null,
                /**
                 * LightPink color (R:255,G:182,B:193,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function LightPink
                 * @type Microsoft.Xna.Framework.Color
                 */
                LightPink: null,
                /**
                 * LightSalmon color (R:255,G:160,B:122,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function LightSalmon
                 * @type Microsoft.Xna.Framework.Color
                 */
                LightSalmon: null,
                /**
                 * LightSeaGreen color (R:32,G:178,B:170,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function LightSeaGreen
                 * @type Microsoft.Xna.Framework.Color
                 */
                LightSeaGreen: null,
                /**
                 * LightSkyBlue color (R:135,G:206,B:250,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function LightSkyBlue
                 * @type Microsoft.Xna.Framework.Color
                 */
                LightSkyBlue: null,
                /**
                 * LightSlateGray color (R:119,G:136,B:153,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function LightSlateGray
                 * @type Microsoft.Xna.Framework.Color
                 */
                LightSlateGray: null,
                /**
                 * LightSteelBlue color (R:176,G:196,B:222,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function LightSteelBlue
                 * @type Microsoft.Xna.Framework.Color
                 */
                LightSteelBlue: null,
                /**
                 * LightYellow color (R:255,G:255,B:224,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function LightYellow
                 * @type Microsoft.Xna.Framework.Color
                 */
                LightYellow: null,
                /**
                 * Lime color (R:0,G:255,B:0,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Lime
                 * @type Microsoft.Xna.Framework.Color
                 */
                Lime: null,
                /**
                 * LimeGreen color (R:50,G:205,B:50,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function LimeGreen
                 * @type Microsoft.Xna.Framework.Color
                 */
                LimeGreen: null,
                /**
                 * Linen color (R:250,G:240,B:230,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Linen
                 * @type Microsoft.Xna.Framework.Color
                 */
                Linen: null,
                /**
                 * Magenta color (R:255,G:0,B:255,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Magenta
                 * @type Microsoft.Xna.Framework.Color
                 */
                Magenta: null,
                /**
                 * Maroon color (R:128,G:0,B:0,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Maroon
                 * @type Microsoft.Xna.Framework.Color
                 */
                Maroon: null,
                /**
                 * MediumAquamarine color (R:102,G:205,B:170,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function MediumAquamarine
                 * @type Microsoft.Xna.Framework.Color
                 */
                MediumAquamarine: null,
                /**
                 * MediumBlue color (R:0,G:0,B:205,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function MediumBlue
                 * @type Microsoft.Xna.Framework.Color
                 */
                MediumBlue: null,
                /**
                 * MediumOrchid color (R:186,G:85,B:211,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function MediumOrchid
                 * @type Microsoft.Xna.Framework.Color
                 */
                MediumOrchid: null,
                /**
                 * MediumPurple color (R:147,G:112,B:219,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function MediumPurple
                 * @type Microsoft.Xna.Framework.Color
                 */
                MediumPurple: null,
                /**
                 * MediumSeaGreen color (R:60,G:179,B:113,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function MediumSeaGreen
                 * @type Microsoft.Xna.Framework.Color
                 */
                MediumSeaGreen: null,
                /**
                 * MediumSlateBlue color (R:123,G:104,B:238,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function MediumSlateBlue
                 * @type Microsoft.Xna.Framework.Color
                 */
                MediumSlateBlue: null,
                /**
                 * MediumSpringGreen color (R:0,G:250,B:154,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function MediumSpringGreen
                 * @type Microsoft.Xna.Framework.Color
                 */
                MediumSpringGreen: null,
                /**
                 * MediumTurquoise color (R:72,G:209,B:204,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function MediumTurquoise
                 * @type Microsoft.Xna.Framework.Color
                 */
                MediumTurquoise: null,
                /**
                 * MediumVioletRed color (R:199,G:21,B:133,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function MediumVioletRed
                 * @type Microsoft.Xna.Framework.Color
                 */
                MediumVioletRed: null,
                /**
                 * MidnightBlue color (R:25,G:25,B:112,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function MidnightBlue
                 * @type Microsoft.Xna.Framework.Color
                 */
                MidnightBlue: null,
                /**
                 * MintCream color (R:245,G:255,B:250,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function MintCream
                 * @type Microsoft.Xna.Framework.Color
                 */
                MintCream: null,
                /**
                 * MistyRose color (R:255,G:228,B:225,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function MistyRose
                 * @type Microsoft.Xna.Framework.Color
                 */
                MistyRose: null,
                /**
                 * Moccasin color (R:255,G:228,B:181,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Moccasin
                 * @type Microsoft.Xna.Framework.Color
                 */
                Moccasin: null,
                /**
                 * MonoGame orange theme color (R:231,G:60,B:0,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function MonoGameOrange
                 * @type Microsoft.Xna.Framework.Color
                 */
                MonoGameOrange: null,
                /**
                 * NavajoWhite color (R:255,G:222,B:173,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function NavajoWhite
                 * @type Microsoft.Xna.Framework.Color
                 */
                NavajoWhite: null,
                /**
                 * Navy color (R:0,G:0,B:128,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Navy
                 * @type Microsoft.Xna.Framework.Color
                 */
                Navy: null,
                /**
                 * OldLace color (R:253,G:245,B:230,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function OldLace
                 * @type Microsoft.Xna.Framework.Color
                 */
                OldLace: null,
                /**
                 * Olive color (R:128,G:128,B:0,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Olive
                 * @type Microsoft.Xna.Framework.Color
                 */
                Olive: null,
                /**
                 * OliveDrab color (R:107,G:142,B:35,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function OliveDrab
                 * @type Microsoft.Xna.Framework.Color
                 */
                OliveDrab: null,
                /**
                 * Orange color (R:255,G:165,B:0,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Orange
                 * @type Microsoft.Xna.Framework.Color
                 */
                Orange: null,
                /**
                 * OrangeRed color (R:255,G:69,B:0,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function OrangeRed
                 * @type Microsoft.Xna.Framework.Color
                 */
                OrangeRed: null,
                /**
                 * Orchid color (R:218,G:112,B:214,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Orchid
                 * @type Microsoft.Xna.Framework.Color
                 */
                Orchid: null,
                /**
                 * PaleGoldenrod color (R:238,G:232,B:170,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function PaleGoldenrod
                 * @type Microsoft.Xna.Framework.Color
                 */
                PaleGoldenrod: null,
                /**
                 * PaleGreen color (R:152,G:251,B:152,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function PaleGreen
                 * @type Microsoft.Xna.Framework.Color
                 */
                PaleGreen: null,
                /**
                 * PaleTurquoise color (R:175,G:238,B:238,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function PaleTurquoise
                 * @type Microsoft.Xna.Framework.Color
                 */
                PaleTurquoise: null,
                /**
                 * PaleVioletRed color (R:219,G:112,B:147,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function PaleVioletRed
                 * @type Microsoft.Xna.Framework.Color
                 */
                PaleVioletRed: null,
                /**
                 * PapayaWhip color (R:255,G:239,B:213,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function PapayaWhip
                 * @type Microsoft.Xna.Framework.Color
                 */
                PapayaWhip: null,
                /**
                 * PeachPuff color (R:255,G:218,B:185,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function PeachPuff
                 * @type Microsoft.Xna.Framework.Color
                 */
                PeachPuff: null,
                /**
                 * Peru color (R:205,G:133,B:63,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Peru
                 * @type Microsoft.Xna.Framework.Color
                 */
                Peru: null,
                /**
                 * Pink color (R:255,G:192,B:203,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Pink
                 * @type Microsoft.Xna.Framework.Color
                 */
                Pink: null,
                /**
                 * Plum color (R:221,G:160,B:221,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Plum
                 * @type Microsoft.Xna.Framework.Color
                 */
                Plum: null,
                /**
                 * PowderBlue color (R:176,G:224,B:230,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function PowderBlue
                 * @type Microsoft.Xna.Framework.Color
                 */
                PowderBlue: null,
                /**
                 * Purple color (R:128,G:0,B:128,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Purple
                 * @type Microsoft.Xna.Framework.Color
                 */
                Purple: null,
                /**
                 * Red color (R:255,G:0,B:0,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Red
                 * @type Microsoft.Xna.Framework.Color
                 */
                Red: null,
                /**
                 * RosyBrown color (R:188,G:143,B:143,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function RosyBrown
                 * @type Microsoft.Xna.Framework.Color
                 */
                RosyBrown: null,
                /**
                 * RoyalBlue color (R:65,G:105,B:225,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function RoyalBlue
                 * @type Microsoft.Xna.Framework.Color
                 */
                RoyalBlue: null,
                /**
                 * SaddleBrown color (R:139,G:69,B:19,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function SaddleBrown
                 * @type Microsoft.Xna.Framework.Color
                 */
                SaddleBrown: null,
                /**
                 * Salmon color (R:250,G:128,B:114,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Salmon
                 * @type Microsoft.Xna.Framework.Color
                 */
                Salmon: null,
                /**
                 * SandyBrown color (R:244,G:164,B:96,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function SandyBrown
                 * @type Microsoft.Xna.Framework.Color
                 */
                SandyBrown: null,
                /**
                 * SeaGreen color (R:46,G:139,B:87,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function SeaGreen
                 * @type Microsoft.Xna.Framework.Color
                 */
                SeaGreen: null,
                /**
                 * SeaShell color (R:255,G:245,B:238,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function SeaShell
                 * @type Microsoft.Xna.Framework.Color
                 */
                SeaShell: null,
                /**
                 * Sienna color (R:160,G:82,B:45,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Sienna
                 * @type Microsoft.Xna.Framework.Color
                 */
                Sienna: null,
                /**
                 * Silver color (R:192,G:192,B:192,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Silver
                 * @type Microsoft.Xna.Framework.Color
                 */
                Silver: null,
                /**
                 * SkyBlue color (R:135,G:206,B:235,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function SkyBlue
                 * @type Microsoft.Xna.Framework.Color
                 */
                SkyBlue: null,
                /**
                 * SlateBlue color (R:106,G:90,B:205,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function SlateBlue
                 * @type Microsoft.Xna.Framework.Color
                 */
                SlateBlue: null,
                /**
                 * SlateGray color (R:112,G:128,B:144,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function SlateGray
                 * @type Microsoft.Xna.Framework.Color
                 */
                SlateGray: null,
                /**
                 * Snow color (R:255,G:250,B:250,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Snow
                 * @type Microsoft.Xna.Framework.Color
                 */
                Snow: null,
                /**
                 * SpringGreen color (R:0,G:255,B:127,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function SpringGreen
                 * @type Microsoft.Xna.Framework.Color
                 */
                SpringGreen: null,
                /**
                 * SteelBlue color (R:70,G:130,B:180,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function SteelBlue
                 * @type Microsoft.Xna.Framework.Color
                 */
                SteelBlue: null,
                /**
                 * Tan color (R:210,G:180,B:140,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Tan
                 * @type Microsoft.Xna.Framework.Color
                 */
                Tan: null,
                /**
                 * Teal color (R:0,G:128,B:128,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Teal
                 * @type Microsoft.Xna.Framework.Color
                 */
                Teal: null,
                /**
                 * Thistle color (R:216,G:191,B:216,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Thistle
                 * @type Microsoft.Xna.Framework.Color
                 */
                Thistle: null,
                /**
                 * Tomato color (R:255,G:99,B:71,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Tomato
                 * @type Microsoft.Xna.Framework.Color
                 */
                Tomato: null,
                /**
                 * Turquoise color (R:64,G:224,B:208,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Turquoise
                 * @type Microsoft.Xna.Framework.Color
                 */
                Turquoise: null,
                /**
                 * Violet color (R:238,G:130,B:238,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Violet
                 * @type Microsoft.Xna.Framework.Color
                 */
                Violet: null,
                /**
                 * Wheat color (R:245,G:222,B:179,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Wheat
                 * @type Microsoft.Xna.Framework.Color
                 */
                Wheat: null,
                /**
                 * White color (R:255,G:255,B:255,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function White
                 * @type Microsoft.Xna.Framework.Color
                 */
                White: null,
                /**
                 * WhiteSmoke color (R:245,G:245,B:245,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function WhiteSmoke
                 * @type Microsoft.Xna.Framework.Color
                 */
                WhiteSmoke: null,
                /**
                 * Yellow color (R:255,G:255,B:0,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function Yellow
                 * @type Microsoft.Xna.Framework.Color
                 */
                Yellow: null,
                /**
                 * YellowGreen color (R:154,G:205,B:50,A:255).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Color
                 * @function YellowGreen
                 * @type Microsoft.Xna.Framework.Color
                 */
                YellowGreen: null
            },
            ctors: {
                init: function () {
                    this.TransparentBlack = new Microsoft.Xna.Framework.Color();
                    this.Transparent = new Microsoft.Xna.Framework.Color();
                    this.AliceBlue = new Microsoft.Xna.Framework.Color();
                    this.AntiqueWhite = new Microsoft.Xna.Framework.Color();
                    this.Aqua = new Microsoft.Xna.Framework.Color();
                    this.Aquamarine = new Microsoft.Xna.Framework.Color();
                    this.Azure = new Microsoft.Xna.Framework.Color();
                    this.Beige = new Microsoft.Xna.Framework.Color();
                    this.Bisque = new Microsoft.Xna.Framework.Color();
                    this.Black = new Microsoft.Xna.Framework.Color();
                    this.BlanchedAlmond = new Microsoft.Xna.Framework.Color();
                    this.Blue = new Microsoft.Xna.Framework.Color();
                    this.BlueViolet = new Microsoft.Xna.Framework.Color();
                    this.Brown = new Microsoft.Xna.Framework.Color();
                    this.BurlyWood = new Microsoft.Xna.Framework.Color();
                    this.CadetBlue = new Microsoft.Xna.Framework.Color();
                    this.Chartreuse = new Microsoft.Xna.Framework.Color();
                    this.Chocolate = new Microsoft.Xna.Framework.Color();
                    this.Coral = new Microsoft.Xna.Framework.Color();
                    this.CornflowerBlue = new Microsoft.Xna.Framework.Color();
                    this.Cornsilk = new Microsoft.Xna.Framework.Color();
                    this.Crimson = new Microsoft.Xna.Framework.Color();
                    this.Cyan = new Microsoft.Xna.Framework.Color();
                    this.DarkBlue = new Microsoft.Xna.Framework.Color();
                    this.DarkCyan = new Microsoft.Xna.Framework.Color();
                    this.DarkGoldenrod = new Microsoft.Xna.Framework.Color();
                    this.DarkGray = new Microsoft.Xna.Framework.Color();
                    this.DarkGreen = new Microsoft.Xna.Framework.Color();
                    this.DarkKhaki = new Microsoft.Xna.Framework.Color();
                    this.DarkMagenta = new Microsoft.Xna.Framework.Color();
                    this.DarkOliveGreen = new Microsoft.Xna.Framework.Color();
                    this.DarkOrange = new Microsoft.Xna.Framework.Color();
                    this.DarkOrchid = new Microsoft.Xna.Framework.Color();
                    this.DarkRed = new Microsoft.Xna.Framework.Color();
                    this.DarkSalmon = new Microsoft.Xna.Framework.Color();
                    this.DarkSeaGreen = new Microsoft.Xna.Framework.Color();
                    this.DarkSlateBlue = new Microsoft.Xna.Framework.Color();
                    this.DarkSlateGray = new Microsoft.Xna.Framework.Color();
                    this.DarkTurquoise = new Microsoft.Xna.Framework.Color();
                    this.DarkViolet = new Microsoft.Xna.Framework.Color();
                    this.DeepPink = new Microsoft.Xna.Framework.Color();
                    this.DeepSkyBlue = new Microsoft.Xna.Framework.Color();
                    this.DimGray = new Microsoft.Xna.Framework.Color();
                    this.DodgerBlue = new Microsoft.Xna.Framework.Color();
                    this.Firebrick = new Microsoft.Xna.Framework.Color();
                    this.FloralWhite = new Microsoft.Xna.Framework.Color();
                    this.ForestGreen = new Microsoft.Xna.Framework.Color();
                    this.Fuchsia = new Microsoft.Xna.Framework.Color();
                    this.Gainsboro = new Microsoft.Xna.Framework.Color();
                    this.GhostWhite = new Microsoft.Xna.Framework.Color();
                    this.Gold = new Microsoft.Xna.Framework.Color();
                    this.Goldenrod = new Microsoft.Xna.Framework.Color();
                    this.Gray = new Microsoft.Xna.Framework.Color();
                    this.Green = new Microsoft.Xna.Framework.Color();
                    this.GreenYellow = new Microsoft.Xna.Framework.Color();
                    this.Honeydew = new Microsoft.Xna.Framework.Color();
                    this.HotPink = new Microsoft.Xna.Framework.Color();
                    this.IndianRed = new Microsoft.Xna.Framework.Color();
                    this.Indigo = new Microsoft.Xna.Framework.Color();
                    this.Ivory = new Microsoft.Xna.Framework.Color();
                    this.Khaki = new Microsoft.Xna.Framework.Color();
                    this.Lavender = new Microsoft.Xna.Framework.Color();
                    this.LavenderBlush = new Microsoft.Xna.Framework.Color();
                    this.LawnGreen = new Microsoft.Xna.Framework.Color();
                    this.LemonChiffon = new Microsoft.Xna.Framework.Color();
                    this.LightBlue = new Microsoft.Xna.Framework.Color();
                    this.LightCoral = new Microsoft.Xna.Framework.Color();
                    this.LightCyan = new Microsoft.Xna.Framework.Color();
                    this.LightGoldenrodYellow = new Microsoft.Xna.Framework.Color();
                    this.LightGray = new Microsoft.Xna.Framework.Color();
                    this.LightGreen = new Microsoft.Xna.Framework.Color();
                    this.LightPink = new Microsoft.Xna.Framework.Color();
                    this.LightSalmon = new Microsoft.Xna.Framework.Color();
                    this.LightSeaGreen = new Microsoft.Xna.Framework.Color();
                    this.LightSkyBlue = new Microsoft.Xna.Framework.Color();
                    this.LightSlateGray = new Microsoft.Xna.Framework.Color();
                    this.LightSteelBlue = new Microsoft.Xna.Framework.Color();
                    this.LightYellow = new Microsoft.Xna.Framework.Color();
                    this.Lime = new Microsoft.Xna.Framework.Color();
                    this.LimeGreen = new Microsoft.Xna.Framework.Color();
                    this.Linen = new Microsoft.Xna.Framework.Color();
                    this.Magenta = new Microsoft.Xna.Framework.Color();
                    this.Maroon = new Microsoft.Xna.Framework.Color();
                    this.MediumAquamarine = new Microsoft.Xna.Framework.Color();
                    this.MediumBlue = new Microsoft.Xna.Framework.Color();
                    this.MediumOrchid = new Microsoft.Xna.Framework.Color();
                    this.MediumPurple = new Microsoft.Xna.Framework.Color();
                    this.MediumSeaGreen = new Microsoft.Xna.Framework.Color();
                    this.MediumSlateBlue = new Microsoft.Xna.Framework.Color();
                    this.MediumSpringGreen = new Microsoft.Xna.Framework.Color();
                    this.MediumTurquoise = new Microsoft.Xna.Framework.Color();
                    this.MediumVioletRed = new Microsoft.Xna.Framework.Color();
                    this.MidnightBlue = new Microsoft.Xna.Framework.Color();
                    this.MintCream = new Microsoft.Xna.Framework.Color();
                    this.MistyRose = new Microsoft.Xna.Framework.Color();
                    this.Moccasin = new Microsoft.Xna.Framework.Color();
                    this.MonoGameOrange = new Microsoft.Xna.Framework.Color();
                    this.NavajoWhite = new Microsoft.Xna.Framework.Color();
                    this.Navy = new Microsoft.Xna.Framework.Color();
                    this.OldLace = new Microsoft.Xna.Framework.Color();
                    this.Olive = new Microsoft.Xna.Framework.Color();
                    this.OliveDrab = new Microsoft.Xna.Framework.Color();
                    this.Orange = new Microsoft.Xna.Framework.Color();
                    this.OrangeRed = new Microsoft.Xna.Framework.Color();
                    this.Orchid = new Microsoft.Xna.Framework.Color();
                    this.PaleGoldenrod = new Microsoft.Xna.Framework.Color();
                    this.PaleGreen = new Microsoft.Xna.Framework.Color();
                    this.PaleTurquoise = new Microsoft.Xna.Framework.Color();
                    this.PaleVioletRed = new Microsoft.Xna.Framework.Color();
                    this.PapayaWhip = new Microsoft.Xna.Framework.Color();
                    this.PeachPuff = new Microsoft.Xna.Framework.Color();
                    this.Peru = new Microsoft.Xna.Framework.Color();
                    this.Pink = new Microsoft.Xna.Framework.Color();
                    this.Plum = new Microsoft.Xna.Framework.Color();
                    this.PowderBlue = new Microsoft.Xna.Framework.Color();
                    this.Purple = new Microsoft.Xna.Framework.Color();
                    this.Red = new Microsoft.Xna.Framework.Color();
                    this.RosyBrown = new Microsoft.Xna.Framework.Color();
                    this.RoyalBlue = new Microsoft.Xna.Framework.Color();
                    this.SaddleBrown = new Microsoft.Xna.Framework.Color();
                    this.Salmon = new Microsoft.Xna.Framework.Color();
                    this.SandyBrown = new Microsoft.Xna.Framework.Color();
                    this.SeaGreen = new Microsoft.Xna.Framework.Color();
                    this.SeaShell = new Microsoft.Xna.Framework.Color();
                    this.Sienna = new Microsoft.Xna.Framework.Color();
                    this.Silver = new Microsoft.Xna.Framework.Color();
                    this.SkyBlue = new Microsoft.Xna.Framework.Color();
                    this.SlateBlue = new Microsoft.Xna.Framework.Color();
                    this.SlateGray = new Microsoft.Xna.Framework.Color();
                    this.Snow = new Microsoft.Xna.Framework.Color();
                    this.SpringGreen = new Microsoft.Xna.Framework.Color();
                    this.SteelBlue = new Microsoft.Xna.Framework.Color();
                    this.Tan = new Microsoft.Xna.Framework.Color();
                    this.Teal = new Microsoft.Xna.Framework.Color();
                    this.Thistle = new Microsoft.Xna.Framework.Color();
                    this.Tomato = new Microsoft.Xna.Framework.Color();
                    this.Turquoise = new Microsoft.Xna.Framework.Color();
                    this.Violet = new Microsoft.Xna.Framework.Color();
                    this.Wheat = new Microsoft.Xna.Framework.Color();
                    this.White = new Microsoft.Xna.Framework.Color();
                    this.WhiteSmoke = new Microsoft.Xna.Framework.Color();
                    this.Yellow = new Microsoft.Xna.Framework.Color();
                    this.YellowGreen = new Microsoft.Xna.Framework.Color();
                },
                ctor: function () {
                    Microsoft.Xna.Framework.Color.TransparentBlack = new Microsoft.Xna.Framework.Color.$ctor10(0);
                    Microsoft.Xna.Framework.Color.Transparent = new Microsoft.Xna.Framework.Color.$ctor10(0);
                    Microsoft.Xna.Framework.Color.AliceBlue = new Microsoft.Xna.Framework.Color.$ctor10(4294965488);
                    Microsoft.Xna.Framework.Color.AntiqueWhite = new Microsoft.Xna.Framework.Color.$ctor10(4292340730);
                    Microsoft.Xna.Framework.Color.Aqua = new Microsoft.Xna.Framework.Color.$ctor10(4294967040);
                    Microsoft.Xna.Framework.Color.Aquamarine = new Microsoft.Xna.Framework.Color.$ctor10(4292149119);
                    Microsoft.Xna.Framework.Color.Azure = new Microsoft.Xna.Framework.Color.$ctor10(4294967280);
                    Microsoft.Xna.Framework.Color.Beige = new Microsoft.Xna.Framework.Color.$ctor10(4292670965);
                    Microsoft.Xna.Framework.Color.Bisque = new Microsoft.Xna.Framework.Color.$ctor10(4291093759);
                    Microsoft.Xna.Framework.Color.Black = new Microsoft.Xna.Framework.Color.$ctor10(4278190080);
                    Microsoft.Xna.Framework.Color.BlanchedAlmond = new Microsoft.Xna.Framework.Color.$ctor10(4291685375);
                    Microsoft.Xna.Framework.Color.Blue = new Microsoft.Xna.Framework.Color.$ctor10(4294901760);
                    Microsoft.Xna.Framework.Color.BlueViolet = new Microsoft.Xna.Framework.Color.$ctor10(4293012362);
                    Microsoft.Xna.Framework.Color.Brown = new Microsoft.Xna.Framework.Color.$ctor10(4280953509);
                    Microsoft.Xna.Framework.Color.BurlyWood = new Microsoft.Xna.Framework.Color.$ctor10(4287084766);
                    Microsoft.Xna.Framework.Color.CadetBlue = new Microsoft.Xna.Framework.Color.$ctor10(4288716383);
                    Microsoft.Xna.Framework.Color.Chartreuse = new Microsoft.Xna.Framework.Color.$ctor10(4278255487);
                    Microsoft.Xna.Framework.Color.Chocolate = new Microsoft.Xna.Framework.Color.$ctor10(4280183250);
                    Microsoft.Xna.Framework.Color.Coral = new Microsoft.Xna.Framework.Color.$ctor10(4283465727);
                    Microsoft.Xna.Framework.Color.CornflowerBlue = new Microsoft.Xna.Framework.Color.$ctor10(4293760356);
                    Microsoft.Xna.Framework.Color.Cornsilk = new Microsoft.Xna.Framework.Color.$ctor10(4292671743);
                    Microsoft.Xna.Framework.Color.Crimson = new Microsoft.Xna.Framework.Color.$ctor10(4282127580);
                    Microsoft.Xna.Framework.Color.Cyan = new Microsoft.Xna.Framework.Color.$ctor10(4294967040);
                    Microsoft.Xna.Framework.Color.DarkBlue = new Microsoft.Xna.Framework.Color.$ctor10(4287299584);
                    Microsoft.Xna.Framework.Color.DarkCyan = new Microsoft.Xna.Framework.Color.$ctor10(4287335168);
                    Microsoft.Xna.Framework.Color.DarkGoldenrod = new Microsoft.Xna.Framework.Color.$ctor10(4278945464);
                    Microsoft.Xna.Framework.Color.DarkGray = new Microsoft.Xna.Framework.Color.$ctor10(4289309097);
                    Microsoft.Xna.Framework.Color.DarkGreen = new Microsoft.Xna.Framework.Color.$ctor10(4278215680);
                    Microsoft.Xna.Framework.Color.DarkKhaki = new Microsoft.Xna.Framework.Color.$ctor10(4285249469);
                    Microsoft.Xna.Framework.Color.DarkMagenta = new Microsoft.Xna.Framework.Color.$ctor10(4287299723);
                    Microsoft.Xna.Framework.Color.DarkOliveGreen = new Microsoft.Xna.Framework.Color.$ctor10(4281297749);
                    Microsoft.Xna.Framework.Color.DarkOrange = new Microsoft.Xna.Framework.Color.$ctor10(4278226175);
                    Microsoft.Xna.Framework.Color.DarkOrchid = new Microsoft.Xna.Framework.Color.$ctor10(4291572377);
                    Microsoft.Xna.Framework.Color.DarkRed = new Microsoft.Xna.Framework.Color.$ctor10(4278190219);
                    Microsoft.Xna.Framework.Color.DarkSalmon = new Microsoft.Xna.Framework.Color.$ctor10(4286224105);
                    Microsoft.Xna.Framework.Color.DarkSeaGreen = new Microsoft.Xna.Framework.Color.$ctor10(4287347855);
                    Microsoft.Xna.Framework.Color.DarkSlateBlue = new Microsoft.Xna.Framework.Color.$ctor10(4287315272);
                    Microsoft.Xna.Framework.Color.DarkSlateGray = new Microsoft.Xna.Framework.Color.$ctor10(4283387695);
                    Microsoft.Xna.Framework.Color.DarkTurquoise = new Microsoft.Xna.Framework.Color.$ctor10(4291939840);
                    Microsoft.Xna.Framework.Color.DarkViolet = new Microsoft.Xna.Framework.Color.$ctor10(4292018324);
                    Microsoft.Xna.Framework.Color.DeepPink = new Microsoft.Xna.Framework.Color.$ctor10(4287829247);
                    Microsoft.Xna.Framework.Color.DeepSkyBlue = new Microsoft.Xna.Framework.Color.$ctor10(4294950656);
                    Microsoft.Xna.Framework.Color.DimGray = new Microsoft.Xna.Framework.Color.$ctor10(4285098345);
                    Microsoft.Xna.Framework.Color.DodgerBlue = new Microsoft.Xna.Framework.Color.$ctor10(4294938654);
                    Microsoft.Xna.Framework.Color.Firebrick = new Microsoft.Xna.Framework.Color.$ctor10(4280427186);
                    Microsoft.Xna.Framework.Color.FloralWhite = new Microsoft.Xna.Framework.Color.$ctor10(4293982975);
                    Microsoft.Xna.Framework.Color.ForestGreen = new Microsoft.Xna.Framework.Color.$ctor10(4280453922);
                    Microsoft.Xna.Framework.Color.Fuchsia = new Microsoft.Xna.Framework.Color.$ctor10(4294902015);
                    Microsoft.Xna.Framework.Color.Gainsboro = new Microsoft.Xna.Framework.Color.$ctor10(4292664540);
                    Microsoft.Xna.Framework.Color.GhostWhite = new Microsoft.Xna.Framework.Color.$ctor10(4294965496);
                    Microsoft.Xna.Framework.Color.Gold = new Microsoft.Xna.Framework.Color.$ctor10(4278245375);
                    Microsoft.Xna.Framework.Color.Goldenrod = new Microsoft.Xna.Framework.Color.$ctor10(4280329690);
                    Microsoft.Xna.Framework.Color.Gray = new Microsoft.Xna.Framework.Color.$ctor10(4286611584);
                    Microsoft.Xna.Framework.Color.Green = new Microsoft.Xna.Framework.Color.$ctor10(4278222848);
                    Microsoft.Xna.Framework.Color.GreenYellow = new Microsoft.Xna.Framework.Color.$ctor10(4281335725);
                    Microsoft.Xna.Framework.Color.Honeydew = new Microsoft.Xna.Framework.Color.$ctor10(4293984240);
                    Microsoft.Xna.Framework.Color.HotPink = new Microsoft.Xna.Framework.Color.$ctor10(4290013695);
                    Microsoft.Xna.Framework.Color.IndianRed = new Microsoft.Xna.Framework.Color.$ctor10(4284243149);
                    Microsoft.Xna.Framework.Color.Indigo = new Microsoft.Xna.Framework.Color.$ctor10(4286709835);
                    Microsoft.Xna.Framework.Color.Ivory = new Microsoft.Xna.Framework.Color.$ctor10(4293984255);
                    Microsoft.Xna.Framework.Color.Khaki = new Microsoft.Xna.Framework.Color.$ctor10(4287424240);
                    Microsoft.Xna.Framework.Color.Lavender = new Microsoft.Xna.Framework.Color.$ctor10(4294633190);
                    Microsoft.Xna.Framework.Color.LavenderBlush = new Microsoft.Xna.Framework.Color.$ctor10(4294308095);
                    Microsoft.Xna.Framework.Color.LawnGreen = new Microsoft.Xna.Framework.Color.$ctor10(4278254716);
                    Microsoft.Xna.Framework.Color.LemonChiffon = new Microsoft.Xna.Framework.Color.$ctor10(4291689215);
                    Microsoft.Xna.Framework.Color.LightBlue = new Microsoft.Xna.Framework.Color.$ctor10(4293318829);
                    Microsoft.Xna.Framework.Color.LightCoral = new Microsoft.Xna.Framework.Color.$ctor10(4286611696);
                    Microsoft.Xna.Framework.Color.LightCyan = new Microsoft.Xna.Framework.Color.$ctor10(4294967264);
                    Microsoft.Xna.Framework.Color.LightGoldenrodYellow = new Microsoft.Xna.Framework.Color.$ctor10(4292016890);
                    Microsoft.Xna.Framework.Color.LightGray = new Microsoft.Xna.Framework.Color.$ctor10(4292072403);
                    Microsoft.Xna.Framework.Color.LightGreen = new Microsoft.Xna.Framework.Color.$ctor10(4287688336);
                    Microsoft.Xna.Framework.Color.LightPink = new Microsoft.Xna.Framework.Color.$ctor10(4290885375);
                    Microsoft.Xna.Framework.Color.LightSalmon = new Microsoft.Xna.Framework.Color.$ctor10(4286226687);
                    Microsoft.Xna.Framework.Color.LightSeaGreen = new Microsoft.Xna.Framework.Color.$ctor10(4289376800);
                    Microsoft.Xna.Framework.Color.LightSkyBlue = new Microsoft.Xna.Framework.Color.$ctor10(4294626951);
                    Microsoft.Xna.Framework.Color.LightSlateGray = new Microsoft.Xna.Framework.Color.$ctor10(4288252023);
                    Microsoft.Xna.Framework.Color.LightSteelBlue = new Microsoft.Xna.Framework.Color.$ctor10(4292789424);
                    Microsoft.Xna.Framework.Color.LightYellow = new Microsoft.Xna.Framework.Color.$ctor10(4292935679);
                    Microsoft.Xna.Framework.Color.Lime = new Microsoft.Xna.Framework.Color.$ctor10(4278255360);
                    Microsoft.Xna.Framework.Color.LimeGreen = new Microsoft.Xna.Framework.Color.$ctor10(4281519410);
                    Microsoft.Xna.Framework.Color.Linen = new Microsoft.Xna.Framework.Color.$ctor10(4293325050);
                    Microsoft.Xna.Framework.Color.Magenta = new Microsoft.Xna.Framework.Color.$ctor10(4294902015);
                    Microsoft.Xna.Framework.Color.Maroon = new Microsoft.Xna.Framework.Color.$ctor10(4278190208);
                    Microsoft.Xna.Framework.Color.MediumAquamarine = new Microsoft.Xna.Framework.Color.$ctor10(4289383782);
                    Microsoft.Xna.Framework.Color.MediumBlue = new Microsoft.Xna.Framework.Color.$ctor10(4291624960);
                    Microsoft.Xna.Framework.Color.MediumOrchid = new Microsoft.Xna.Framework.Color.$ctor10(4292040122);
                    Microsoft.Xna.Framework.Color.MediumPurple = new Microsoft.Xna.Framework.Color.$ctor10(4292571283);
                    Microsoft.Xna.Framework.Color.MediumSeaGreen = new Microsoft.Xna.Framework.Color.$ctor10(4285641532);
                    Microsoft.Xna.Framework.Color.MediumSlateBlue = new Microsoft.Xna.Framework.Color.$ctor10(4293814395);
                    Microsoft.Xna.Framework.Color.MediumSpringGreen = new Microsoft.Xna.Framework.Color.$ctor10(4288346624);
                    Microsoft.Xna.Framework.Color.MediumTurquoise = new Microsoft.Xna.Framework.Color.$ctor10(4291613000);
                    Microsoft.Xna.Framework.Color.MediumVioletRed = new Microsoft.Xna.Framework.Color.$ctor10(4286911943);
                    Microsoft.Xna.Framework.Color.MidnightBlue = new Microsoft.Xna.Framework.Color.$ctor10(4285536537);
                    Microsoft.Xna.Framework.Color.MintCream = new Microsoft.Xna.Framework.Color.$ctor10(4294639605);
                    Microsoft.Xna.Framework.Color.MistyRose = new Microsoft.Xna.Framework.Color.$ctor10(4292994303);
                    Microsoft.Xna.Framework.Color.Moccasin = new Microsoft.Xna.Framework.Color.$ctor10(4290110719);
                    Microsoft.Xna.Framework.Color.MonoGameOrange = new Microsoft.Xna.Framework.Color.$ctor10(4278205671);
                    Microsoft.Xna.Framework.Color.NavajoWhite = new Microsoft.Xna.Framework.Color.$ctor10(4289584895);
                    Microsoft.Xna.Framework.Color.Navy = new Microsoft.Xna.Framework.Color.$ctor10(4286578688);
                    Microsoft.Xna.Framework.Color.OldLace = new Microsoft.Xna.Framework.Color.$ctor10(4293326333);
                    Microsoft.Xna.Framework.Color.Olive = new Microsoft.Xna.Framework.Color.$ctor10(4278222976);
                    Microsoft.Xna.Framework.Color.OliveDrab = new Microsoft.Xna.Framework.Color.$ctor10(4280520299);
                    Microsoft.Xna.Framework.Color.Orange = new Microsoft.Xna.Framework.Color.$ctor10(4278232575);
                    Microsoft.Xna.Framework.Color.OrangeRed = new Microsoft.Xna.Framework.Color.$ctor10(4278207999);
                    Microsoft.Xna.Framework.Color.Orchid = new Microsoft.Xna.Framework.Color.$ctor10(4292243674);
                    Microsoft.Xna.Framework.Color.PaleGoldenrod = new Microsoft.Xna.Framework.Color.$ctor10(4289390830);
                    Microsoft.Xna.Framework.Color.PaleGreen = new Microsoft.Xna.Framework.Color.$ctor10(4288215960);
                    Microsoft.Xna.Framework.Color.PaleTurquoise = new Microsoft.Xna.Framework.Color.$ctor10(4293848751);
                    Microsoft.Xna.Framework.Color.PaleVioletRed = new Microsoft.Xna.Framework.Color.$ctor10(4287852763);
                    Microsoft.Xna.Framework.Color.PapayaWhip = new Microsoft.Xna.Framework.Color.$ctor10(4292210687);
                    Microsoft.Xna.Framework.Color.PeachPuff = new Microsoft.Xna.Framework.Color.$ctor10(4290370303);
                    Microsoft.Xna.Framework.Color.Peru = new Microsoft.Xna.Framework.Color.$ctor10(4282353101);
                    Microsoft.Xna.Framework.Color.Pink = new Microsoft.Xna.Framework.Color.$ctor10(4291543295);
                    Microsoft.Xna.Framework.Color.Plum = new Microsoft.Xna.Framework.Color.$ctor10(4292714717);
                    Microsoft.Xna.Framework.Color.PowderBlue = new Microsoft.Xna.Framework.Color.$ctor10(4293320880);
                    Microsoft.Xna.Framework.Color.Purple = new Microsoft.Xna.Framework.Color.$ctor10(4286578816);
                    Microsoft.Xna.Framework.Color.Red = new Microsoft.Xna.Framework.Color.$ctor10(4278190335);
                    Microsoft.Xna.Framework.Color.RosyBrown = new Microsoft.Xna.Framework.Color.$ctor10(4287598524);
                    Microsoft.Xna.Framework.Color.RoyalBlue = new Microsoft.Xna.Framework.Color.$ctor10(4292962625);
                    Microsoft.Xna.Framework.Color.SaddleBrown = new Microsoft.Xna.Framework.Color.$ctor10(4279453067);
                    Microsoft.Xna.Framework.Color.Salmon = new Microsoft.Xna.Framework.Color.$ctor10(4285694202);
                    Microsoft.Xna.Framework.Color.SandyBrown = new Microsoft.Xna.Framework.Color.$ctor10(4284523764);
                    Microsoft.Xna.Framework.Color.SeaGreen = new Microsoft.Xna.Framework.Color.$ctor10(4283927342);
                    Microsoft.Xna.Framework.Color.SeaShell = new Microsoft.Xna.Framework.Color.$ctor10(4293850623);
                    Microsoft.Xna.Framework.Color.Sienna = new Microsoft.Xna.Framework.Color.$ctor10(4281160352);
                    Microsoft.Xna.Framework.Color.Silver = new Microsoft.Xna.Framework.Color.$ctor10(4290822336);
                    Microsoft.Xna.Framework.Color.SkyBlue = new Microsoft.Xna.Framework.Color.$ctor10(4293643911);
                    Microsoft.Xna.Framework.Color.SlateBlue = new Microsoft.Xna.Framework.Color.$ctor10(4291648106);
                    Microsoft.Xna.Framework.Color.SlateGray = new Microsoft.Xna.Framework.Color.$ctor10(4287660144);
                    Microsoft.Xna.Framework.Color.Snow = new Microsoft.Xna.Framework.Color.$ctor10(4294638335);
                    Microsoft.Xna.Framework.Color.SpringGreen = new Microsoft.Xna.Framework.Color.$ctor10(4286578432);
                    Microsoft.Xna.Framework.Color.SteelBlue = new Microsoft.Xna.Framework.Color.$ctor10(4290019910);
                    Microsoft.Xna.Framework.Color.Tan = new Microsoft.Xna.Framework.Color.$ctor10(4287411410);
                    Microsoft.Xna.Framework.Color.Teal = new Microsoft.Xna.Framework.Color.$ctor10(4286611456);
                    Microsoft.Xna.Framework.Color.Thistle = new Microsoft.Xna.Framework.Color.$ctor10(4292394968);
                    Microsoft.Xna.Framework.Color.Tomato = new Microsoft.Xna.Framework.Color.$ctor10(4282868735);
                    Microsoft.Xna.Framework.Color.Turquoise = new Microsoft.Xna.Framework.Color.$ctor10(4291878976);
                    Microsoft.Xna.Framework.Color.Violet = new Microsoft.Xna.Framework.Color.$ctor10(4293821166);
                    Microsoft.Xna.Framework.Color.Wheat = new Microsoft.Xna.Framework.Color.$ctor10(4289978101);
                    Microsoft.Xna.Framework.Color.White = new Microsoft.Xna.Framework.Color.$ctor10(4294967295);
                    Microsoft.Xna.Framework.Color.WhiteSmoke = new Microsoft.Xna.Framework.Color.$ctor10(4294309365);
                    Microsoft.Xna.Framework.Color.Yellow = new Microsoft.Xna.Framework.Color.$ctor10(4278255615);
                    Microsoft.Xna.Framework.Color.YellowGreen = new Microsoft.Xna.Framework.Color.$ctor10(4281519514);
                }
            },
            methods: {
                /**
                 * Performs linear interpolation of {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Color
                 * @memberof Microsoft.Xna.Framework.Color
                 * @param   {Microsoft.Xna.Framework.Color}    value1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Color}    value2    Destination {@link }.
                 * @param   {number}                           amount    Interpolation factor.
                 * @return  {Microsoft.Xna.Framework.Color}              Interpolated {@link }.
                 */
                Lerp: function (value1, value2, amount) {
                    amount = Microsoft.Xna.Framework.MathHelper.Clamp$1(amount, 0, 1);
                    return new Microsoft.Xna.Framework.Color.$ctor7(Bridge.Int.clip32(Microsoft.Xna.Framework.MathHelper.Lerp(value1.R, value2.R, amount)), Bridge.Int.clip32(Microsoft.Xna.Framework.MathHelper.Lerp(value1.G, value2.G, amount)), Bridge.Int.clip32(Microsoft.Xna.Framework.MathHelper.Lerp(value1.B, value2.B, amount)), Bridge.Int.clip32(Microsoft.Xna.Framework.MathHelper.Lerp(value1.A, value2.A, amount)));
                },
                /**
                 * {@link } should be used instead of this function.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Color
                 * @memberof Microsoft.Xna.Framework.Color
                 * @param   {Microsoft.Xna.Framework.Color}    value1    
                 * @param   {Microsoft.Xna.Framework.Color}    value2    
                 * @param   {number}                           amount
                 * @return  {Microsoft.Xna.Framework.Color}              Interpolated {@link }.
                 */
                LerpPrecise: function (value1, value2, amount) {
                    amount = Microsoft.Xna.Framework.MathHelper.Clamp$1(amount, 0, 1);
                    return new Microsoft.Xna.Framework.Color.$ctor7(Bridge.Int.clip32(Microsoft.Xna.Framework.MathHelper.LerpPrecise(value1.R, value2.R, amount)), Bridge.Int.clip32(Microsoft.Xna.Framework.MathHelper.LerpPrecise(value1.G, value2.G, amount)), Bridge.Int.clip32(Microsoft.Xna.Framework.MathHelper.LerpPrecise(value1.B, value2.B, amount)), Bridge.Int.clip32(Microsoft.Xna.Framework.MathHelper.LerpPrecise(value1.A, value2.A, amount)));
                },
                /**
                 * Multiply {@link } by value.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Color
                 * @memberof Microsoft.Xna.Framework.Color
                 * @param   {Microsoft.Xna.Framework.Color}    value    Source {@link }.
                 * @param   {number}                           scale    Multiplicator.
                 * @return  {Microsoft.Xna.Framework.Color}             Multiplication result.
                 */
                Multiply: function (value, scale) {
                    return new Microsoft.Xna.Framework.Color.$ctor7(Bridge.Int.clip32(value.R * scale), Bridge.Int.clip32(value.G * scale), Bridge.Int.clip32(value.B * scale), Bridge.Int.clip32(value.A * scale));
                },
                /**
                 * Translate a non-premultipled alpha {@link } to a {@link } that contains premultiplied alpha.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Color
                 * @memberof Microsoft.Xna.Framework.Color
                 * @param   {Microsoft.Xna.Framework.Vector4}    vector    A {@link } representing color.
                 * @return  {Microsoft.Xna.Framework.Color}                A {@link } which contains premultiplied alpha data.
                 */
                FromNonPremultiplied: function (vector) {
                    return new Microsoft.Xna.Framework.Color.$ctor9(vector.X * vector.W, vector.Y * vector.W, vector.Z * vector.W, vector.W);
                },
                /**
                 * Translate a non-premultipled alpha {@link } to a {@link } that contains premultiplied alpha.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Color
                 * @memberof Microsoft.Xna.Framework.Color
                 * @param   {number}                           r    Red component value.
                 * @param   {number}                           g    Green component value.
                 * @param   {number}                           b    Blue component value.
                 * @param   {number}                           a    Alpha component value.
                 * @return  {Microsoft.Xna.Framework.Color}         A {@link } which contains premultiplied alpha data.
                 */
                FromNonPremultiplied$1: function (r, g, b, a) {
                    return new Microsoft.Xna.Framework.Color.$ctor7(((Bridge.Int.div(Bridge.Int.mul(r, a), 255)) | 0), ((Bridge.Int.div(Bridge.Int.mul(g, a), 255)) | 0), ((Bridge.Int.div(Bridge.Int.mul(b, a), 255)) | 0), a);
                }/**
                 * Compares whether two {@link } instances are equal.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Color
                 * @memberof Microsoft.Xna.Framework.Color
                 * @param   {Microsoft.Xna.Framework.Color}    a    {@link } instance on the left of the equal sign.
                 * @param   {Microsoft.Xna.Framework.Color}    b    {@link } instance on the right of the equal sign.
                 * @return  {boolean}                               <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
                 */
                ,
                op_Equality: function (a, b) {
                    return (a._packedValue === b._packedValue);
                }/**
                 * Compares whether two {@link } instances are not equal.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Color
                 * @memberof Microsoft.Xna.Framework.Color
                 * @param   {Microsoft.Xna.Framework.Color}    a    {@link } instance on the left of the not equal sign.
                 * @param   {Microsoft.Xna.Framework.Color}    b    {@link } instance on the right of the not equal sign.
                 * @return  {boolean}                               <pre><code>true</code></pre> if the instances are not equal; <pre><code>false</code></pre> otherwise.
                 */
                ,
                op_Inequality: function (a, b) {
                    return (a._packedValue !== b._packedValue);
                }/**
                 * Multiply {@link } by value.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Color
                 * @memberof Microsoft.Xna.Framework.Color
                 * @param   {Microsoft.Xna.Framework.Color}    value    Source {@link }.
                 * @param   {number}                           scale    Multiplicator.
                 * @return  {Microsoft.Xna.Framework.Color}             Multiplication result.
                 */
                ,
                op_Multiply: function (value, scale) {
                    return new Microsoft.Xna.Framework.Color.$ctor7(Bridge.Int.clip32(value.R * scale), Bridge.Int.clip32(value.G * scale), Bridge.Int.clip32(value.B * scale), Bridge.Int.clip32(value.A * scale));
                },
                getDefaultValue: function () { return new Microsoft.Xna.Framework.Color(); }
            }
        },
        fields: {
            _packedValue: 0
        },
        props: {
            /**
             * Gets or sets the blue component.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Color
             * @function B
             * @type number
             */
            B: {
                get: function () {
                    return ((this._packedValue >>> 16) & 255);
                },
                set: function (value) {
                    this._packedValue = ((((this._packedValue & 4278255615) >>> 0)) | (((value << 16) >>> 0))) >>> 0;
                }
            },
            /**
             * Gets or sets the green component.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Color
             * @function G
             * @type number
             */
            G: {
                get: function () {
                    return ((this._packedValue >>> 8) & 255);
                },
                set: function (value) {
                    this._packedValue = ((((this._packedValue & 4294902015) >>> 0)) | (((value << 8) >>> 0))) >>> 0;
                }
            },
            /**
             * Gets or sets the red component.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Color
             * @function R
             * @type number
             */
            R: {
                get: function () {
                    return (this._packedValue & 255);
                },
                set: function (value) {
                    this._packedValue = ((((this._packedValue & 4294967040) >>> 0)) | value) >>> 0;
                }
            },
            /**
             * Gets or sets the alpha component.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Color
             * @function A
             * @type number
             */
            A: {
                get: function () {
                    return ((this._packedValue >>> 24) & 255);
                },
                set: function (value) {
                    this._packedValue = ((((this._packedValue & 16777215) >>> 0)) | (((value << 24) >>> 0))) >>> 0;
                }
            },
            /**
             * Gets or sets packed value of this {@link }.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Color
             * @function PackedValue
             * @type number
             */
            PackedValue: {
                get: function () {
                    return this._packedValue;
                },
                set: function (value) {
                    this._packedValue = value;
                }
            },
            DebugDisplayString: {
                get: function () {
                    return System.String.concat([Bridge.toString(this.R), "  ", Bridge.toString(this.G), "  ", Bridge.toString(this.B), "  ", Bridge.toString(this.A)]);
                }
            }
        },
        alias: ["equalsT", "System$IEquatable$1$Microsoft$Xna$Framework$Color$equalsT"],
        ctors: {
            /**
             * Constructs an RGBA color from a packed value.
             The value is a 32-bit unsigned integer, with R in the least significant octet.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Color
             * @memberof Microsoft.Xna.Framework.Color
             * @param   {number}    packedValue    The packed value.
             * @return  {void}
             */
            $ctor10: function (packedValue) {
                this.$initialize();
                this._packedValue = packedValue;
            },
            /**
             * Constructs an RGBA color from the XYZW unit length components of a vector.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Color
             * @memberof Microsoft.Xna.Framework.Color
             * @param   {Microsoft.Xna.Framework.Vector4}    color    A {@link } representing color.
             * @return  {void}
             */
            $ctor4: function (color) {
                Microsoft.Xna.Framework.Color.$ctor7.call(this, Bridge.Int.clip32(color.X * 255), Bridge.Int.clip32(color.Y * 255), Bridge.Int.clip32(color.Z * 255), Bridge.Int.clip32(color.W * 255));
            },
            /**
             * Constructs an RGBA color from the XYZ unit length components of a vector. Alpha value will be opaque.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Color
             * @memberof Microsoft.Xna.Framework.Color
             * @param   {Microsoft.Xna.Framework.Vector3}    color    A {@link } representing color.
             * @return  {void}
             */
            $ctor3: function (color) {
                Microsoft.Xna.Framework.Color.$ctor6.call(this, Bridge.Int.clip32(color.X * 255), Bridge.Int.clip32(color.Y * 255), Bridge.Int.clip32(color.Z * 255));
            },
            /**
             * Constructs an RGBA color from a {@link } and an alpha value.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Color
             * @memberof Microsoft.Xna.Framework.Color
             * @param   {Microsoft.Xna.Framework.Color}    color    A {@link } for RGB values of new {@link } instance.
             * @param   {number}                           alpha    The alpha component value from 0 to 255.
             * @return  {void}
             */
            $ctor1: function (color, alpha) {
                this.$initialize();
                if ((System.Int64(alpha).and(System.Int64(4294967040))).ne(System.Int64(0))) {
                    var clampedA = (Microsoft.Xna.Framework.MathHelper.Clamp(alpha, 0, 255)) >>> 0;

                    this._packedValue = ((((color._packedValue & 16777215) >>> 0)) | (((clampedA << 24) >>> 0))) >>> 0;
                } else {
                    this._packedValue = ((((color._packedValue & 16777215) >>> 0)) | ((((alpha >>> 0) << 24) >>> 0))) >>> 0;
                }
            },
            /**
             * Constructs an RGBA color from color and alpha value.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Color
             * @memberof Microsoft.Xna.Framework.Color
             * @param   {Microsoft.Xna.Framework.Color}    color    A {@link } for RGB values of new {@link } instance.
             * @param   {number}                           alpha    Alpha component value from 0.0f to 1.0f.
             * @return  {void}
             */
            $ctor2: function (color, alpha) {
                Microsoft.Xna.Framework.Color.$ctor1.call(this, color, Bridge.Int.clip32(alpha * 255));
            },
            /**
             * Constructs an RGBA color from scalars representing red, green and blue values. Alpha value will be opaque.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Color
             * @memberof Microsoft.Xna.Framework.Color
             * @param   {number}    r    Red component value from 0.0f to 1.0f.
             * @param   {number}    g    Green component value from 0.0f to 1.0f.
             * @param   {number}    b    Blue component value from 0.0f to 1.0f.
             * @return  {void}
             */
            $ctor8: function (r, g, b) {
                Microsoft.Xna.Framework.Color.$ctor6.call(this, Bridge.Int.clip32(r * 255), Bridge.Int.clip32(g * 255), Bridge.Int.clip32(b * 255));
            },
            /**
             * Constructs an RGBA color from scalars representing red, green, blue and alpha values.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Color
             * @memberof Microsoft.Xna.Framework.Color
             * @param   {number}    r        Red component value from 0.0f to 1.0f.
             * @param   {number}    g        Green component value from 0.0f to 1.0f.
             * @param   {number}    b        Blue component value from 0.0f to 1.0f.
             * @param   {number}    alpha    Alpha component value from 0.0f to 1.0f.
             * @return  {void}
             */
            $ctor9: function (r, g, b, alpha) {
                Microsoft.Xna.Framework.Color.$ctor7.call(this, Bridge.Int.clip32(r * 255), Bridge.Int.clip32(g * 255), Bridge.Int.clip32(b * 255), Bridge.Int.clip32(alpha * 255));
            },
            /**
             * Constructs an RGBA color from scalars representing red, green and blue values. Alpha value will be opaque.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Color
             * @memberof Microsoft.Xna.Framework.Color
             * @param   {number}    r    Red component value from 0 to 255.
             * @param   {number}    g    Green component value from 0 to 255.
             * @param   {number}    b    Blue component value from 0 to 255.
             * @return  {void}
             */
            $ctor6: function (r, g, b) {
                this.$initialize();
                this._packedValue = 4278190080;

                if ((System.Int64((r | g | b)).and(System.Int64(4294967040))).ne(System.Int64(0))) {
                    var clampedR = (Microsoft.Xna.Framework.MathHelper.Clamp(r, 0, 255)) >>> 0;
                    var clampedG = (Microsoft.Xna.Framework.MathHelper.Clamp(g, 0, 255)) >>> 0;
                    var clampedB = (Microsoft.Xna.Framework.MathHelper.Clamp(b, 0, 255)) >>> 0;

                    this._packedValue = (this._packedValue | ((((((((clampedB << 16) >>> 0)) | (((clampedG << 8) >>> 0))) >>> 0) | (clampedR)) >>> 0))) >>> 0;
                } else {
                    this._packedValue = (this._packedValue | (((((((((b >>> 0) << 16) >>> 0)) | ((((g >>> 0) << 8) >>> 0))) >>> 0) | (r >>> 0)) >>> 0))) >>> 0;
                }
            },
            /**
             * Constructs an RGBA color from scalars representing red, green, blue and alpha values.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Color
             * @memberof Microsoft.Xna.Framework.Color
             * @param   {number}    r        Red component value from 0 to 255.
             * @param   {number}    g        Green component value from 0 to 255.
             * @param   {number}    b        Blue component value from 0 to 255.
             * @param   {number}    alpha    Alpha component value from 0 to 255.
             * @return  {void}
             */
            $ctor7: function (r, g, b, alpha) {
                this.$initialize();
                if ((System.Int64((r | g | b | alpha)).and(System.Int64(4294967040))).ne(System.Int64(0))) {
                    var clampedR = (Microsoft.Xna.Framework.MathHelper.Clamp(r, 0, 255)) >>> 0;
                    var clampedG = (Microsoft.Xna.Framework.MathHelper.Clamp(g, 0, 255)) >>> 0;
                    var clampedB = (Microsoft.Xna.Framework.MathHelper.Clamp(b, 0, 255)) >>> 0;
                    var clampedA = (Microsoft.Xna.Framework.MathHelper.Clamp(alpha, 0, 255)) >>> 0;

                    this._packedValue = ((((((((clampedA << 24) >>> 0)) | (((clampedB << 16) >>> 0))) >>> 0) | (((clampedG << 8) >>> 0))) >>> 0) | (clampedR)) >>> 0;
                } else {
                    this._packedValue = (((((((((alpha >>> 0) << 24) >>> 0)) | ((((b >>> 0) << 16) >>> 0))) >>> 0) | ((((g >>> 0) << 8) >>> 0))) >>> 0) | (r >>> 0)) >>> 0;
                }
            },
            /**
             * Constructs an RGBA color from scalars representing red, green, blue and alpha values.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Color
             * @memberof Microsoft.Xna.Framework.Color
             * @param   {number}    r        
             * @param   {number}    g        
             * @param   {number}    b        
             * @param   {number}    alpha
             * @return  {void}
             */
            $ctor5: function (r, g, b, alpha) {
                this.$initialize();
                this._packedValue = ((((((((alpha << 24) >>> 0)) | (((b << 16) >>> 0))) >>> 0) | (((g << 8) >>> 0))) >>> 0) | (r)) >>> 0;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Gets the hash code of this {@link }.
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.Color
             * @memberof Microsoft.Xna.Framework.Color
             * @return  {number}        Hash code of this {@link }.
             */
            getHashCode: function () {
                return Bridge.getHashCode(this._packedValue);
            },
            /**
             * Compares whether current instance is equal to specified object.
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.Color
             * @memberof Microsoft.Xna.Framework.Color
             * @param   {System.Object}    obj    The {@link } to compare.
             * @return  {boolean}                 <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
             */
            equals: function (obj) {
                return ((Bridge.is(obj, Microsoft.Xna.Framework.Color)) && this.equalsT(System.Nullable.getValue(Bridge.cast(Bridge.unbox(obj, Microsoft.Xna.Framework.Color), Microsoft.Xna.Framework.Color))));
            },
            /**
             * Compares whether current instance is equal to specified {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Color
             * @memberof Microsoft.Xna.Framework.Color
             * @param   {Microsoft.Xna.Framework.Color}    other    The {@link } to compare.
             * @return  {boolean}                                   <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
             */
            equalsT: function (other) {
                return this.PackedValue === other.PackedValue;
            },
            /**
             * Gets a {@link } representation for this object.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Color
             * @memberof Microsoft.Xna.Framework.Color
             * @return  {Microsoft.Xna.Framework.Vector3}        A {@link } representation for this object.
             */
            ToVector3: function () {
                return new Microsoft.Xna.Framework.Vector3.$ctor3(this.R / 255.0, this.G / 255.0, this.B / 255.0);
            },
            /**
             * Gets a {@link } representation for this object.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Color
             * @memberof Microsoft.Xna.Framework.Color
             * @return  {Microsoft.Xna.Framework.Vector4}        A {@link } representation for this object.
             */
            ToVector4: function () {
                return new Microsoft.Xna.Framework.Vector4.$ctor4(this.R / 255.0, this.G / 255.0, this.B / 255.0, this.A / 255.0);
            },
            /**
             * Returns a {@link } representation of this {@link } in the format:
             {R:[red] G:[green] B:[blue] A:[alpha]}
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.Color
             * @memberof Microsoft.Xna.Framework.Color
             * @return  {string}        {@link } representation of this {@link }.
             */
            toString: function () {
                var sb = new System.Text.StringBuilder("", 25);
                sb.append("{R:");
                sb.append(this.R);
                sb.append(" G:");
                sb.append(this.G);
                sb.append(" B:");
                sb.append(this.B);
                sb.append(" A:");
                sb.append(this.A);
                sb.append("}");
                return sb.toString();
            },
            /**
             * Deconstruction method for {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Color
             * @memberof Microsoft.Xna.Framework.Color
             * @param   {System.Single}    r    
             * @param   {System.Single}    g    
             * @param   {System.Single}    b
             * @return  {void}
             */
            Deconstruct: function (r, g, b) {
                r.v = this.R;
                g.v = this.G;
                b.v = this.B;
            },
            /**
             * Deconstruction method for {@link } with Alpha.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Color
             * @memberof Microsoft.Xna.Framework.Color
             * @param   {System.Single}    r    
             * @param   {System.Single}    g    
             * @param   {System.Single}    b    
             * @param   {System.Single}    a
             * @return  {void}
             */
            Deconstruct$1: function (r, g, b, a) {
                r.v = this.R;
                g.v = this.G;
                b.v = this.B;
                a.v = this.A;
            },
            $clone: function (to) {
                var s = to || new Microsoft.Xna.Framework.Color();
                s._packedValue = this._packedValue;
                return s;
            }
        }
    });

    /**
     * Defines how the bounding volumes intersects or contain one another.
     *
     * @public
     * @class Microsoft.Xna.Framework.ContainmentType
     */
    Bridge.define("Microsoft.Xna.Framework.ContainmentType", {
        $kind: "enum",
        statics: {
            fields: {
                /**
                 * Indicates that there is no overlap between two bounding volumes.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.ContainmentType
                 * @constant
                 * @default 0
                 * @type Microsoft.Xna.Framework.ContainmentType
                 */
                Disjoint: 0,
                /**
                 * Indicates that one bounding volume completely contains another volume.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.ContainmentType
                 * @constant
                 * @default 1
                 * @type Microsoft.Xna.Framework.ContainmentType
                 */
                Contains: 1,
                /**
                 * Indicates that bounding volumes partially overlap one another.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.ContainmentType
                 * @constant
                 * @default 2
                 * @type Microsoft.Xna.Framework.ContainmentType
                 */
                Intersects: 2
            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.Content.ContentManager", {
        fields: {
            RootDirectory: null,
            _graphicsDevice: null,
            ResourcesReady: null,
            OnAllResourceLoaded: null
        },
        props: {
            AllResoucesLoaded: {
                get: function () {
                    return System.Linq.Enumerable.from(this.ResourcesReady).where(function (t) {
                            return !t.value;
                        }).count() === 0;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this.ResourcesReady = new (System.Collections.Generic.Dictionary$2(System.String,System.Boolean))();
                Microsoft.Xna.Framework.WebAudioHelper.Init();
                Microsoft.Xna.Framework.Media.MediaPlayer.contentManager = this;
            },
            $ctor1: function (serviceProvider, rootDirectory) {
                this.$initialize();
            }
        },
        methods: {
            NotifyIfAllResourcesLoaded: function () {
                if (this.AllResoucesLoaded) {
                    try {
                        this.OnAllResourceLoaded();
                    }
                    catch ($e1) {
                        $e1 = System.Exception.create($e1);
                    }
                }
            },
            Load: function (T, name) {
                this.ResourcesReady.add(name, false);
                if (Bridge.referenceEquals(T, Microsoft.Xna.Framework.Graphics.Texture2D)) {
                    var t = new Microsoft.Xna.Framework.Graphics.Texture2D.ctor();
                    var img = new Image();
                    img.onload = Bridge.fn.bind(this, function (e) {
                        t.Image = img;
                        t.Name = name;
                        this.ResourcesReady.set(name, true);
                        this.NotifyIfAllResourcesLoaded();
                    });
                    img.src = (this.RootDirectory || "") + "/" + (name || "") + ".png";
                    return Bridge.as(t, T);
                } else if (Bridge.referenceEquals(T, Microsoft.Xna.Framework.Audio.SoundEffect)) {
                    var t1 = new Microsoft.Xna.Framework.Audio.SoundEffect();
                    t1.Load((this.RootDirectory || "") + "/" + (name || "") + ".mp3", Bridge.fn.bind(this, function () {
                        t1.Name = name;
                        this.ResourcesReady.set(name, (t1.Loaded = true));
                        this.NotifyIfAllResourcesLoaded();
                    }));
                    return Bridge.as(t1, T);
                } else if (Bridge.referenceEquals(T, Microsoft.Xna.Framework.Media.Song)) {
                    var t2 = new Microsoft.Xna.Framework.Media.Song();
                    t2.Load((this.RootDirectory || "") + "/" + (name || "") + ".mp3", Bridge.fn.bind(this, function () {
                        t2.Name = name;
                        this.ResourcesReady.set(name, (t2.Loaded = true));
                        this.NotifyIfAllResourcesLoaded();
                    }));
                    return Bridge.as(t2, T);
                } else {
                    return Bridge.createInstance(T);
                }
            },
            Unload: function () {
                this.ResourcesReady.clear();
            }
        }
    });

    /**
     * Contains a collection of {@link } points in 2D space and provides methods for evaluating features of the curve they define.
     *
     * @public
     * @class Microsoft.Xna.Framework.Curve
     */
    Bridge.define("Microsoft.Xna.Framework.Curve", {
        fields: {
            _preLoop: 0,
            _postLoop: 0,
            _keys: null
        },
        props: {
            /**
             * Returns <pre><code>true</code></pre> if this curve is constant (has zero or one points); <pre><code>false</code></pre> otherwise.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.Curve
             * @function IsConstant
             * @type boolean
             */
            IsConstant: {
                get: function () {
                    return this._keys.Count <= 1;
                }
            },
            /**
             * Defines how to handle weighting values that are less than the first control point in the curve.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Curve
             * @function PreLoop
             * @type Microsoft.Xna.Framework.CurveLoopType
             */
            PreLoop: {
                get: function () {
                    return this._preLoop;
                },
                set: function (value) {
                    this._preLoop = value;
                }
            },
            /**
             * Defines how to handle weighting values that are greater than the last control point in the curve.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Curve
             * @function PostLoop
             * @type Microsoft.Xna.Framework.CurveLoopType
             */
            PostLoop: {
                get: function () {
                    return this._postLoop;
                },
                set: function (value) {
                    this._postLoop = value;
                }
            },
            /**
             * The collection of curve keys.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.Curve
             * @function Keys
             * @type Microsoft.Xna.Framework.CurveKeyCollection
             */
            Keys: {
                get: function () {
                    return this._keys;
                }
            }
        },
        ctors: {
            /**
             * Constructs a curve.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Curve
             * @memberof Microsoft.Xna.Framework.Curve
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                this._keys = new Microsoft.Xna.Framework.CurveKeyCollection();
            }
        },
        methods: {
            /**
             * Creates a copy of this curve.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Curve
             * @memberof Microsoft.Xna.Framework.Curve
             * @return  {Microsoft.Xna.Framework.Curve}        A copy of this curve.
             */
            Clone: function () {
                var curve = new Microsoft.Xna.Framework.Curve();

                curve._keys = this._keys.Clone();
                curve._preLoop = this._preLoop;
                curve._postLoop = this._postLoop;

                return curve;
            },
            /**
             * Evaluate the value at a position of this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Curve
             * @memberof Microsoft.Xna.Framework.Curve
             * @param   {number}    position    The position on this {@link }.
             * @return  {number}                Value at the position on this {@link }.
             */
            Evaluate: function (position) {
                if (this._keys.Count === 0) {
                    return 0.0;
                }

                if (this._keys.Count === 1) {
                    return this._keys.getItem(0).Value;
                }

                var first = this._keys.getItem(0);
                var last = this._keys.getItem(((this._keys.Count - 1) | 0));

                if (position < first.Position) {
                    switch (this.PreLoop) {
                        case Microsoft.Xna.Framework.CurveLoopType.Constant: 
                            return first.Value;
                        case Microsoft.Xna.Framework.CurveLoopType.Linear: 
                            return first.Value - first.TangentIn * (first.Position - position);
                        case Microsoft.Xna.Framework.CurveLoopType.Cycle: 
                            var cycle = this.GetNumberOfCycle(position);
                            var virtualPos = position - (cycle * (last.Position - first.Position));
                            return this.GetCurvePosition(virtualPos);
                        case Microsoft.Xna.Framework.CurveLoopType.CycleOffset: 
                            cycle = this.GetNumberOfCycle(position);
                            virtualPos = position - (cycle * (last.Position - first.Position));
                            return (this.GetCurvePosition(virtualPos) + cycle * (last.Value - first.Value));
                        case Microsoft.Xna.Framework.CurveLoopType.Oscillate: 
                            cycle = this.GetNumberOfCycle(position);
                            if (0 === cycle % 2.0) {
                                virtualPos = position - (cycle * (last.Position - first.Position));
                            } else {
                                virtualPos = last.Position - position + first.Position + (cycle * (last.Position - first.Position));
                            }
                            return this.GetCurvePosition(virtualPos);
                    }
                } else if (position > last.Position) {
                    var cycle1;
                    switch (this.PostLoop) {
                        case Microsoft.Xna.Framework.CurveLoopType.Constant: 
                            return last.Value;
                        case Microsoft.Xna.Framework.CurveLoopType.Linear: 
                            return last.Value + first.TangentOut * (position - last.Position);
                        case Microsoft.Xna.Framework.CurveLoopType.Cycle: 
                            cycle1 = this.GetNumberOfCycle(position);
                            var virtualPos1 = position - (cycle1 * (last.Position - first.Position));
                            return this.GetCurvePosition(virtualPos1);
                        case Microsoft.Xna.Framework.CurveLoopType.CycleOffset: 
                            cycle1 = this.GetNumberOfCycle(position);
                            virtualPos = position - (cycle1 * (last.Position - first.Position));
                            return (this.GetCurvePosition(virtualPos) + cycle1 * (last.Value - first.Value));
                        case Microsoft.Xna.Framework.CurveLoopType.Oscillate: 
                            cycle1 = this.GetNumberOfCycle(position);
                            virtualPos = position - (cycle1 * (last.Position - first.Position));
                            if (0 === cycle1 % 2.0) {
                                virtualPos = position - (cycle1 * (last.Position - first.Position));
                            } else {
                                virtualPos = last.Position - position + first.Position + (cycle1 * (last.Position - first.Position));
                            }
                            return this.GetCurvePosition(virtualPos);
                    }
                }

                return this.GetCurvePosition(position);
            },
            /**
             * Computes tangents for all keys in the collection.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Curve
             * @memberof Microsoft.Xna.Framework.Curve
             * @param   {Microsoft.Xna.Framework.CurveTangent}    tangentType    The tangent type for both in and out.
             * @return  {void}
             */
            ComputeTangents: function (tangentType) {
                this.ComputeTangents$1(tangentType, tangentType);
            },
            /**
             * Computes tangents for all keys in the collection.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Curve
             * @memberof Microsoft.Xna.Framework.Curve
             * @param   {Microsoft.Xna.Framework.CurveTangent}    tangentInType     The tangent in-type. {@link } for more details.
             * @param   {Microsoft.Xna.Framework.CurveTangent}    tangentOutType    The tangent out-type. {@link } for more details.
             * @return  {void}
             */
            ComputeTangents$1: function (tangentInType, tangentOutType) {
                for (var i = 0; i < this.Keys.Count; i = (i + 1) | 0) {
                    this.ComputeTangent$1(i, tangentInType, tangentOutType);
                }
            },
            /**
             * Computes tangent for the specific key in the collection.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Curve
             * @memberof Microsoft.Xna.Framework.Curve
             * @param   {number}                                  keyIndex       The index of a key in the collection.
             * @param   {Microsoft.Xna.Framework.CurveTangent}    tangentType    The tangent type for both in and out.
             * @return  {void}
             */
            ComputeTangent: function (keyIndex, tangentType) {
                this.ComputeTangent$1(keyIndex, tangentType, tangentType);
            },
            /**
             * Computes tangent for the specific key in the collection.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Curve
             * @memberof Microsoft.Xna.Framework.Curve
             * @param   {number}                                  keyIndex          The index of key in the collection.
             * @param   {Microsoft.Xna.Framework.CurveTangent}    tangentInType     The tangent in-type. {@link } for more details.
             * @param   {Microsoft.Xna.Framework.CurveTangent}    tangentOutType    The tangent out-type. {@link } for more details.
             * @return  {void}
             */
            ComputeTangent$1: function (keyIndex, tangentInType, tangentOutType) {

                var key = this._keys.getItem(keyIndex);

                var p0, p, p1;
                p0 = (p = (p1 = key.Position));

                var v0, v, v1;
                v0 = (v = (v1 = key.Value));

                if (keyIndex > 0) {
                    p0 = this._keys.getItem(((keyIndex - 1) | 0)).Position;
                    v0 = this._keys.getItem(((keyIndex - 1) | 0)).Value;
                }

                if (keyIndex < ((this._keys.Count - 1) | 0)) {
                    p1 = this._keys.getItem(((keyIndex + 1) | 0)).Position;
                    v1 = this._keys.getItem(((keyIndex + 1) | 0)).Value;
                }

                switch (tangentInType) {
                    case Microsoft.Xna.Framework.CurveTangent.Flat: 
                        key.TangentIn = 0;
                        break;
                    case Microsoft.Xna.Framework.CurveTangent.Linear: 
                        key.TangentIn = v - v0;
                        break;
                    case Microsoft.Xna.Framework.CurveTangent.Smooth: 
                        var pn = p1 - p0;
                        if (Math.abs(pn) < 1.401298E-45) {
                            key.TangentIn = 0;
                        } else {
                            key.TangentIn = (v1 - v0) * ((p - p0) / pn);
                        }
                        break;
                }

                switch (tangentOutType) {
                    case Microsoft.Xna.Framework.CurveTangent.Flat: 
                        key.TangentOut = 0;
                        break;
                    case Microsoft.Xna.Framework.CurveTangent.Linear: 
                        key.TangentOut = v1 - v;
                        break;
                    case Microsoft.Xna.Framework.CurveTangent.Smooth: 
                        var pn1 = p1 - p0;
                        if (Math.abs(pn1) < 1.401298E-45) {
                            key.TangentOut = 0;
                        } else {
                            key.TangentOut = (v1 - v0) * ((p1 - p) / pn1);
                        }
                        break;
                }
            },
            GetNumberOfCycle: function (position) {
                var cycle = (position - this._keys.getItem(0).Position) / (this._keys.getItem(((this._keys.Count - 1) | 0)).Position - this._keys.getItem(0).Position);
                if (cycle < 0.0) {
                    cycle--;
                }
                return Bridge.Int.clip32(cycle);
            },
            GetCurvePosition: function (position) {
                var prev = this._keys.getItem(0);
                var next;
                for (var i = 1; i < this._keys.Count; i = (i + 1) | 0) {
                    next = this.Keys.getItem(i);
                    if (next.Position >= position) {
                        if (prev.Continuity === Microsoft.Xna.Framework.CurveContinuity.Step) {
                            if (position >= 1.0) {
                                return next.Value;
                            }
                            return prev.Value;
                        }
                        var t = (position - prev.Position) / (next.Position - prev.Position);
                        var ts = t * t;
                        var tss = ts * t;
                        return (2 * tss - 3 * ts + 1.0) * prev.Value + (tss - 2 * ts + t) * prev.TangentOut + (3 * ts - 2 * tss) * next.Value + (tss - ts) * next.TangentIn;
                    }
                    prev = next;
                }
                return 0.0;
            }
        }
    });

    /**
     * Defines the continuity of keys on a {@link }.
     *
     * @public
     * @class Microsoft.Xna.Framework.CurveContinuity
     */
    Bridge.define("Microsoft.Xna.Framework.CurveContinuity", {
        $kind: "enum",
        statics: {
            fields: {
                /**
                 * Interpolation can be used between this key and the next.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.CurveContinuity
                 * @constant
                 * @default 0
                 * @type Microsoft.Xna.Framework.CurveContinuity
                 */
                Smooth: 0,
                /**
                 * Interpolation cannot be used. A position between the two points returns this point.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.CurveContinuity
                 * @constant
                 * @default 1
                 * @type Microsoft.Xna.Framework.CurveContinuity
                 */
                Step: 1
            }
        }
    });

    /**
     * Key point on the {@link }.
     *
     * @public
     * @class Microsoft.Xna.Framework.CurveKey
     * @implements  System.IEquatable$1
     * @implements  System.IComparable$1
     */
    Bridge.define("Microsoft.Xna.Framework.CurveKey", {
        inherits: function () { return [System.IEquatable$1(Microsoft.Xna.Framework.CurveKey),System.IComparable$1(Microsoft.Xna.Framework.CurveKey)]; },
        statics: {
            methods: {
                /**
                 * Compares whether two {@link } instances are not equal.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.CurveKey
                 * @memberof Microsoft.Xna.Framework.CurveKey
                 * @param   {Microsoft.Xna.Framework.CurveKey}    value1    {@link } instance on the left of the not equal sign.
                 * @param   {Microsoft.Xna.Framework.CurveKey}    value2    {@link } instance on the right of the not equal sign.
                 * @return  {boolean}                                       <pre><code>true</code></pre> if the instances are not equal; <pre><code>false</code></pre> otherwise.
                 */
                op_Inequality: function (value1, value2) {
                    return !(Microsoft.Xna.Framework.CurveKey.op_Equality(value1, value2));
                }/**
                 * Compares whether two {@link } instances are equal.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.CurveKey
                 * @memberof Microsoft.Xna.Framework.CurveKey
                 * @param   {Microsoft.Xna.Framework.CurveKey}    value1    {@link } instance on the left of the equal sign.
                 * @param   {Microsoft.Xna.Framework.CurveKey}    value2    {@link } instance on the right of the equal sign.
                 * @return  {boolean}                                       <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
                 */
                ,
                op_Equality: function (value1, value2) {
                    if (Bridge.equals(value1, null)) {
                        return Bridge.equals(value2, null);
                    }

                    if (Bridge.equals(value2, null)) {
                        return Bridge.equals(value1, null);
                    }

                    return (value1._position === value2._position) && (value1._value === value2._value) && (value1._tangentIn === value2._tangentIn) && (value1._tangentOut === value2._tangentOut) && (value1._continuity === value2._continuity);
                }
            }
        },
        fields: {
            _continuity: 0,
            _position: 0,
            _tangentIn: 0,
            _tangentOut: 0,
            _value: 0
        },
        props: {
            /**
             * Gets or sets the indicator whether the segment between this point and the next point on the curve is discrete or continuous.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.CurveKey
             * @function Continuity
             * @type Microsoft.Xna.Framework.CurveContinuity
             */
            Continuity: {
                get: function () {
                    return this._continuity;
                },
                set: function (value) {
                    this._continuity = value;
                }
            },
            /**
             * Gets a position of the key on the curve.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.CurveKey
             * @function Position
             * @type number
             */
            Position: {
                get: function () {
                    return this._position;
                }
            },
            /**
             * Gets or sets a tangent when approaching this point from the previous point on the curve.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.CurveKey
             * @function TangentIn
             * @type number
             */
            TangentIn: {
                get: function () {
                    return this._tangentIn;
                },
                set: function (value) {
                    this._tangentIn = value;
                }
            },
            /**
             * Gets or sets a tangent when leaving this point to the next point on the curve.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.CurveKey
             * @function TangentOut
             * @type number
             */
            TangentOut: {
                get: function () {
                    return this._tangentOut;
                },
                set: function (value) {
                    this._tangentOut = value;
                }
            },
            /**
             * Gets a value of this point.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.CurveKey
             * @function Value
             * @type number
             */
            Value: {
                get: function () {
                    return this._value;
                },
                set: function (value) {
                    this._value = value;
                }
            }
        },
        alias: [
            "compareTo", ["System$IComparable$1$Microsoft$Xna$Framework$CurveKey$compareTo", "System$IComparable$1$compareTo"],
            "equalsT", "System$IEquatable$1$Microsoft$Xna$Framework$CurveKey$equalsT"
        ],
        ctors: {
            /**
             * Creates a new instance of {@link } class with position: 0 and value: 0.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.CurveKey
             * @memberof Microsoft.Xna.Framework.CurveKey
             * @return  {void}
             */
            ctor: function () {
                Microsoft.Xna.Framework.CurveKey.$ctor1.call(this, 0, 0);
            },
            /**
             * Creates a new instance of {@link } class.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.CurveKey
             * @memberof Microsoft.Xna.Framework.CurveKey
             * @param   {number}    position    Position on the curve.
             * @param   {number}    value       Value of the control point.
             * @return  {void}
             */
            $ctor1: function (position, value) {
                Microsoft.Xna.Framework.CurveKey.$ctor3.call(this, position, value, 0, 0, Microsoft.Xna.Framework.CurveContinuity.Smooth);

            },
            /**
             * Creates a new instance of {@link } class.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.CurveKey
             * @memberof Microsoft.Xna.Framework.CurveKey
             * @param   {number}    position      Position on the curve.
             * @param   {number}    value         Value of the control point.
             * @param   {number}    tangentIn     Tangent approaching point from the previous point on the curve.
             * @param   {number}    tangentOut    Tangent leaving point toward next point on the curve.
             * @return  {void}
             */
            $ctor2: function (position, value, tangentIn, tangentOut) {
                Microsoft.Xna.Framework.CurveKey.$ctor3.call(this, position, value, tangentIn, tangentOut, Microsoft.Xna.Framework.CurveContinuity.Smooth);

            },
            /**
             * Creates a new instance of {@link } class.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.CurveKey
             * @memberof Microsoft.Xna.Framework.CurveKey
             * @param   {number}                                     position      Position on the curve.
             * @param   {number}                                     value         Value of the control point.
             * @param   {number}                                     tangentIn     Tangent approaching point from the previous point on the curve.
             * @param   {number}                                     tangentOut    Tangent leaving point toward next point on the curve.
             * @param   {Microsoft.Xna.Framework.CurveContinuity}    continuity    Indicates whether the curve is discrete or continuous.
             * @return  {void}
             */
            $ctor3: function (position, value, tangentIn, tangentOut, continuity) {
                this.$initialize();
                this._position = position;
                this._value = value;
                this._tangentIn = tangentIn;
                this._tangentOut = tangentOut;
                this._continuity = continuity;
            }
        },
        methods: {
            /**
             * Creates a copy of this key.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.CurveKey
             * @memberof Microsoft.Xna.Framework.CurveKey
             * @return  {Microsoft.Xna.Framework.CurveKey}        A copy of this key.
             */
            Clone: function () {
                return new Microsoft.Xna.Framework.CurveKey.$ctor3(this._position, this._value, this._tangentIn, this._tangentOut, this._continuity);
            },
            compareTo: function (other) {
                return Bridge.compare(this._position, other._position);
            },
            equalsT: function (other) {
                return (Microsoft.Xna.Framework.CurveKey.op_Equality(this, other));
            },
            equals: function (obj) {
                return Microsoft.Xna.Framework.CurveKey.op_Inequality((Bridge.as(obj, Microsoft.Xna.Framework.CurveKey)), null) && this.equalsT(Bridge.cast(obj, Microsoft.Xna.Framework.CurveKey));
            },
            getHashCode: function () {
                return System.Single.getHashCode(this._position) ^ System.Single.getHashCode(this._value) ^ System.Single.getHashCode(this._tangentIn) ^ System.Single.getHashCode(this._tangentOut) ^ Bridge.getHashCode(this._continuity);
            }
        }
    });

    /**
     * Defines how the {@link } value is determined for position before first point or after the end point on the {@link }.
     *
     * @public
     * @class Microsoft.Xna.Framework.CurveLoopType
     */
    Bridge.define("Microsoft.Xna.Framework.CurveLoopType", {
        $kind: "enum",
        statics: {
            fields: {
                /**
                 * The value of {@link } will be evaluated as first point for positions before the beginning and end point for positions after the end.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.CurveLoopType
                 * @constant
                 * @default 0
                 * @type Microsoft.Xna.Framework.CurveLoopType
                 */
                Constant: 0,
                /**
                 * The positions will wrap around from the end to beginning of the {@link } for determined the value.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.CurveLoopType
                 * @constant
                 * @default 1
                 * @type Microsoft.Xna.Framework.CurveLoopType
                 */
                Cycle: 1,
                /**
                 * The positions will wrap around from the end to beginning of the {@link }.
                 The value will be offset by the difference between the values of first and end {@link } multiplied by the wrap amount.
                 If the position is before the beginning of the {@link } the difference will be subtracted from its value; otherwise the difference will be added.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.CurveLoopType
                 * @constant
                 * @default 2
                 * @type Microsoft.Xna.Framework.CurveLoopType
                 */
                CycleOffset: 2,
                /**
                 * The value at the end of the {@link } act as an offset from the same side of the {@link } toward the opposite side.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.CurveLoopType
                 * @constant
                 * @default 3
                 * @type Microsoft.Xna.Framework.CurveLoopType
                 */
                Oscillate: 3,
                /**
                 * The linear interpolation will be performed for determined the value.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.CurveLoopType
                 * @constant
                 * @default 4
                 * @type Microsoft.Xna.Framework.CurveLoopType
                 */
                Linear: 4
            }
        }
    });

    /**
     * Defines the different tangent types to be calculated for {@link } points in a {@link }.
     *
     * @public
     * @class Microsoft.Xna.Framework.CurveTangent
     */
    Bridge.define("Microsoft.Xna.Framework.CurveTangent", {
        $kind: "enum",
        statics: {
            fields: {
                /**
                 * The tangent which always has a value equal to zero.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.CurveTangent
                 * @constant
                 * @default 0
                 * @type Microsoft.Xna.Framework.CurveTangent
                 */
                Flat: 0,
                /**
                 * The tangent which contains a difference between current tangent value and the tangent value from the previous {@link }.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.CurveTangent
                 * @constant
                 * @default 1
                 * @type Microsoft.Xna.Framework.CurveTangent
                 */
                Linear: 1,
                /**
                 * The smoouth tangent which contains the inflection between {@link } and {@link } by taking into account the values of both neighbors of the {@link }.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.CurveTangent
                 * @constant
                 * @default 2
                 * @type Microsoft.Xna.Framework.CurveTangent
                 */
                Smooth: 2
            }
        }
    });

    /**
     * Defines the orientation of the display.
     *
     * @public
     * @class Microsoft.Xna.Framework.DisplayOrientation
     */
    Bridge.define("Microsoft.Xna.Framework.DisplayOrientation", {
        $kind: "enum",
        statics: {
            fields: {
                /**
                 * The default orientation.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.DisplayOrientation
                 * @constant
                 * @default 0
                 * @type Microsoft.Xna.Framework.DisplayOrientation
                 */
                Default: 0,
                /**
                 * The display is rotated counterclockwise into a landscape orientation. Width is greater than height.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.DisplayOrientation
                 * @constant
                 * @default 1
                 * @type Microsoft.Xna.Framework.DisplayOrientation
                 */
                LandscapeLeft: 1,
                /**
                 * The display is rotated clockwise into a landscape orientation. Width is greater than height.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.DisplayOrientation
                 * @constant
                 * @default 2
                 * @type Microsoft.Xna.Framework.DisplayOrientation
                 */
                LandscapeRight: 2,
                /**
                 * The display is rotated as portrait, where height is greater than width.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.DisplayOrientation
                 * @constant
                 * @default 4
                 * @type Microsoft.Xna.Framework.DisplayOrientation
                 */
                Portrait: 4,
                /**
                 * The display is rotated as inverted portrait, where height is greater than width.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.DisplayOrientation
                 * @constant
                 * @default 8
                 * @type Microsoft.Xna.Framework.DisplayOrientation
                 */
                PortraitDown: 8,
                /**
                 * Unknown display orientation.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.DisplayOrientation
                 * @constant
                 * @default 16
                 * @type Microsoft.Xna.Framework.DisplayOrientation
                 */
                Unknown: 16
            }
        },
        $flags: true
    });

    Bridge.define("Microsoft.Xna.Framework.IDrawable", {
        $kind: "interface"
    });

    Bridge.define("Microsoft.Xna.Framework.IGameComponent", {
        $kind: "interface"
    });

    /** @namespace System */

    /**
     * @memberof System
     * @callback System.EventHandler
     * @param   {System.Object}    sender    
     * @param   {TEventArgs}       e
     * @return  {void}
     */

    /**
     * Provides helper methods to make it easier
     to safely raise events.
     *
     * @static
     * @abstract
     * @class Microsoft.Xna.Framework.EventHelpers
     */
    Bridge.define("Microsoft.Xna.Framework.EventHelpers", {
        statics: {
            methods: {
                /**
                 * Safely raises an event by storing a copy of the event's delegate
                 in the <b /> parameter and checking it for
                 null before invoking it.
                 *
                 * @static
                 * @this Microsoft.Xna.Framework.EventHelpers
                 * @memberof Microsoft.Xna.Framework.EventHelpers
                 * @param   {Function}               TEventArgs    
                 * @param   {System.Object}          sender        The object raising the event.
                 * @param   {System.EventHandler}    handler       {@link } to be invoked
                 * @param   {TEventArgs}             e             The <b>e</b> passed to {@link }
                 * @return  {void}
                 */
                Raise$1: function (TEventArgs, sender, handler, e) {
                    if (!Bridge.staticEquals(handler, null)) {
                        handler(sender, e);
                    }
                },
                /**
                 * Safely raises an event by storing a copy of the event's delegate
                 in the <b /> parameter and checking it for
                 null before invoking it.
                 *
                 * @static
                 * @this Microsoft.Xna.Framework.EventHelpers
                 * @memberof Microsoft.Xna.Framework.EventHelpers
                 * @param   {System.Object}          sender     The object raising the event.
                 * @param   {System.EventHandler}    handler    {@link } to be invoked
                 * @param   {System.Object}          e          The {@link } passed to {@link }
                 * @return  {void}
                 */
                Raise: function (sender, handler, e) {
                    if (!Bridge.staticEquals(handler, null)) {
                        handler(sender, e);
                    }
                }
            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.Game", {
        fields: {
            _components: null,
            GraphicsDevice: null,
            IsActive: false,
            Content: null,
            IsFixedTimeStep: false,
            gameTime: null,
            timeNow: null,
            t1: null,
            t2: null,
            u1: null,
            u2: null,
            leadingTime: 0,
            timeoutId: 0,
            _targetElapsedTime: null
        },
        props: {
            Components: {
                get: function () {
                    return this._components;
                }
            },
            TargetElapsedTime: {
                get: function () {
                    return this._targetElapsedTime;
                },
                set: function (value) {
                    this._targetElapsedTime = value;
                }
            }
        },
        ctors: {
            init: function () {
                this.timeNow = System.DateTime.getDefaultValue();
                this.t1 = System.DateTime.getDefaultValue();
                this.t2 = System.DateTime.getDefaultValue();
                this.u1 = System.DateTime.getDefaultValue();
                this.u2 = System.DateTime.getDefaultValue();
                this._targetElapsedTime = new System.TimeSpan();
                this.timeoutId = 0;
            },
            ctor: function () {
                this.$initialize();
                this._targetElapsedTime = System.TimeSpan.fromMilliseconds(10.0);
                this.Content = new Microsoft.Xna.Framework.Content.ContentManager.ctor();
                this._components = new Microsoft.Xna.Framework.GameComponentCollection();
            }
        },
        methods: {
            Initialize: function () {
                var $t;
                $t = Bridge.getEnumerator(this._components);
                try {
                    while ($t.moveNext()) {
                        var com = Bridge.cast($t.Current, Microsoft.Xna.Framework.GameComponent);
                        com.Initialize();
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }},
            LoadContent: function () { },
            Update: function (gameTime) {
                var $t;
                $t = Bridge.getEnumerator(this._components);
                try {
                    while ($t.moveNext()) {
                        var com = Bridge.cast($t.Current, Microsoft.Xna.Framework.GameComponent);
                        com.Update(gameTime);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }},
            Draw: function (gameTime) {
                var $t;
                $t = Bridge.getEnumerator(this._components);
                try {
                    while ($t.moveNext()) {
                        var com = Bridge.cast($t.Current, Microsoft.Xna.Framework.DrawableGameComponent);
                        com.Draw(gameTime);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }},
            Run: function () {
                this.IsActive = true;
                this.gameTime = new Microsoft.Xna.Framework.GameTime.ctor();
                this.gameTime.TotalGameTime = new System.TimeSpan(System.Int64(0));
                this.gameTime.ElapsedGameTime = new System.TimeSpan(System.Int64(0));
                this.timeNow = System.DateTime.getNow();
                this.Initialize();
                this.GameLoop();
            },
            GameLoop: function () {
                window.clearTimeout(this.timeoutId);
                if (this.IsActive) {
                    this.gameTime.ElapsedGameTime = System.DateTime.subdd(System.DateTime.getNow(), this.timeNow);
                    this.gameTime.TotalGameTime = System.TimeSpan.add(this.gameTime.TotalGameTime, this.gameTime.ElapsedGameTime);
                    this.timeNow = System.DateTime.getNow();
                    this.t1 = System.DateTime.getNow();
                    if (this.Content.AllResoucesLoaded) {
                        this.u1 = System.DateTime.getNow();
                        this.Update(this.gameTime);
                        this.u2 = System.DateTime.getNow();
                        this.Draw(this.gameTime);
                    }
                    this.t2 = System.DateTime.getNow();
                    this.leadingTime = System.Convert.toInt32(Bridge.box(this._targetElapsedTime.getTotalMilliseconds() - (System.DateTime.subdd(this.t2, this.t1)).getTotalMilliseconds(), System.Double, System.Double.format, System.Double.getHashCode));
                    if (this.leadingTime <= 0) {
                        this.leadingTime = 1;
                    }
                } else {
                    this.timeNow = System.DateTime.getNow();
                    this.leadingTime = 100;
                }
                this.timeoutId = window.setTimeout(Bridge.fn.bind(this, function () {
                    this.GameLoop();
                }), this.leadingTime);

            },
            Exit: function () {

            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.GameComponentCollectionEventArgs", {
        fields: {
            _gameComponent: null
        },
        props: {
            GameComponent: {
                get: function () {
                    return this._gameComponent;
                }
            }
        },
        ctors: {
            ctor: function (gameComponent) {
                this.$initialize();
                System.Object.call(this);
                this._gameComponent = gameComponent;
            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.GamerServices.Gamer");

    Bridge.define("Microsoft.Xna.Framework.GameTime", {
        fields: {
            TotalGameTime: null,
            ElapsedGameTime: null,
            IsRunningSlowly: false
        },
        ctors: {
            init: function () {
                this.TotalGameTime = new System.TimeSpan();
                this.ElapsedGameTime = new System.TimeSpan();
            },
            ctor: function () {
                this.$initialize();
                this.TotalGameTime = System.TimeSpan.zero;
                this.ElapsedGameTime = System.TimeSpan.zero;
                this.IsRunningSlowly = false;
            },
            $ctor1: function (totalGameTime, elapsedGameTime) {
                this.$initialize();
                this.TotalGameTime = totalGameTime;
                this.ElapsedGameTime = elapsedGameTime;
                this.IsRunningSlowly = false;
            },
            $ctor2: function (totalRealTime, elapsedRealTime, isRunningSlowly) {
                this.$initialize();
                this.TotalGameTime = totalRealTime;
                this.ElapsedGameTime = elapsedRealTime;
                this.IsRunningSlowly = isRunningSlowly;
            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.Graphics.Effect", {
        ctors: {
            ctor: function (graphicsDevice) {
                this.$initialize();

            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.Graphics.DrawSpec", {
        fields: {
            transform: null,
            spriteSpecs: null
        }
    });

    Bridge.define("Microsoft.Xna.Framework.Graphics.GraphicsDevice", {
        fields: {
            Viewport: null
        },
        ctors: {
            init: function () {
                this.Viewport = new Microsoft.Xna.Framework.Graphics.Viewport();
            },
            ctor: function () {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Html5.Canvas = document.createElement("canvas");
                Microsoft.Xna.Framework.Graphics.Html5.Canvas.width = window.innerWidth;
                Microsoft.Xna.Framework.Graphics.Html5.Canvas.height = window.innerHeight;
                document.body.appendChild(Microsoft.Xna.Framework.Graphics.Html5.Canvas);
                this.Viewport = new Microsoft.Xna.Framework.Graphics.Viewport.$ctor2(0, 0, Microsoft.Xna.Framework.Graphics.Html5.Canvas.width, Microsoft.Xna.Framework.Graphics.Html5.Canvas.height);
                Microsoft.Xna.Framework.Graphics.Html5.Context = Microsoft.Xna.Framework.Graphics.Html5.Canvas.getContext("2d");
                document.body.setAttribute("style", "margin:0px;overflow:hidden;");
                Microsoft.Xna.Framework.Graphics.Html5.Canvas.onmousedown = function (e) {
                    Microsoft.Xna.Framework.Graphics.Html5.MouseState = new Microsoft.Xna.Framework.Input.MouseState();
                    Microsoft.Xna.Framework.Graphics.Html5.MouseState.LeftButton = Microsoft.Xna.Framework.Input.ButtonState.Pressed;
                    Microsoft.Xna.Framework.Graphics.Html5.MouseState.Position = new Microsoft.Xna.Framework.Point.$ctor2(e.clientX, e.clientY);
                };
                Microsoft.Xna.Framework.Graphics.Html5.Canvas.onmouseup = function (e) {
                    Microsoft.Xna.Framework.Graphics.Html5.MouseState = new Microsoft.Xna.Framework.Input.MouseState();
                    Microsoft.Xna.Framework.Graphics.Html5.MouseState.LeftButton = Microsoft.Xna.Framework.Input.ButtonState.Released;
                    Microsoft.Xna.Framework.Graphics.Html5.MouseState.Position = new Microsoft.Xna.Framework.Point.$ctor2(e.clientX, e.clientY);
                };
                document.body.ontouchstart = function (e) {
                    e.preventDefault();
                };
                Microsoft.Xna.Framework.Graphics.Html5.Canvas.ontouchstart = function (e) {
                    var $t;
                    e.preventDefault();
                    Microsoft.Xna.Framework.Graphics.Html5.Touches.clear();
                    $t = Bridge.getEnumerator(e.touches);
                    try {
                        while ($t.moveNext()) {
                            var touch = $t.Current;
                            var loc = new Microsoft.Xna.Framework.Input.Touch.TouchLocation.$ctor1(0, Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Pressed, new Microsoft.Xna.Framework.Vector2.$ctor2(touch.clientX, touch.clientY));
                            Microsoft.Xna.Framework.Graphics.Html5.Touches.add(loc.$clone());
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }};
                Microsoft.Xna.Framework.Graphics.Html5.Canvas.ontouchmove = function (e) {
                    var $t;
                    e.preventDefault();
                    if (Microsoft.Xna.Framework.Input.Touch.TouchPanel.didPress) {
                        Microsoft.Xna.Framework.Graphics.Html5.Touches.clear();
                        $t = Bridge.getEnumerator(e.touches);
                        try {
                            while ($t.moveNext()) {
                                var touch = $t.Current;
                                var loc = new Microsoft.Xna.Framework.Input.Touch.TouchLocation.$ctor1(0, Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Moved, new Microsoft.Xna.Framework.Vector2.$ctor2(touch.clientX, touch.clientY));
                                Microsoft.Xna.Framework.Graphics.Html5.Touches.add(loc.$clone());
                            }
                        } finally {
                            if (Bridge.is($t, System.IDisposable)) {
                                $t.System$IDisposable$Dispose();
                            }
                        }}
                };
                Microsoft.Xna.Framework.Graphics.Html5.Canvas.ontouchend = function (e) {
                    var $t;
                    e.preventDefault();
                    var locs = new (System.Collections.Generic.List$1(Microsoft.Xna.Framework.Input.Touch.TouchLocation)).ctor();
                    $t = Bridge.getEnumerator(Microsoft.Xna.Framework.Graphics.Html5.Touches);
                    try {
                        while ($t.moveNext()) {
                            var touch = $t.Current.$clone();
                            var loc = new Microsoft.Xna.Framework.Input.Touch.TouchLocation.$ctor1(0, Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Released, new Microsoft.Xna.Framework.Vector2.$ctor2(touch.Position.X, touch.Position.Y));
                            locs.add(loc.$clone());
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }Microsoft.Xna.Framework.Graphics.Html5.Touches.clear();
                    Microsoft.Xna.Framework.Graphics.Html5.Touches = locs;
                };
                Microsoft.Xna.Framework.Graphics.Html5.Canvas.ontouchleave = function (e) {
                    var $t;
                    e.preventDefault();
                    var locs = new (System.Collections.Generic.List$1(Microsoft.Xna.Framework.Input.Touch.TouchLocation)).ctor();
                    $t = Bridge.getEnumerator(Microsoft.Xna.Framework.Graphics.Html5.Touches);
                    try {
                        while ($t.moveNext()) {
                            var touch = $t.Current.$clone();
                            var loc = new Microsoft.Xna.Framework.Input.Touch.TouchLocation.$ctor1(0, Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Released, new Microsoft.Xna.Framework.Vector2.$ctor2(touch.Position.X, touch.Position.Y));
                            locs.add(loc.$clone());
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }Microsoft.Xna.Framework.Graphics.Html5.Touches.clear();
                    Microsoft.Xna.Framework.Graphics.Html5.Touches = locs;
                };
                window.onresize = Bridge.fn.bind(this, function (e) {
                    Microsoft.Xna.Framework.Graphics.Html5.Canvas.width = window.innerWidth;
                    Microsoft.Xna.Framework.Graphics.Html5.Canvas.height = window.innerHeight;
                    this.Viewport = new Microsoft.Xna.Framework.Graphics.Viewport.$ctor2(0, 0, Microsoft.Xna.Framework.Graphics.Html5.Canvas.width, Microsoft.Xna.Framework.Graphics.Html5.Canvas.height);
                    try {
                        Microsoft.Xna.Framework.Graphics.Html5.OnResize();
                    }
                    catch ($e1) {
                        $e1 = System.Exception.create($e1);
                    }
                });
            }
        },
        methods: {
            Clear: function (color) {
                Microsoft.Xna.Framework.Graphics.Html5.Context.fillStyle = "#" + (System.UInt32.format(color.PackedValue, "X") || "");
                Microsoft.Xna.Framework.Graphics.Html5.Context.fillRect(0, 0, Microsoft.Xna.Framework.Graphics.Html5.Canvas.width, Microsoft.Xna.Framework.Graphics.Html5.Canvas.height);
            },
            Draw: function (spec) {
                var $t;
                if (System.Nullable.liftne(Microsoft.Xna.Framework.Matrix.op_Inequality, System.Nullable.lift1("$clone", spec.transform), null)) {
                }

                $t = Bridge.getEnumerator(spec.spriteSpecs);
                try {
                    while ($t.moveNext()) {
                        var sprite = $t.Current;
                        Microsoft.Xna.Framework.Graphics.Html5.Context.save();
                        Microsoft.Xna.Framework.Graphics.Html5.Context.translate(sprite.position.X, sprite.position.Y);
                        Microsoft.Xna.Framework.Graphics.Html5.Context.rotate(sprite.rotation);
                        var dx = -sprite.origin.X * (sprite.useVScale ? sprite.vScale.X : sprite.scale);
                        var dy = -sprite.origin.Y * (sprite.useVScale ? sprite.vScale.Y : sprite.scale);
                        var dw = sprite.texture.Width * (sprite.useVScale ? sprite.vScale.X : sprite.scale);
                        var dh = sprite.texture.Height * (sprite.useVScale ? sprite.vScale.Y : sprite.scale);
                        Microsoft.Xna.Framework.Graphics.Html5.Context.drawImage(sprite.texture.Image, dx, dy, dw, dh);
                        Microsoft.Xna.Framework.Graphics.Html5.Context.restore();
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                if (System.Nullable.liftne(Microsoft.Xna.Framework.Matrix.op_Inequality, System.Nullable.lift1("$clone", spec.transform), null)) {
                }
            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.Graphics.Html5", {
        statics: {
            fields: {
                Canvas: null,
                Context: null,
                MouseState: null,
                Touches: null,
                OnResize: null
            },
            ctors: {
                init: function () {
                    this.Touches = new (System.Collections.Generic.List$1(Microsoft.Xna.Framework.Input.Touch.TouchLocation)).ctor();
                }
            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.Graphics.RenderTarget2D");

    Bridge.define("Microsoft.Xna.Framework.Graphics.SpriteBatch", {
        fields: {
            drawSpecs: null,
            _graphicDevice: null
        },
        ctors: {
            ctor: function (graphicDevice) {
                this.$initialize();
                this._graphicDevice = graphicDevice;
                this.drawSpecs = new Microsoft.Xna.Framework.Graphics.DrawSpec();
                this.drawSpecs.spriteSpecs = new (System.Collections.Generic.List$1(Microsoft.Xna.Framework.Graphics.SpriteSpec)).ctor();
            }
        },
        methods: {
            Draw$1: function (texture, position, sourceRectangle, color, rotation, origin, scale, effects, layerDepth) {
                var $t;
                this.drawSpecs.spriteSpecs.add(($t = new Microsoft.Xna.Framework.Graphics.SpriteSpec(), $t.texture = texture, $t.position = position.$clone(), $t.color = color.$clone(), $t.rotation = rotation, $t.origin = origin.$clone(), $t.scale = scale, $t.useVScale = false, $t));
            },
            Draw: function (texture, position, sourceRectangle, color, rotation, origin, scale, effects, layerDepth) {
                var $t;
                this.drawSpecs.spriteSpecs.add(($t = new Microsoft.Xna.Framework.Graphics.SpriteSpec(), $t.texture = texture, $t.position = position.$clone(), $t.rectangle = System.Nullable.lift1("$clone", sourceRectangle), $t.color = color.$clone(), $t.rotation = rotation, $t.origin = origin.$clone(), $t.vScale = scale.$clone(), $t.useVScale = true, $t));
            },
            Begin: function () {

            },
            Begin$1: function (sortMode, blendState, samplerState, depthStencilState, rasterizerState, effect, transformMatrix) {
                if (sortMode === void 0) { sortMode = 0; }
                if (blendState === void 0) { blendState = null; }
                if (samplerState === void 0) { samplerState = null; }
                if (depthStencilState === void 0) { depthStencilState = null; }
                if (rasterizerState === void 0) { rasterizerState = null; }
                if (effect === void 0) { effect = null; }
                if (transformMatrix === void 0) { transformMatrix = null; }
                this.drawSpecs.transform = System.Nullable.lift1("$clone", transformMatrix);
                this.drawSpecs.spriteSpecs.clear();
            },
            DrawString: function (spriteFont, text, position, color, rotation, origin, scale, effects, layerDepth) {

            },
            End: function () {
                this._graphicDevice.Draw(this.drawSpecs);
            }
        }
    });

    /** @namespace Microsoft.Xna.Framework.Graphics */

    /**
     * Defines sprite visual options for mirroring.
     *
     * @public
     * @class Microsoft.Xna.Framework.Graphics.SpriteEffects
     */
    Bridge.define("Microsoft.Xna.Framework.Graphics.SpriteEffects", {
        $kind: "enum",
        statics: {
            fields: {
                /**
                 * No options specified.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SpriteEffects
                 * @constant
                 * @default 0
                 * @type Microsoft.Xna.Framework.Graphics.SpriteEffects
                 */
                None: 0,
                /**
                 * Render the sprite reversed along the X axis.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SpriteEffects
                 * @constant
                 * @default 1
                 * @type Microsoft.Xna.Framework.Graphics.SpriteEffects
                 */
                FlipHorizontally: 1,
                /**
                 * Render the sprite reversed along the Y axis.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SpriteEffects
                 * @constant
                 * @default 2
                 * @type Microsoft.Xna.Framework.Graphics.SpriteEffects
                 */
                FlipVertically: 2
            }
        },
        $flags: true
    });

    Bridge.define("Microsoft.Xna.Framework.Graphics.SpriteFont", {
        methods: {
            MeasureString: function (str) {
                throw new System.NotImplementedException.ctor();
            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.Graphics.SpriteSpec", {
        fields: {
            texture: null,
            position: null,
            rectangle: null,
            color: null,
            rotation: 0,
            origin: null,
            scale: 0,
            vScale: null,
            useVScale: false
        },
        ctors: {
            init: function () {
                this.position = new Microsoft.Xna.Framework.Vector2();
                this.color = new Microsoft.Xna.Framework.Color();
                this.origin = new Microsoft.Xna.Framework.Vector2();
                this.vScale = new Microsoft.Xna.Framework.Vector2();
            }
        }
    });

    /**
     * Defines types of surface formats.
     *
     * @public
     * @class Microsoft.Xna.Framework.Graphics.SurfaceFormat
     */
    Bridge.define("Microsoft.Xna.Framework.Graphics.SurfaceFormat", {
        $kind: "enum",
        statics: {
            fields: {
                /**
                 * Unsigned 32-bit ARGB pixel format for store 8 bits per channel.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 0
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                Color: 0,
                /**
                 * Unsigned 16-bit BGR pixel format for store 5 bits for blue, 6 bits for green, and 5 bits for red.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 1
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                Bgr565: 1,
                /**
                 * Unsigned 16-bit BGRA pixel format where 5 bits reserved for each color and last bit is reserved for alpha.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 2
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                Bgra5551: 2,
                /**
                 * Unsigned 16-bit BGRA pixel format for store 4 bits per channel.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 3
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                Bgra4444: 3,
                /**
                 * DXT1. Texture format with compression. Surface dimensions must be a multiple 4.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 4
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                Dxt1: 4,
                /**
                 * DXT3. Texture format with compression. Surface dimensions must be a multiple 4.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 5
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                Dxt3: 5,
                /**
                 * DXT5. Texture format with compression. Surface dimensions must be a multiple 4.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 6
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                Dxt5: 6,
                /**
                 * Signed 16-bit bump-map format for store 8 bits for <pre><code>u</code></pre> and <pre><code>v</code></pre> data.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 7
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                NormalizedByte2: 7,
                /**
                 * Signed 32-bit bump-map format for store 8 bits per channel.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 8
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                NormalizedByte4: 8,
                /**
                 * Unsigned 32-bit RGBA pixel format for store 10 bits for each color and 2 bits for alpha.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 9
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                Rgba1010102: 9,
                /**
                 * Unsigned 32-bit RG pixel format using 16 bits per channel.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 10
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                Rg32: 10,
                /**
                 * Unsigned 64-bit RGBA pixel format using 16 bits per channel.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 11
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                Rgba64: 11,
                /**
                 * Unsigned A 8-bit format for store 8 bits to alpha channel.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 12
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                Alpha8: 12,
                /**
                 * IEEE 32-bit R float format for store 32 bits to red channel.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 13
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                Single: 13,
                /**
                 * IEEE 64-bit RG float format for store 32 bits per channel.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 14
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                Vector2: 14,
                /**
                 * IEEE 128-bit RGBA float format for store 32 bits per channel.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 15
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                Vector4: 15,
                /**
                 * Float 16-bit R format for store 16 bits to red channel.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 16
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                HalfSingle: 16,
                /**
                 * Float 32-bit RG format for store 16 bits per channel.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 17
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                HalfVector2: 17,
                /**
                 * Float 64-bit ARGB format for store 16 bits per channel.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 18
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                HalfVector4: 18,
                /**
                 * Float pixel format for high dynamic range data.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 19
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                HdrBlendable: 19,
                /**
                 * For compatibility with WPF D3DImage.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 20
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                Bgr32: 20,
                /**
                 * For compatibility with WPF D3DImage.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 21
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                Bgra32: 21,
                /**
                 * Unsigned 32-bit RGBA sRGB pixel format that supports 8 bits per channel.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 30
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                ColorSRgb: 30,
                /**
                 * Unsigned 32-bit sRGB pixel format that supports 8 bits per channel. 8 bits are unused.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 31
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                Bgr32SRgb: 31,
                /**
                 * Unsigned 32-bit sRGB pixel format that supports 8 bits per channel.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 32
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                Bgra32SRgb: 32,
                /**
                 * DXT1. sRGB texture format with compression. Surface dimensions must be a multiple of 4.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 33
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                Dxt1SRgb: 33,
                /**
                 * DXT3. sRGB texture format with compression. Surface dimensions must be a multiple of 4.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 34
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                Dxt3SRgb: 34,
                /**
                 * DXT5. sRGB texture format with compression. Surface dimensions must be a multiple of 4.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 35
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                Dxt5SRgb: 35,
                /**
                 * PowerVR texture compression format (iOS and Android).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 50
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                RgbPvrtc2Bpp: 50,
                /**
                 * PowerVR texture compression format (iOS and Android).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 51
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                RgbPvrtc4Bpp: 51,
                /**
                 * PowerVR texture compression format (iOS and Android).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 52
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                RgbaPvrtc2Bpp: 52,
                /**
                 * PowerVR texture compression format (iOS and Android).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 53
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                RgbaPvrtc4Bpp: 53,
                /**
                 * Ericcson Texture Compression (Android)
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 60
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                RgbEtc1: 60,
                /**
                 * DXT1 version where 1-bit alpha is used.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 70
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                Dxt1a: 70,
                /**
                 * ATC/ATITC compression (Android)
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 80
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                RgbaAtcExplicitAlpha: 80,
                /**
                 * ATC/ATITC compression (Android)
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 * @constant
                 * @default 81
                 * @type Microsoft.Xna.Framework.Graphics.SurfaceFormat
                 */
                RgbaAtcInterpolatedAlpha: 81
            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.Graphics.VertexPositionColor", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new Microsoft.Xna.Framework.Graphics.VertexPositionColor(); }
            }
        },
        methods: {
            $clone: function (to) { return this; }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.Graphics.VertexPositionColorTexture", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new Microsoft.Xna.Framework.Graphics.VertexPositionColorTexture(); }
            }
        },
        fields: {
            Position: null,
            Color: null,
            TextureCoordinate: null
        },
        ctors: {
            init: function () {
                this.Position = new Microsoft.Xna.Framework.Vector3();
                this.Color = new Microsoft.Xna.Framework.Color();
                this.TextureCoordinate = new Microsoft.Xna.Framework.Vector2();
            },
            $ctor1: function (position, color, textureCoordinate) {
                this.$initialize();
                this.Position = position.$clone();
                this.Color = color.$clone();
                this.TextureCoordinate = textureCoordinate.$clone();
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([10844504800, this.Position, this.Color, this.TextureCoordinate]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Microsoft.Xna.Framework.Graphics.VertexPositionColorTexture)) {
                    return false;
                }
                return Bridge.equals(this.Position, o.Position) && Bridge.equals(this.Color, o.Color) && Bridge.equals(this.TextureCoordinate, o.TextureCoordinate);
            },
            $clone: function (to) {
                var s = to || new Microsoft.Xna.Framework.Graphics.VertexPositionColorTexture();
                s.Position = this.Position.$clone();
                s.Color = this.Color.$clone();
                s.TextureCoordinate = this.TextureCoordinate.$clone();
                return s;
            }
        }
    });

    /**
     * Describes the view bounds for render-target surface.
     *
     * @public
     * @class Microsoft.Xna.Framework.Graphics.Viewport
     */
    Bridge.define("Microsoft.Xna.Framework.Graphics.Viewport", {
        $kind: "struct",
        statics: {
            methods: {
                WithinEpsilon: function (a, b) {
                    var num = a - b;
                    return ((-1.401298E-45 <= num) && (num <= 1.401298E-45));
                },
                getDefaultValue: function () { return new Microsoft.Xna.Framework.Graphics.Viewport(); }
            }
        },
        fields: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            minDepth: 0,
            maxDepth: 0
        },
        props: {
            /**
             * The height of the bounds in pixels.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Graphics.Viewport
             * @function Height
             * @type number
             */
            Height: {
                get: function () {
                    return this.height;
                },
                set: function (value) {
                    this.height = value;
                }
            },
            /**
             * The upper limit of depth of this viewport.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Graphics.Viewport
             * @function MaxDepth
             * @type number
             */
            MaxDepth: {
                get: function () {
                    return this.maxDepth;
                },
                set: function (value) {
                    this.maxDepth = value;
                }
            },
            /**
             * The lower limit of depth of this viewport.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Graphics.Viewport
             * @function MinDepth
             * @type number
             */
            MinDepth: {
                get: function () {
                    return this.minDepth;
                },
                set: function (value) {
                    this.minDepth = value;
                }
            },
            /**
             * The width of the bounds in pixels.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Graphics.Viewport
             * @function Width
             * @type number
             */
            Width: {
                get: function () {
                    return this.width;
                },
                set: function (value) {
                    this.width = value;
                }
            },
            /**
             * The y coordinate of the beginning of this viewport.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Graphics.Viewport
             * @function Y
             * @type number
             */
            Y: {
                get: function () {
                    return this.y;

                },
                set: function (value) {
                    this.y = value;
                }
            },
            /**
             * The x coordinate of the beginning of this viewport.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Graphics.Viewport
             * @function X
             * @type number
             */
            X: {
                get: function () {
                    return this.x;
                },
                set: function (value) {
                    this.x = value;
                }
            },
            /**
             * Gets the aspect ratio of this {@link }, which is width / height.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.Graphics.Viewport
             * @function AspectRatio
             * @type number
             */
            AspectRatio: {
                get: function () {
                    if ((this.height !== 0) && (this.width !== 0)) {
                        return (this.width / this.height);
                    }
                    return 0.0;
                }
            },
            /**
             * Gets or sets a boundary of this {@link }.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Graphics.Viewport
             * @function Bounds
             * @type Microsoft.Xna.Framework.Rectangle
             */
            Bounds: {
                get: function () {
                    return new Microsoft.Xna.Framework.Rectangle.$ctor2(this.x, this.y, this.width, this.height);
                },
                set: function (value) {
                    this.x = value.X;
                    this.y = value.Y;
                    this.width = value.Width;
                    this.height = value.Height;
                }
            }
        },
        ctors: {
            /**
             * Constructs a viewport from the given values. The {@link } will be 0.0 and {@link } will be 1.0.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Graphics.Viewport
             * @memberof Microsoft.Xna.Framework.Graphics.Viewport
             * @param   {number}    x         The x coordinate of the upper-left corner of the view bounds in pixels.
             * @param   {number}    y         The y coordinate of the upper-left corner of the view bounds in pixels.
             * @param   {number}    width     The width of the view bounds in pixels.
             * @param   {number}    height    The height of the view bounds in pixels.
             * @return  {void}
             */
            $ctor2: function (x, y, width, height) {
                this.$initialize();
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                this.minDepth = 0.0;
                this.maxDepth = 1.0;
            },
            /**
             * Constructs a viewport from the given values.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Graphics.Viewport
             * @memberof Microsoft.Xna.Framework.Graphics.Viewport
             * @param   {number}    x           The x coordinate of the upper-left corner of the view bounds in pixels.
             * @param   {number}    y           The y coordinate of the upper-left corner of the view bounds in pixels.
             * @param   {number}    width       The width of the view bounds in pixels.
             * @param   {number}    height      The height of the view bounds in pixels.
             * @param   {number}    minDepth    The lower limit of depth.
             * @param   {number}    maxDepth    The upper limit of depth.
             * @return  {void}
             */
            $ctor3: function (x, y, width, height, minDepth, maxDepth) {
                this.$initialize();
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                this.minDepth = minDepth;
                this.maxDepth = maxDepth;
            },
            /**
             * Creates a new instance of {@link } struct.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Graphics.Viewport
             * @memberof Microsoft.Xna.Framework.Graphics.Viewport
             * @param   {Microsoft.Xna.Framework.Rectangle}    bounds    A {@link } that defines the location and size of the {@link } in a render target.
             * @return  {void}
             */
            $ctor1: function (bounds) {
                Microsoft.Xna.Framework.Graphics.Viewport.$ctor2.call(this, bounds.X, bounds.Y, bounds.Width, bounds.Height);
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Projects a {@link } from world space into screen space.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Graphics.Viewport
             * @memberof Microsoft.Xna.Framework.Graphics.Viewport
             * @param   {Microsoft.Xna.Framework.Vector3}    source        The {@link } to project.
             * @param   {Microsoft.Xna.Framework.Matrix}     projection    The projection {@link }.
             * @param   {Microsoft.Xna.Framework.Matrix}     view          The view {@link }.
             * @param   {Microsoft.Xna.Framework.Matrix}     world         The world {@link }.
             * @return  {Microsoft.Xna.Framework.Vector3}
             */
            Project: function (source, projection, view, world) {
                var matrix = Microsoft.Xna.Framework.Matrix.Multiply(Microsoft.Xna.Framework.Matrix.Multiply(world.$clone(), view.$clone()), projection.$clone());
                var vector = Microsoft.Xna.Framework.Vector3.Transform(source.$clone(), matrix.$clone());
                var a = (((source.X * matrix.M14) + (source.Y * matrix.M24)) + (source.Z * matrix.M34)) + matrix.M44;
                if (!Microsoft.Xna.Framework.Graphics.Viewport.WithinEpsilon(a, 1.0)) {
                    vector.X = vector.X / a;
                    vector.Y = vector.Y / a;
                    vector.Z = vector.Z / a;
                }
                vector.X = (((vector.X + 1.0) * 0.5) * this.width) + this.x;
                vector.Y = (((-vector.Y + 1.0) * 0.5) * this.height) + this.y;
                vector.Z = (vector.Z * (this.maxDepth - this.minDepth)) + this.minDepth;
                return vector.$clone();
            },
            /**
             * Unprojects a {@link } from screen space into world space.
             Note source.Z must be less than or equal to MaxDepth.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Graphics.Viewport
             * @memberof Microsoft.Xna.Framework.Graphics.Viewport
             * @param   {Microsoft.Xna.Framework.Vector3}    source        The {@link } to unproject.
             * @param   {Microsoft.Xna.Framework.Matrix}     projection    The projection {@link }.
             * @param   {Microsoft.Xna.Framework.Matrix}     view          The view {@link }.
             * @param   {Microsoft.Xna.Framework.Matrix}     world         The world {@link }.
             * @return  {Microsoft.Xna.Framework.Vector3}
             */
            Unproject: function (source, projection, view, world) {
                var matrix = Microsoft.Xna.Framework.Matrix.Invert(Microsoft.Xna.Framework.Matrix.Multiply(Microsoft.Xna.Framework.Matrix.Multiply(world.$clone(), view.$clone()), projection.$clone()));
                source.X = (((source.X - this.x) / this.width) * 2.0) - 1.0;
                source.Y = -((((source.Y - this.y) / this.height) * 2.0) - 1.0);
                source.Z = (source.Z - this.minDepth) / (this.maxDepth - this.minDepth);
                var vector = Microsoft.Xna.Framework.Vector3.Transform(source.$clone(), matrix.$clone());
                var a = (((source.X * matrix.M14) + (source.Y * matrix.M24)) + (source.Z * matrix.M34)) + matrix.M44;
                if (!Microsoft.Xna.Framework.Graphics.Viewport.WithinEpsilon(a, 1.0)) {
                    vector.X = vector.X / a;
                    vector.Y = vector.Y / a;
                    vector.Z = vector.Z / a;
                }
                return vector.$clone();

            },
            /**
             * Returns a {@link } representation of this {@link } in the format:
             {X:[{@link }] Y:[{@link }] Width:[{@link }] Height:[{@link }] MinDepth:[{@link }] MaxDepth:[{@link }]}
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.Graphics.Viewport
             * @memberof Microsoft.Xna.Framework.Graphics.Viewport
             * @return  {string}        A {@link } representation of this {@link }.
             */
            toString: function () {
                return "{X:" + this.x + " Y:" + this.y + " Width:" + this.width + " Height:" + this.height + " MinDepth:" + System.Single.format(this.minDepth) + " MaxDepth:" + System.Single.format(this.maxDepth) + "}";
            },
            getHashCode: function () {
                var h = Bridge.addHash([3956791494, this.x, this.y, this.width, this.height, this.minDepth, this.maxDepth]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Microsoft.Xna.Framework.Graphics.Viewport)) {
                    return false;
                }
                return Bridge.equals(this.x, o.x) && Bridge.equals(this.y, o.y) && Bridge.equals(this.width, o.width) && Bridge.equals(this.height, o.height) && Bridge.equals(this.minDepth, o.minDepth) && Bridge.equals(this.maxDepth, o.maxDepth);
            },
            $clone: function (to) {
                var s = to || new Microsoft.Xna.Framework.Graphics.Viewport();
                s.x = this.x;
                s.y = this.y;
                s.width = this.width;
                s.height = this.height;
                s.minDepth = this.minDepth;
                s.maxDepth = this.maxDepth;
                return s;
            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.GraphicsDeviceManager", {
        fields: {
            PreferMultiSampling: false,
            SupportedOrientations: 0,
            PreferredBackBufferFormat: 0,
            IsFullScreen: false
        },
        events: {
            PreparingDeviceSettings: null
        },
        ctors: {
            ctor: function (game) {
                this.$initialize();
                game.GraphicsDevice = new Microsoft.Xna.Framework.Graphics.GraphicsDevice();
            }
        },
        methods: {
            ApplyChanges: function () {

            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.Input.ButtonState", {
        $kind: "enum",
        statics: {
            fields: {
                Pressed: 0,
                Released: 1
            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.Input.Mouse", {
        statics: {
            methods: {
                GetState: function () {
                    var mouse = new Microsoft.Xna.Framework.Input.MouseState();
                    if (Microsoft.Xna.Framework.Graphics.Html5.MouseState != null) {
                        mouse = Microsoft.Xna.Framework.Graphics.Html5.MouseState;
                    }
                    return mouse;
                }
            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.Input.MouseState", {
        fields: {
            LeftButton: 0,
            Position: null
        },
        ctors: {
            init: function () {
                this.Position = new Microsoft.Xna.Framework.Point();
            }
        }
    });

    /** @namespace Microsoft.Xna.Framework.Input.Touch */

    /**
     * Represents data from a multi-touch gesture over a span of time.
     *
     * @public
     * @class Microsoft.Xna.Framework.Input.Touch.GestureSample
     */
    Bridge.define("Microsoft.Xna.Framework.Input.Touch.GestureSample", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new Microsoft.Xna.Framework.Input.Touch.GestureSample(); }
            }
        },
        fields: {
            _gestureType: 0,
            _timestamp: null,
            _position: null,
            _position2: null,
            _delta: null,
            _delta2: null
        },
        props: {
            /**
             * Gets the type of the gesture.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.Input.Touch.GestureSample
             * @function GestureType
             * @type Microsoft.Xna.Framework.Input.Touch.GestureType
             */
            GestureType: {
                get: function () {
                    return this._gestureType;
                }
            },
            /**
             * Gets the starting time for this multi-touch gesture sample.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.Input.Touch.GestureSample
             * @function Timestamp
             * @type System.TimeSpan
             */
            Timestamp: {
                get: function () {
                    return this._timestamp;
                }
            },
            /**
             * Gets the position of the first touch-point in the gesture sample.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.Input.Touch.GestureSample
             * @function Position
             * @type Microsoft.Xna.Framework.Vector2
             */
            Position: {
                get: function () {
                    return this._position.$clone();
                }
            },
            /**
             * Gets the position of the second touch-point in the gesture sample.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.Input.Touch.GestureSample
             * @function Position2
             * @type Microsoft.Xna.Framework.Vector2
             */
            Position2: {
                get: function () {
                    return this._position2.$clone();
                }
            },
            /**
             * Gets the delta information for the first touch-point in the gesture sample.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.Input.Touch.GestureSample
             * @function Delta
             * @type Microsoft.Xna.Framework.Vector2
             */
            Delta: {
                get: function () {
                    return this._delta.$clone();
                }
            },
            /**
             * Gets the delta information for the second touch-point in the gesture sample.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.Input.Touch.GestureSample
             * @function Delta2
             * @type Microsoft.Xna.Framework.Vector2
             */
            Delta2: {
                get: function () {
                    return this._delta2.$clone();
                }
            }
        },
        ctors: {
            init: function () {
                this._timestamp = new System.TimeSpan();
                this._position = new Microsoft.Xna.Framework.Vector2();
                this._position2 = new Microsoft.Xna.Framework.Vector2();
                this._delta = new Microsoft.Xna.Framework.Vector2();
                this._delta2 = new Microsoft.Xna.Framework.Vector2();
            },
            /**
             * Initializes a new {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Input.Touch.GestureSample
             * @memberof Microsoft.Xna.Framework.Input.Touch.GestureSample
             * @param   {Microsoft.Xna.Framework.Input.Touch.GestureType}    gestureType    {@link }
             * @param   {System.TimeSpan}                                    timestamp      
             * @param   {Microsoft.Xna.Framework.Vector2}                    position       
             * @param   {Microsoft.Xna.Framework.Vector2}                    position2      
             * @param   {Microsoft.Xna.Framework.Vector2}                    delta          
             * @param   {Microsoft.Xna.Framework.Vector2}                    delta2
             * @return  {void}
             */
            $ctor1: function (gestureType, timestamp, position, position2, delta, delta2) {
                this.$initialize();
                this._gestureType = gestureType;
                this._timestamp = timestamp;
                this._position = position.$clone();
                this._position2 = position2.$clone();
                this._delta = delta.$clone();
                this._delta2 = delta2.$clone();
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([5172184450, this._gestureType, this._timestamp, this._position, this._position2, this._delta, this._delta2]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Microsoft.Xna.Framework.Input.Touch.GestureSample)) {
                    return false;
                }
                return Bridge.equals(this._gestureType, o._gestureType) && Bridge.equals(this._timestamp, o._timestamp) && Bridge.equals(this._position, o._position) && Bridge.equals(this._position2, o._position2) && Bridge.equals(this._delta, o._delta) && Bridge.equals(this._delta2, o._delta2);
            },
            $clone: function (to) {
                var s = to || new Microsoft.Xna.Framework.Input.Touch.GestureSample();
                s._gestureType = this._gestureType;
                s._timestamp = this._timestamp;
                s._position = this._position.$clone();
                s._position2 = this._position2.$clone();
                s._delta = this._delta.$clone();
                s._delta2 = this._delta2.$clone();
                return s;
            }
        }
    });

    /**
     * Enumuration of values that represent different gestures that can be processed by {@link }.
     *
     * @public
     * @class Microsoft.Xna.Framework.Input.Touch.GestureType
     */
    Bridge.define("Microsoft.Xna.Framework.Input.Touch.GestureType", {
        $kind: "enum",
        statics: {
            fields: {
                /**
                 * No gestures.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Input.Touch.GestureType
                 * @constant
                 * @default 0
                 * @type Microsoft.Xna.Framework.Input.Touch.GestureType
                 */
                None: 0,
                /**
                 * The user touched a single point.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Input.Touch.GestureType
                 * @constant
                 * @default 1
                 * @type Microsoft.Xna.Framework.Input.Touch.GestureType
                 */
                Tap: 1,
                /**
                 * States completion of a drag gesture(VerticalDrag, HorizontalDrag, or FreeDrag).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Input.Touch.GestureType
                 * @constant
                 * @default 2
                 * @type Microsoft.Xna.Framework.Input.Touch.GestureType
                 */
                DragComplete: 2,
                /**
                 * States that a touch was combined with a quick swipe.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Input.Touch.GestureType
                 * @constant
                 * @default 4
                 * @type Microsoft.Xna.Framework.Input.Touch.GestureType
                 */
                Flick: 4,
                /**
                 * The use touched a point and then performed a free-form drag.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Input.Touch.GestureType
                 * @constant
                 * @default 8
                 * @type Microsoft.Xna.Framework.Input.Touch.GestureType
                 */
                FreeDrag: 8,
                /**
                 * The use touched a single point for approximately one second.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Input.Touch.GestureType
                 * @constant
                 * @default 16
                 * @type Microsoft.Xna.Framework.Input.Touch.GestureType
                 */
                Hold: 16,
                /**
                 * The user touched the screen and performed either left to right or right to left drag gesture.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Input.Touch.GestureType
                 * @constant
                 * @default 32
                 * @type Microsoft.Xna.Framework.Input.Touch.GestureType
                 */
                HorizontalDrag: 32,
                /**
                 * The user either converged or diverged two touch-points on the screen which is like a two-finger drag.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Input.Touch.GestureType
                 * @constant
                 * @default 64
                 * @type Microsoft.Xna.Framework.Input.Touch.GestureType
                 */
                Pinch: 64,
                /**
                 * An in-progress pinch operation was completed.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Input.Touch.GestureType
                 * @constant
                 * @default 128
                 * @type Microsoft.Xna.Framework.Input.Touch.GestureType
                 */
                PinchComplete: 128,
                /**
                 * The user tapped the device twice which is always preceded by a Tap gesture.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Input.Touch.GestureType
                 * @constant
                 * @default 256
                 * @type Microsoft.Xna.Framework.Input.Touch.GestureType
                 */
                DoubleTap: 256,
                /**
                 * The user touched the screen and performed either top to bottom or bottom to top drag gesture.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Input.Touch.GestureType
                 * @constant
                 * @default 512
                 * @type Microsoft.Xna.Framework.Input.Touch.GestureType
                 */
                VerticalDrag: 512
            }
        },
        $flags: true
    });

    Bridge.define("Microsoft.Xna.Framework.Input.Touch.TouchLocation", {
        inherits: function () { return [System.IEquatable$1(Microsoft.Xna.Framework.Input.Touch.TouchLocation)]; },
        $kind: "struct",
        statics: {
            fields: {
                /**
                 * Helper for assigning an invalid touch location.
                 *
                 * @static
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Input.Touch.TouchLocation
                 * @type Microsoft.Xna.Framework.Input.Touch.TouchLocation
                 */
                Invalid: null
            },
            ctors: {
                init: function () {
                    this.Invalid = new Microsoft.Xna.Framework.Input.Touch.TouchLocation();
                }
            },
            methods: {
                op_Inequality: function (value1, value2) {
                    return value1._id !== value2._id || value1._state !== value2._state || Microsoft.Xna.Framework.Vector2.op_Inequality(value1._position.$clone(), value2._position.$clone()) || value1._previousState !== value2._previousState || Microsoft.Xna.Framework.Vector2.op_Inequality(value1._previousPosition.$clone(), value2._previousPosition.$clone());
                },
                op_Equality: function (value1, value2) {
                    return value1._id === value2._id && value1._state === value2._state && Microsoft.Xna.Framework.Vector2.op_Equality(value1._position.$clone(), value2._position.$clone()) && value1._previousState === value2._previousState && Microsoft.Xna.Framework.Vector2.op_Equality(value1._previousPosition.$clone(), value2._previousPosition.$clone());
                },
                getDefaultValue: function () { return new Microsoft.Xna.Framework.Input.Touch.TouchLocation(); }
            }
        },
        fields: {
            /**
             * Attributes
             *
             * @instance
             * @private
             * @memberof Microsoft.Xna.Framework.Input.Touch.TouchLocation
             * @type number
             */
            _id: 0,
            _position: null,
            _previousPosition: null,
            _state: 0,
            _previousState: 0,
            _pressure: 0,
            _previousPressure: 0,
            _velocity: null,
            _pressPosition: null,
            _pressTimestamp: null,
            _timestamp: null,
            /**
             * True if this touch was pressed and released on the same frame.
             In this case we will keep it around for the user to get by GetState that frame.
             However if they do not call GetState that frame, this touch will be forgotten.
             *
             * @instance
             * @memberof Microsoft.Xna.Framework.Input.Touch.TouchLocation
             * @type boolean
             */
            SameFrameReleased: false
        },
        props: {
            PressPosition: {
                get: function () {
                    return this._pressPosition.$clone();
                }
            },
            PressTimestamp: {
                get: function () {
                    return this._pressTimestamp;
                }
            },
            Timestamp: {
                get: function () {
                    return this._timestamp;
                }
            },
            Velocity: {
                get: function () {
                    return this._velocity.$clone();
                }
            },
            Id: {
                get: function () {
                    return this._id;
                }
            },
            Position: {
                get: function () {
                    return this._position.$clone();
                }
            },
            Pressure: {
                get: function () {
                    return this._pressure;
                }
            },
            State: {
                get: function () {
                    return this._state;
                },
                set: function (value) {
                    this._state = value;
                }
            }
        },
        alias: ["equalsT", "System$IEquatable$1$Microsoft$Xna$Framework$Input$Touch$TouchLocation$equalsT"],
        ctors: {
            init: function () {
                this._position = new Microsoft.Xna.Framework.Vector2();
                this._previousPosition = new Microsoft.Xna.Framework.Vector2();
                this._velocity = new Microsoft.Xna.Framework.Vector2();
                this._pressPosition = new Microsoft.Xna.Framework.Vector2();
                this._pressTimestamp = new System.TimeSpan();
                this._timestamp = new System.TimeSpan();
            },
            $ctor1: function (id, state, position) {
                Microsoft.Xna.Framework.Input.Touch.TouchLocation.$ctor2.call(this, id, state, position, Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Invalid, Microsoft.Xna.Framework.Vector2.Zero);
            },
            $ctor2: function (id, state, position, previousState, previousPosition) {
                Microsoft.Xna.Framework.Input.Touch.TouchLocation.$ctor3.call(this, id, state, position, previousState, previousPosition, System.TimeSpan.zero);
            },
            $ctor4: function (id, state, position, timestamp) {
                Microsoft.Xna.Framework.Input.Touch.TouchLocation.$ctor3.call(this, id, state, position, Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Invalid, Microsoft.Xna.Framework.Vector2.Zero, timestamp);
            },
            $ctor3: function (id, state, position, previousState, previousPosition, timestamp) {
                this.$initialize();
                this._id = id;
                this._state = state;
                this._position = position.$clone();
                this._pressure = 0.0;

                this._previousState = previousState;
                this._previousPosition = previousPosition.$clone();
                this._previousPressure = 0.0;

                this._timestamp = timestamp;
                this._velocity = Microsoft.Xna.Framework.Vector2.Zero.$clone();

                if (state === Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Pressed) {
                    this._pressPosition = this._position.$clone();
                    this._pressTimestamp = this._timestamp;
                } else {
                    this._pressPosition = Microsoft.Xna.Framework.Vector2.Zero.$clone();
                    this._pressTimestamp = System.TimeSpan.zero;
                }

                this.SameFrameReleased = false;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Returns a copy of the touch with the state changed to moved.
             *
             * @instance
             * @this Microsoft.Xna.Framework.Input.Touch.TouchLocation
             * @memberof Microsoft.Xna.Framework.Input.Touch.TouchLocation
             * @return  {Microsoft.Xna.Framework.Input.Touch.TouchLocation}        The new touch location.
             */
            AsMovedState: function () {
                var touch = this;

                touch._previousState = touch._state;
                touch._previousPosition = touch._position.$clone();
                touch._previousPressure = touch._pressure;

                touch._state = Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Moved;

                return touch.$clone();
            },
            /**
             * Updates the touch location using the new event.
             *
             * @instance
             * @this Microsoft.Xna.Framework.Input.Touch.TouchLocation
             * @memberof Microsoft.Xna.Framework.Input.Touch.TouchLocation
             * @param   {Microsoft.Xna.Framework.Input.Touch.TouchLocation}    touchEvent    The next event for this touch location.
             * @return  {boolean}
             */
            UpdateState: function (touchEvent) {
                System.Diagnostics.Debug.Assert$1(this.Id === touchEvent.Id, "The touch event must have the same Id!");
                System.Diagnostics.Debug.Assert$1(this.State !== Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Released, "We shouldn't be changing state on a released location!");
                System.Diagnostics.Debug.Assert$1(touchEvent.State === Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Moved || touchEvent.State === Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Released, "The new touch event should be a move or a release!");
                System.Diagnostics.Debug.Assert$1(System.TimeSpan.gte(touchEvent.Timestamp, this._timestamp), "The touch event is older than our timestamp!");

                this._previousPosition = this._position.$clone();
                this._previousState = this._state;
                this._previousPressure = this._pressure;

                this._position = touchEvent._position.$clone();
                if (touchEvent.State === Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Released) {
                    this._state = touchEvent._state;
                }
                this._pressure = touchEvent._pressure;

                var delta = Microsoft.Xna.Framework.Vector2.op_Subtraction(this._position.$clone(), this._previousPosition.$clone());
                var elapsed = System.TimeSpan.sub(touchEvent.Timestamp, this._timestamp);
                if (System.TimeSpan.gt(elapsed, System.TimeSpan.zero)) {
                    var velocity = Microsoft.Xna.Framework.Vector2.op_Division$1(delta.$clone(), elapsed.getTotalSeconds());
                    this._velocity = Microsoft.Xna.Framework.Vector2.op_Addition(this._velocity.$clone(), Microsoft.Xna.Framework.Vector2.op_Multiply$1((Microsoft.Xna.Framework.Vector2.op_Subtraction(velocity.$clone(), this._velocity.$clone())), 0.45));
                }

                if (this._previousState === Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Pressed && this._state === Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Released && System.TimeSpan.eq(elapsed, System.TimeSpan.zero)) {
                    this.SameFrameReleased = true;
                    this._state = Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Pressed;
                }

                this._timestamp = touchEvent.Timestamp;

                return this._state !== this._previousState || delta.LengthSquared() > 0.001;
            },
            equals: function (obj) {
                if (Bridge.is(obj, Microsoft.Xna.Framework.Input.Touch.TouchLocation)) {
                    return this.equalsT(System.Nullable.getValue(Bridge.cast(Bridge.unbox(obj, Microsoft.Xna.Framework.Input.Touch.TouchLocation), Microsoft.Xna.Framework.Input.Touch.TouchLocation)));
                }

                return false;
            },
            equalsT: function (other) {
                return this._id === other._id && this._position.equalsT(other._position.$clone()) && this._previousPosition.equalsT(other._previousPosition.$clone());
            },
            getHashCode: function () {
                return this._id;
            },
            toString: function () {
                return "Touch id:" + this._id + " state:" + System.Enum.toString(Microsoft.Xna.Framework.Input.Touch.TouchLocationState, this._state) + " position:" + this._position + " pressure:" + System.Single.format(this._pressure) + " prevState:" + System.Enum.toString(Microsoft.Xna.Framework.Input.Touch.TouchLocationState, this._previousState) + " prevPosition:" + this._previousPosition + " previousPressure:" + System.Single.format(this._previousPressure);
            },
            TryGetPreviousLocation: function (aPreviousLocation) {
                if (this._previousState === Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Invalid) {
                    aPreviousLocation.v._id = -1;
                    aPreviousLocation.v._state = Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Invalid;
                    aPreviousLocation.v._position = Microsoft.Xna.Framework.Vector2.Zero.$clone();
                    aPreviousLocation.v._previousState = Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Invalid;
                    aPreviousLocation.v._previousPosition = Microsoft.Xna.Framework.Vector2.Zero.$clone();
                    aPreviousLocation.v._pressure = 0.0;
                    aPreviousLocation.v._previousPressure = 0.0;
                    aPreviousLocation.v._timestamp = System.TimeSpan.zero;
                    aPreviousLocation.v._pressPosition = Microsoft.Xna.Framework.Vector2.Zero.$clone();
                    aPreviousLocation.v._pressTimestamp = System.TimeSpan.zero;
                    aPreviousLocation.v._velocity = Microsoft.Xna.Framework.Vector2.Zero.$clone();
                    aPreviousLocation.v.SameFrameReleased = false;
                    return false;
                }

                aPreviousLocation.v._id = this._id;
                aPreviousLocation.v._state = this._previousState;
                aPreviousLocation.v._position = this._previousPosition.$clone();
                aPreviousLocation.v._previousState = Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Invalid;
                aPreviousLocation.v._previousPosition = Microsoft.Xna.Framework.Vector2.Zero.$clone();
                aPreviousLocation.v._pressure = this._previousPressure;
                aPreviousLocation.v._previousPressure = 0.0;
                aPreviousLocation.v._timestamp = this._timestamp;
                aPreviousLocation.v._pressPosition = this._pressPosition.$clone();
                aPreviousLocation.v._pressTimestamp = this._pressTimestamp;
                aPreviousLocation.v._velocity = this._velocity.$clone();
                aPreviousLocation.v.SameFrameReleased = this.SameFrameReleased;
                return true;
            },
            AgeState: function () {
                System.Diagnostics.Debug.Assert$1(this._state === Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Pressed, "Can only age the state of touches that are in the Pressed State");

                this._previousState = this._state;
                this._previousPosition = this._position.$clone();
                this._previousPressure = this._pressure;

                if (this.SameFrameReleased) {
                    this._state = Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Released;
                } else {
                    this._state = Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Moved;
                }
            },
            $clone: function (to) {
                var s = to || new Microsoft.Xna.Framework.Input.Touch.TouchLocation();
                s._id = this._id;
                s._position = this._position.$clone();
                s._previousPosition = this._previousPosition.$clone();
                s._state = this._state;
                s._previousState = this._previousState;
                s._pressure = this._pressure;
                s._previousPressure = this._previousPressure;
                s._velocity = this._velocity.$clone();
                s._pressPosition = this._pressPosition.$clone();
                s._pressTimestamp = this._pressTimestamp;
                s._timestamp = this._timestamp;
                s.SameFrameReleased = this.SameFrameReleased;
                return s;
            }
        }
    });

    /**
     * Holds the possible state information for a touch location..
     *
     * @public
     * @class Microsoft.Xna.Framework.Input.Touch.TouchLocationState
     */
    Bridge.define("Microsoft.Xna.Framework.Input.Touch.TouchLocationState", {
        $kind: "enum",
        statics: {
            fields: {
                /**
                 * This touch location position is invalid.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Input.Touch.TouchLocationState
                 * @constant
                 * @default 0
                 * @type Microsoft.Xna.Framework.Input.Touch.TouchLocationState
                 */
                Invalid: 0,
                /**
                 * This touch location position was updated or pressed at the same position.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Input.Touch.TouchLocationState
                 * @constant
                 * @default 1
                 * @type Microsoft.Xna.Framework.Input.Touch.TouchLocationState
                 */
                Moved: 1,
                /**
                 * This touch location position is new.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Input.Touch.TouchLocationState
                 * @constant
                 * @default 2
                 * @type Microsoft.Xna.Framework.Input.Touch.TouchLocationState
                 */
                Pressed: 2,
                /**
                 * This touch location position was released.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.Input.Touch.TouchLocationState
                 * @constant
                 * @default 3
                 * @type Microsoft.Xna.Framework.Input.Touch.TouchLocationState
                 */
                Released: 3
            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.Input.Touch.TouchPanel", {
        statics: {
            fields: {
                EnabledGestures: 0,
                didPress: false
            },
            methods: {
                GetState: function () {
                    if (Microsoft.Xna.Framework.Graphics.Html5.Touches.Count > 0) {
                        switch (Microsoft.Xna.Framework.Graphics.Html5.Touches.getItem(0).$clone().State) {
                            case Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Pressed: 
                                if (!Microsoft.Xna.Framework.Input.Touch.TouchPanel.didPress) {
                                    Microsoft.Xna.Framework.Input.Touch.TouchPanel.didPress = true;
                                    return new Microsoft.Xna.Framework.Input.Touch.TouchCollection.$ctor1(Microsoft.Xna.Framework.Graphics.Html5.Touches.ToArray());
                                }
                                break;
                            case Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Moved: 
                                if (Microsoft.Xna.Framework.Input.Touch.TouchPanel.didPress) {
                                    return new Microsoft.Xna.Framework.Input.Touch.TouchCollection.$ctor1(Microsoft.Xna.Framework.Graphics.Html5.Touches.ToArray());
                                }
                                break;
                            case Microsoft.Xna.Framework.Input.Touch.TouchLocationState.Released: 
                                if (Microsoft.Xna.Framework.Input.Touch.TouchPanel.didPress) {
                                    Microsoft.Xna.Framework.Input.Touch.TouchPanel.didPress = false;
                                    return new Microsoft.Xna.Framework.Input.Touch.TouchCollection.$ctor1(Microsoft.Xna.Framework.Graphics.Html5.Touches.ToArray());
                                }
                                break;
                        }
                    }
                    return new Microsoft.Xna.Framework.Input.Touch.TouchCollection.ctor();
                }
            }
        }
    });

    /**
     * Contains commonly used precalculated values and mathematical operations.
     *
     * @static
     * @abstract
     * @public
     * @class Microsoft.Xna.Framework.MathHelper
     */
    Bridge.define("Microsoft.Xna.Framework.MathHelper", {
        statics: {
            fields: {
                /**
                 * Represents the mathematical constant e(2.71828175).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.MathHelper
                 * @constant
                 * @default 2.71828175
                 * @type number
                 */
                E: 0,
                /**
                 * Represents the log base ten of e(0.4342945).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.MathHelper
                 * @constant
                 * @default 0.4342945
                 * @type number
                 */
                Log10E: 0,
                /**
                 * Represents the log base two of e(1.442695).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.MathHelper
                 * @constant
                 * @default 1.442695
                 * @type number
                 */
                Log2E: 0,
                /**
                 * Represents the value of pi(3.14159274).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.MathHelper
                 * @constant
                 * @default 3.14159274
                 * @type number
                 */
                Pi: 0,
                /**
                 * Represents the value of pi divided by two(1.57079637).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.MathHelper
                 * @constant
                 * @default 1.57079637
                 * @type number
                 */
                PiOver2: 0,
                /**
                 * Represents the value of pi divided by four(0.7853982).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.MathHelper
                 * @constant
                 * @default 0.7853982
                 * @type number
                 */
                PiOver4: 0,
                /**
                 * Represents the value of pi times two(6.28318548).
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.MathHelper
                 * @constant
                 * @default 6.28318548
                 * @type number
                 */
                TwoPi: 0
            },
            ctors: {
                init: function () {
                    this.E = 2.71828175;
                    this.Log10E = 0.4342945;
                    this.Log2E = 1.442695;
                    this.Pi = 3.14159274;
                    this.PiOver2 = 1.57079637;
                    this.PiOver4 = 0.7853982;
                    this.TwoPi = 6.28318548;
                }
            },
            methods: {
                /**
                 * Returns the Cartesian coordinate for one axis of a point that is defined by a given triangle and two normalized barycentric (areal) coordinates.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.MathHelper
                 * @memberof Microsoft.Xna.Framework.MathHelper
                 * @param   {number}    value1     The coordinate on one axis of vertex 1 of the defining triangle.
                 * @param   {number}    value2     The coordinate on the same axis of vertex 2 of the defining triangle.
                 * @param   {number}    value3     The coordinate on the same axis of vertex 3 of the defining triangle.
                 * @param   {number}    amount1    The normalized barycentric (areal) coordinate b2, equal to the weighting factor for vertex 2, the coordinate of which is specified in value2.
                 * @param   {number}    amount2    The normalized barycentric (areal) coordinate b3, equal to the weighting factor for vertex 3, the coordinate of which is specified in value3.
                 * @return  {number}               Cartesian coordinate of the specified point with respect to the axis being used.
                 */
                Barycentric: function (value1, value2, value3, amount1, amount2) {
                    return value1 + (value2 - value1) * amount1 + (value3 - value1) * amount2;
                },
                /**
                 * Performs a Catmull-Rom interpolation using the specified positions.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.MathHelper
                 * @memberof Microsoft.Xna.Framework.MathHelper
                 * @param   {number}    value1    The first position in the interpolation.
                 * @param   {number}    value2    The second position in the interpolation.
                 * @param   {number}    value3    The third position in the interpolation.
                 * @param   {number}    value4    The fourth position in the interpolation.
                 * @param   {number}    amount    Weighting factor.
                 * @return  {number}              A position that is the result of the Catmull-Rom interpolation.
                 */
                CatmullRom: function (value1, value2, value3, value4, amount) {
                    var amountSquared = amount * amount;
                    var amountCubed = amountSquared * amount;
                    return 0.5 * (2.0 * value2 + (value3 - value1) * amount + (2.0 * value1 - 5.0 * value2 + 4.0 * value3 - value4) * amountSquared + (3.0 * value2 - value1 - 3.0 * value3 + value4) * amountCubed);
                },
                /**
                 * Restricts a value to be within a specified range.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.MathHelper
                 * @memberof Microsoft.Xna.Framework.MathHelper
                 * @param   {number}    value    The value to clamp.
                 * @param   {number}    min      The minimum value. If <pre><code>value</code></pre> is less than <pre><code>min</code></pre>, <pre><code>min</code></pre> will be returned.
                 * @param   {number}    max      The maximum value. If <pre><code>value</code></pre> is greater than <pre><code>max</code></pre>, <pre><code>max</code></pre> will be returned.
                 * @return  {number}             The clamped value.
                 */
                Clamp$1: function (value, min, max) {
                    value = (value > max) ? max : value;

                    value = (value < min) ? min : value;

                    return value;
                },
                /**
                 * Restricts a value to be within a specified range.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.MathHelper
                 * @memberof Microsoft.Xna.Framework.MathHelper
                 * @param   {number}    value    The value to clamp.
                 * @param   {number}    min      The minimum value. If <pre><code>value</code></pre> is less than <pre><code>min</code></pre>, <pre><code>min</code></pre> will be returned.
                 * @param   {number}    max      The maximum value. If <pre><code>value</code></pre> is greater than <pre><code>max</code></pre>, <pre><code>max</code></pre> will be returned.
                 * @return  {number}             The clamped value.
                 */
                Clamp: function (value, min, max) {
                    value = (value > max) ? max : value;
                    value = (value < min) ? min : value;
                    return value;
                },
                /**
                 * Calculates the absolute value of the difference of two values.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.MathHelper
                 * @memberof Microsoft.Xna.Framework.MathHelper
                 * @param   {number}    value1    Source value.
                 * @param   {number}    value2    Source value.
                 * @return  {number}              Distance between the two values.
                 */
                Distance: function (value1, value2) {
                    return Math.abs(value1 - value2);
                },
                /**
                 * Performs a Hermite spline interpolation.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.MathHelper
                 * @memberof Microsoft.Xna.Framework.MathHelper
                 * @param   {number}    value1      Source position.
                 * @param   {number}    tangent1    Source tangent.
                 * @param   {number}    value2      Source position.
                 * @param   {number}    tangent2    Source tangent.
                 * @param   {number}    amount      Weighting factor.
                 * @return  {number}                The result of the Hermite spline interpolation.
                 */
                Hermite: function (value1, tangent1, value2, tangent2, amount) {
                    var v1 = value1, v2 = value2, t1 = tangent1, t2 = tangent2, s = amount, result;
                    var sCubed = s * s * s;
                    var sSquared = s * s;

                    if (amount === 0.0) {
                        result = value1;
                    } else {
                        if (amount === 1.0) {
                            result = value2;
                        } else {
                            result = (2 * v1 - 2 * v2 + t2 + t1) * sCubed + (3 * v2 - 3 * v1 - 2 * t1 - t2) * sSquared + t1 * s + v1;
                        }
                    }
                    return result;
                },
                /**
                 * Linearly interpolates between two values.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.MathHelper
                 * @memberof Microsoft.Xna.Framework.MathHelper
                 * @param   {number}    value1    Source value.
                 * @param   {number}    value2    Destination value.
                 * @param   {number}    amount    Value between 0 and 1 indicating the weight of value2.
                 * @return  {number}              Interpolated value.
                 */
                Lerp: function (value1, value2, amount) {
                    return value1 + (value2 - value1) * amount;
                },
                /**
                 * Linearly interpolates between two values.
                 This method is a less efficient, more precise version of {@link }.
                 See remarks for more info.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.MathHelper
                 * @memberof Microsoft.Xna.Framework.MathHelper
                 * @param   {number}    value1    Source value.
                 * @param   {number}    value2    Destination value.
                 * @param   {number}    amount    Value between 0 and 1 indicating the weight of value2.
                 * @return  {number}              Interpolated value.
                 */
                LerpPrecise: function (value1, value2, amount) {
                    return ((1 - amount) * value1) + (value2 * amount);
                },
                /**
                 * Returns the greater of two values.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.MathHelper
                 * @memberof Microsoft.Xna.Framework.MathHelper
                 * @param   {number}    value1    Source value.
                 * @param   {number}    value2    Source value.
                 * @return  {number}              The greater value.
                 */
                Max$1: function (value1, value2) {
                    return value1 > value2 ? value1 : value2;
                },
                /**
                 * Returns the greater of two values.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.MathHelper
                 * @memberof Microsoft.Xna.Framework.MathHelper
                 * @param   {number}    value1    Source value.
                 * @param   {number}    value2    Source value.
                 * @return  {number}              The greater value.
                 */
                Max: function (value1, value2) {
                    return value1 > value2 ? value1 : value2;
                },
                /**
                 * Returns the lesser of two values.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.MathHelper
                 * @memberof Microsoft.Xna.Framework.MathHelper
                 * @param   {number}    value1    Source value.
                 * @param   {number}    value2    Source value.
                 * @return  {number}              The lesser value.
                 */
                Min$1: function (value1, value2) {
                    return value1 < value2 ? value1 : value2;
                },
                /**
                 * Returns the lesser of two values.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.MathHelper
                 * @memberof Microsoft.Xna.Framework.MathHelper
                 * @param   {number}    value1    Source value.
                 * @param   {number}    value2    Source value.
                 * @return  {number}              The lesser value.
                 */
                Min: function (value1, value2) {
                    return value1 < value2 ? value1 : value2;
                },
                /**
                 * Interpolates between two values using a cubic equation.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.MathHelper
                 * @memberof Microsoft.Xna.Framework.MathHelper
                 * @param   {number}    value1    Source value.
                 * @param   {number}    value2    Source value.
                 * @param   {number}    amount    Weighting value.
                 * @return  {number}              Interpolated value.
                 */
                SmoothStep: function (value1, value2, amount) {
                    var result = Microsoft.Xna.Framework.MathHelper.Clamp$1(amount, 0.0, 1.0);
                    result = Microsoft.Xna.Framework.MathHelper.Hermite(value1, 0.0, value2, 0.0, result);

                    return result;
                },
                /**
                 * Converts radians to degrees.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.MathHelper
                 * @memberof Microsoft.Xna.Framework.MathHelper
                 * @param   {number}    radians    The angle in radians.
                 * @return  {number}               The angle in degrees.
                 */
                ToDegrees: function (radians) {
                    return radians * 57.295779513082323;
                },
                /**
                 * Converts degrees to radians.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.MathHelper
                 * @memberof Microsoft.Xna.Framework.MathHelper
                 * @param   {number}    degrees    The angle in degrees.
                 * @return  {number}               The angle in radians.
                 */
                ToRadians: function (degrees) {
                    return degrees * 0.017453292519943295;
                },
                /**
                 * Reduces a given angle to a value between π and -π.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.MathHelper
                 * @memberof Microsoft.Xna.Framework.MathHelper
                 * @param   {number}    angle    The angle to reduce, in radians.
                 * @return  {number}             The new angle, in radians.
                 */
                WrapAngle: function (angle) {
                    if ((angle > -3.14159274) && (angle <= Microsoft.Xna.Framework.MathHelper.Pi)) {
                        return angle;
                    }
                    angle %= Microsoft.Xna.Framework.MathHelper.TwoPi;
                    if (angle <= -3.14159274) {
                        return angle + Microsoft.Xna.Framework.MathHelper.TwoPi;
                    }
                    if (angle > Microsoft.Xna.Framework.MathHelper.Pi) {
                        return angle - Microsoft.Xna.Framework.MathHelper.TwoPi;
                    }
                    return angle;
                },
                /**
                 * Determines if value is powered by two.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.MathHelper
                 * @memberof Microsoft.Xna.Framework.MathHelper
                 * @param   {number}     value    A value.
                 * @return  {boolean}             <pre><code>true</code></pre> if <pre><code>value</code></pre> is powered by two; otherwise <pre><code>false</code></pre>.
                 */
                IsPowerOfTwo: function (value) {
                    return (value > 0) && ((value & (((value - 1) | 0))) === 0);
                }
            }
        }
    });

    /**
     * Represents the right-handed 4x4 floating point matrix, which can store translation, scale and rotation information.
     *
     * @public
     * @class Microsoft.Xna.Framework.Matrix
     * @implements  System.IEquatable$1
     */
    Bridge.define("Microsoft.Xna.Framework.Matrix", {
        inherits: function () { return [System.IEquatable$1(Microsoft.Xna.Framework.Matrix)]; },
        $kind: "struct",
        statics: {
            fields: {
                identity: null
            },
            props: {
                /**
                 * Returns the identity matrix.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @function Identity
                 * @type Microsoft.Xna.Framework.Matrix
                 */
                Identity: {
                    get: function () {
                        return Microsoft.Xna.Framework.Matrix.identity.$clone();
                    }
                }
            },
            ctors: {
                init: function () {
                    this.identity = new Microsoft.Xna.Framework.Matrix();
                    this.identity = new Microsoft.Xna.Framework.Matrix.$ctor2(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);
                }
            },
            methods: {
                /**
                 * Creates a new {@link } which contains sum of two matrixes.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix1    The first matrix to add.
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix2    The second matrix to add.
                 * @return  {Microsoft.Xna.Framework.Matrix}               The result of the matrix addition.
                 */
                Add: function (matrix1, matrix2) {
                    matrix1.M11 += matrix2.M11;
                    matrix1.M12 += matrix2.M12;
                    matrix1.M13 += matrix2.M13;
                    matrix1.M14 += matrix2.M14;
                    matrix1.M21 += matrix2.M21;
                    matrix1.M22 += matrix2.M22;
                    matrix1.M23 += matrix2.M23;
                    matrix1.M24 += matrix2.M24;
                    matrix1.M31 += matrix2.M31;
                    matrix1.M32 += matrix2.M32;
                    matrix1.M33 += matrix2.M33;
                    matrix1.M34 += matrix2.M34;
                    matrix1.M41 += matrix2.M41;
                    matrix1.M42 += matrix2.M42;
                    matrix1.M43 += matrix2.M43;
                    matrix1.M44 += matrix2.M44;
                    return matrix1.$clone();
                },
                /**
                 * Creates a new {@link } which contains sum of two matrixes.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix1    The first matrix to add.
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix2    The second matrix to add.
                 * @param   {Microsoft.Xna.Framework.Matrix}    result     The result of the matrix addition as an output parameter.
                 * @return  {void}
                 */
                Add$1: function (matrix1, matrix2, result) {
                    result.v.M11 = matrix1.v.M11 + matrix2.v.M11;
                    result.v.M12 = matrix1.v.M12 + matrix2.v.M12;
                    result.v.M13 = matrix1.v.M13 + matrix2.v.M13;
                    result.v.M14 = matrix1.v.M14 + matrix2.v.M14;
                    result.v.M21 = matrix1.v.M21 + matrix2.v.M21;
                    result.v.M22 = matrix1.v.M22 + matrix2.v.M22;
                    result.v.M23 = matrix1.v.M23 + matrix2.v.M23;
                    result.v.M24 = matrix1.v.M24 + matrix2.v.M24;
                    result.v.M31 = matrix1.v.M31 + matrix2.v.M31;
                    result.v.M32 = matrix1.v.M32 + matrix2.v.M32;
                    result.v.M33 = matrix1.v.M33 + matrix2.v.M33;
                    result.v.M34 = matrix1.v.M34 + matrix2.v.M34;
                    result.v.M41 = matrix1.v.M41 + matrix2.v.M41;
                    result.v.M42 = matrix1.v.M42 + matrix2.v.M42;
                    result.v.M43 = matrix1.v.M43 + matrix2.v.M43;
                    result.v.M44 = matrix1.v.M44 + matrix2.v.M44;

                },
                /**
                 * Creates a new {@link } for spherical billboarding that rotates around specified object position.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Vector3}     objectPosition         Position of billboard object. It will rotate around that vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}     cameraPosition         The camera position.
                 * @param   {Microsoft.Xna.Framework.Vector3}     cameraUpVector         The camera up vector.
                 * @param   {?Microsoft.Xna.Framework.Vector3}    cameraForwardVector    Optional camera forward vector.
                 * @return  {Microsoft.Xna.Framework.Matrix}                             The {@link } for spherical billboarding.
                 */
                CreateBillboard: function (objectPosition, cameraPosition, cameraUpVector, cameraForwardVector) {
                    objectPosition = {v:objectPosition};
                    cameraPosition = {v:cameraPosition};
                    cameraUpVector = {v:cameraUpVector};
                    var result = { v : new Microsoft.Xna.Framework.Matrix() };

                    Microsoft.Xna.Framework.Matrix.CreateBillboard$1(objectPosition, cameraPosition, cameraUpVector, System.Nullable.lift1("$clone", cameraForwardVector), result);

                    return result.v.$clone();
                },
                /**
                 * Creates a new {@link } for spherical billboarding that rotates around specified object position.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Vector3}     objectPosition         Position of billboard object. It will rotate around that vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}     cameraPosition         The camera position.
                 * @param   {Microsoft.Xna.Framework.Vector3}     cameraUpVector         The camera up vector.
                 * @param   {?Microsoft.Xna.Framework.Vector3}    cameraForwardVector    Optional camera forward vector.
                 * @param   {Microsoft.Xna.Framework.Matrix}      result                 The {@link } for spherical billboarding as an output parameter.
                 * @return  {void}
                 */
                CreateBillboard$1: function (objectPosition, cameraPosition, cameraUpVector, cameraForwardVector, result) {
                    var vector = { v : new Microsoft.Xna.Framework.Vector3() };
                    var vector2 = { v : new Microsoft.Xna.Framework.Vector3() };
                    var vector3 = { v : new Microsoft.Xna.Framework.Vector3() };
                    vector.v.X = objectPosition.v.X - cameraPosition.v.X;
                    vector.v.Y = objectPosition.v.Y - cameraPosition.v.Y;
                    vector.v.Z = objectPosition.v.Z - cameraPosition.v.Z;
                    var num = vector.v.LengthSquared();
                    if (num < 0.0001) {
                        vector.v = System.Nullable.hasValue(cameraForwardVector) ? Microsoft.Xna.Framework.Vector3.op_UnaryNegation(System.Nullable.getValue(cameraForwardVector).$clone()) : Microsoft.Xna.Framework.Vector3.Forward;
                    } else {
                        Microsoft.Xna.Framework.Vector3.Multiply$3(vector, 1.0 / Math.sqrt(num), vector);
                    }
                    Microsoft.Xna.Framework.Vector3.Cross$1(cameraUpVector, vector, vector3);
                    vector3.v.Normalize();
                    Microsoft.Xna.Framework.Vector3.Cross$1(vector, vector3, vector2);
                    result.v.M11 = vector3.v.X;
                    result.v.M12 = vector3.v.Y;
                    result.v.M13 = vector3.v.Z;
                    result.v.M14 = 0;
                    result.v.M21 = vector2.v.X;
                    result.v.M22 = vector2.v.Y;
                    result.v.M23 = vector2.v.Z;
                    result.v.M24 = 0;
                    result.v.M31 = vector.v.X;
                    result.v.M32 = vector.v.Y;
                    result.v.M33 = vector.v.Z;
                    result.v.M34 = 0;
                    result.v.M41 = objectPosition.v.X;
                    result.v.M42 = objectPosition.v.Y;
                    result.v.M43 = objectPosition.v.Z;
                    result.v.M44 = 1;
                },
                /**
                 * Creates a new {@link } for cylindrical billboarding that rotates around specified axis.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Vector3}     objectPosition         Object position the billboard will rotate around.
                 * @param   {Microsoft.Xna.Framework.Vector3}     cameraPosition         Camera position.
                 * @param   {Microsoft.Xna.Framework.Vector3}     rotateAxis             Axis of billboard for rotation.
                 * @param   {?Microsoft.Xna.Framework.Vector3}    cameraForwardVector    Optional camera forward vector.
                 * @param   {?Microsoft.Xna.Framework.Vector3}    objectForwardVector    Optional object forward vector.
                 * @return  {Microsoft.Xna.Framework.Matrix}                             The {@link } for cylindrical billboarding.
                 */
                CreateConstrainedBillboard: function (objectPosition, cameraPosition, rotateAxis, cameraForwardVector, objectForwardVector) {
                    objectPosition = {v:objectPosition};
                    cameraPosition = {v:cameraPosition};
                    rotateAxis = {v:rotateAxis};
                    var result = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.CreateConstrainedBillboard$1(objectPosition, cameraPosition, rotateAxis, System.Nullable.lift1("$clone", cameraForwardVector), System.Nullable.lift1("$clone", objectForwardVector), result);
                    return result.v.$clone();
                },
                /**
                 * Creates a new {@link } for cylindrical billboarding that rotates around specified axis.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Vector3}     objectPosition         Object position the billboard will rotate around.
                 * @param   {Microsoft.Xna.Framework.Vector3}     cameraPosition         Camera position.
                 * @param   {Microsoft.Xna.Framework.Vector3}     rotateAxis             Axis of billboard for rotation.
                 * @param   {?Microsoft.Xna.Framework.Vector3}    cameraForwardVector    Optional camera forward vector.
                 * @param   {?Microsoft.Xna.Framework.Vector3}    objectForwardVector    Optional object forward vector.
                 * @param   {Microsoft.Xna.Framework.Matrix}      result                 The {@link } for cylindrical billboarding as an output parameter.
                 * @return  {void}
                 */
                CreateConstrainedBillboard$1: function (objectPosition, cameraPosition, rotateAxis, cameraForwardVector, objectForwardVector, result) {
                    var num = { };
                    var vector = { v : new Microsoft.Xna.Framework.Vector3() };
                    var vector2 = { v : new Microsoft.Xna.Framework.Vector3() };
                    var vector3 = { v : new Microsoft.Xna.Framework.Vector3() };
                    vector2.v.X = objectPosition.v.X - cameraPosition.v.X;
                    vector2.v.Y = objectPosition.v.Y - cameraPosition.v.Y;
                    vector2.v.Z = objectPosition.v.Z - cameraPosition.v.Z;
                    var num2 = vector2.v.LengthSquared();
                    if (num2 < 0.0001) {
                        vector2.v = System.Nullable.hasValue(cameraForwardVector) ? Microsoft.Xna.Framework.Vector3.op_UnaryNegation(System.Nullable.getValue(cameraForwardVector).$clone()) : Microsoft.Xna.Framework.Vector3.Forward;
                    } else {
                        Microsoft.Xna.Framework.Vector3.Multiply$3(vector2, 1.0 / Math.sqrt(num2), vector2);
                    }
                    var vector4 = { v : rotateAxis.v.$clone() };
                    Microsoft.Xna.Framework.Vector3.Dot$1(rotateAxis, vector2, num);
                    if (Math.abs(num.v) > 0.9982547) {
                        if (System.Nullable.hasValue(objectForwardVector)) {
                            vector.v = System.Nullable.getValue(objectForwardVector).$clone();
                            Microsoft.Xna.Framework.Vector3.Dot$1(rotateAxis, vector, num);
                            if (Math.abs(num.v) > 0.9982547) {
                                num.v = ((rotateAxis.v.X * Microsoft.Xna.Framework.Vector3.Forward.X) + (rotateAxis.v.Y * Microsoft.Xna.Framework.Vector3.Forward.Y)) + (rotateAxis.v.Z * Microsoft.Xna.Framework.Vector3.Forward.Z);
                                vector.v = (Math.abs(num.v) > 0.9982547) ? Microsoft.Xna.Framework.Vector3.Right : Microsoft.Xna.Framework.Vector3.Forward;
                            }
                        } else {
                            num.v = ((rotateAxis.v.X * Microsoft.Xna.Framework.Vector3.Forward.X) + (rotateAxis.v.Y * Microsoft.Xna.Framework.Vector3.Forward.Y)) + (rotateAxis.v.Z * Microsoft.Xna.Framework.Vector3.Forward.Z);
                            vector.v = (Math.abs(num.v) > 0.9982547) ? Microsoft.Xna.Framework.Vector3.Right : Microsoft.Xna.Framework.Vector3.Forward;
                        }
                        Microsoft.Xna.Framework.Vector3.Cross$1(rotateAxis, vector, vector3);
                        vector3.v.Normalize();
                        Microsoft.Xna.Framework.Vector3.Cross$1(vector3, rotateAxis, vector);
                        vector.v.Normalize();
                    } else {
                        Microsoft.Xna.Framework.Vector3.Cross$1(rotateAxis, vector2, vector3);
                        vector3.v.Normalize();
                        Microsoft.Xna.Framework.Vector3.Cross$1(vector3, vector4, vector);
                        vector.v.Normalize();
                    }
                    result.v.M11 = vector3.v.X;
                    result.v.M12 = vector3.v.Y;
                    result.v.M13 = vector3.v.Z;
                    result.v.M14 = 0;
                    result.v.M21 = vector4.v.X;
                    result.v.M22 = vector4.v.Y;
                    result.v.M23 = vector4.v.Z;
                    result.v.M24 = 0;
                    result.v.M31 = vector.v.X;
                    result.v.M32 = vector.v.Y;
                    result.v.M33 = vector.v.Z;
                    result.v.M34 = 0;
                    result.v.M41 = objectPosition.v.X;
                    result.v.M42 = objectPosition.v.Y;
                    result.v.M43 = objectPosition.v.Z;
                    result.v.M44 = 1;

                },
                /**
                 * Creates a new {@link } which contains the rotation moment around specified axis.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Vector3}    axis     The axis of rotation.
                 * @param   {number}                             angle    The angle of rotation in radians.
                 * @return  {Microsoft.Xna.Framework.Matrix}              The rotation {@link }.
                 */
                CreateFromAxisAngle: function (axis, angle) {
                    axis = {v:axis};
                    var result = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.CreateFromAxisAngle$1(axis, angle, result);
                    return result.v.$clone();
                },
                /**
                 * Creates a new {@link } which contains the rotation moment around specified axis.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Vector3}    axis      The axis of rotation.
                 * @param   {number}                             angle     The angle of rotation in radians.
                 * @param   {Microsoft.Xna.Framework.Matrix}     result    The rotation {@link } as an output parameter.
                 * @return  {void}
                 */
                CreateFromAxisAngle$1: function (axis, angle, result) {
                    var x = axis.v.X;
                    var y = axis.v.Y;
                    var z = axis.v.Z;
                    var num2 = Math.sin(angle);
                    var num = Math.cos(angle);
                    var num11 = x * x;
                    var num10 = y * y;
                    var num9 = z * z;
                    var num8 = x * y;
                    var num7 = x * z;
                    var num6 = y * z;
                    result.v.M11 = num11 + (num * (1.0 - num11));
                    result.v.M12 = (num8 - (num * num8)) + (num2 * z);
                    result.v.M13 = (num7 - (num * num7)) - (num2 * y);
                    result.v.M14 = 0;
                    result.v.M21 = (num8 - (num * num8)) - (num2 * z);
                    result.v.M22 = num10 + (num * (1.0 - num10));
                    result.v.M23 = (num6 - (num * num6)) + (num2 * x);
                    result.v.M24 = 0;
                    result.v.M31 = (num7 - (num * num7)) + (num2 * y);
                    result.v.M32 = (num6 - (num * num6)) - (num2 * x);
                    result.v.M33 = num9 + (num * (1.0 - num9));
                    result.v.M34 = 0;
                    result.v.M41 = 0;
                    result.v.M42 = 0;
                    result.v.M43 = 0;
                    result.v.M44 = 1;
                },
                /**
                 * Creates a new rotation {@link } from a {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion    {@link } of rotation moment.
                 * @return  {Microsoft.Xna.Framework.Matrix}                      The rotation {@link }.
                 */
                CreateFromQuaternion: function (quaternion) {
                    quaternion = {v:quaternion};
                    var result = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.CreateFromQuaternion$1(quaternion, result);
                    return result.v.$clone();
                },
                /**
                 * Creates a new rotation {@link } from a {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion    {@link } of rotation moment.
                 * @param   {Microsoft.Xna.Framework.Matrix}        result        The rotation {@link } as an output parameter.
                 * @return  {void}
                 */
                CreateFromQuaternion$1: function (quaternion, result) {
                    var num9 = quaternion.v.X * quaternion.v.X;
                    var num8 = quaternion.v.Y * quaternion.v.Y;
                    var num7 = quaternion.v.Z * quaternion.v.Z;
                    var num6 = quaternion.v.X * quaternion.v.Y;
                    var num5 = quaternion.v.Z * quaternion.v.W;
                    var num4 = quaternion.v.Z * quaternion.v.X;
                    var num3 = quaternion.v.Y * quaternion.v.W;
                    var num2 = quaternion.v.Y * quaternion.v.Z;
                    var num = quaternion.v.X * quaternion.v.W;
                    result.v.M11 = 1.0 - (2.0 * (num8 + num7));
                    result.v.M12 = 2.0 * (num6 + num5);
                    result.v.M13 = 2.0 * (num4 - num3);
                    result.v.M14 = 0.0;
                    result.v.M21 = 2.0 * (num6 - num5);
                    result.v.M22 = 1.0 - (2.0 * (num7 + num9));
                    result.v.M23 = 2.0 * (num2 + num);
                    result.v.M24 = 0.0;
                    result.v.M31 = 2.0 * (num4 + num3);
                    result.v.M32 = 2.0 * (num2 - num);
                    result.v.M33 = 1.0 - (2.0 * (num8 + num9));
                    result.v.M34 = 0.0;
                    result.v.M41 = 0.0;
                    result.v.M42 = 0.0;
                    result.v.M43 = 0.0;
                    result.v.M44 = 1.0;
                },
                /**
                 * Creates a new rotation {@link } from the specified yaw, pitch and roll values.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {number}                            yaw      The yaw rotation value in radians.
                 * @param   {number}                            pitch    The pitch rotation value in radians.
                 * @param   {number}                            roll     The roll rotation value in radians.
                 * @return  {Microsoft.Xna.Framework.Matrix}             The rotation {@link }.
                 */
                CreateFromYawPitchRoll: function (yaw, pitch, roll) {
                    var matrix = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.CreateFromYawPitchRoll$1(yaw, pitch, roll, matrix);
                    return matrix.v.$clone();
                },
                /**
                 * Creates a new rotation {@link } from the specified yaw, pitch and roll values.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {number}                            yaw       The yaw rotation value in radians.
                 * @param   {number}                            pitch     The pitch rotation value in radians.
                 * @param   {number}                            roll      The roll rotation value in radians.
                 * @param   {Microsoft.Xna.Framework.Matrix}    result    The rotation {@link } as an output parameter.
                 * @return  {void}
                 */
                CreateFromYawPitchRoll$1: function (yaw, pitch, roll, result) {
                    var quaternion = { v : new Microsoft.Xna.Framework.Quaternion() };
                    Microsoft.Xna.Framework.Quaternion.CreateFromYawPitchRoll$1(yaw, pitch, roll, quaternion);
                    Microsoft.Xna.Framework.Matrix.CreateFromQuaternion$1(quaternion, result);
                },
                /**
                 * Creates a new viewing {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Vector3}    cameraPosition    Position of the camera.
                 * @param   {Microsoft.Xna.Framework.Vector3}    cameraTarget      Lookup vector of the camera.
                 * @param   {Microsoft.Xna.Framework.Vector3}    cameraUpVector    The direction of the upper edge of the camera.
                 * @return  {Microsoft.Xna.Framework.Matrix}                       The viewing {@link }.
                 */
                CreateLookAt: function (cameraPosition, cameraTarget, cameraUpVector) {
                    cameraPosition = {v:cameraPosition};
                    cameraTarget = {v:cameraTarget};
                    cameraUpVector = {v:cameraUpVector};
                    var matrix = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.CreateLookAt$1(cameraPosition, cameraTarget, cameraUpVector, matrix);
                    return matrix.v.$clone();
                },
                /**
                 * Creates a new viewing {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Vector3}    cameraPosition    Position of the camera.
                 * @param   {Microsoft.Xna.Framework.Vector3}    cameraTarget      Lookup vector of the camera.
                 * @param   {Microsoft.Xna.Framework.Vector3}    cameraUpVector    The direction of the upper edge of the camera.
                 * @param   {Microsoft.Xna.Framework.Matrix}     result            The viewing {@link } as an output parameter.
                 * @return  {void}
                 */
                CreateLookAt$1: function (cameraPosition, cameraTarget, cameraUpVector, result) {
                    var vector = Microsoft.Xna.Framework.Vector3.Normalize(Microsoft.Xna.Framework.Vector3.op_Subtraction(cameraPosition.v.$clone(), cameraTarget.v.$clone()));
                    var vector2 = Microsoft.Xna.Framework.Vector3.Normalize(Microsoft.Xna.Framework.Vector3.Cross(cameraUpVector.v.$clone(), vector.$clone()));
                    var vector3 = Microsoft.Xna.Framework.Vector3.Cross(vector.$clone(), vector2.$clone());
                    result.v.M11 = vector2.X;
                    result.v.M12 = vector3.X;
                    result.v.M13 = vector.X;
                    result.v.M14 = 0.0;
                    result.v.M21 = vector2.Y;
                    result.v.M22 = vector3.Y;
                    result.v.M23 = vector.Y;
                    result.v.M24 = 0.0;
                    result.v.M31 = vector2.Z;
                    result.v.M32 = vector3.Z;
                    result.v.M33 = vector.Z;
                    result.v.M34 = 0.0;
                    result.v.M41 = -Microsoft.Xna.Framework.Vector3.Dot(vector2.$clone(), cameraPosition.v.$clone());
                    result.v.M42 = -Microsoft.Xna.Framework.Vector3.Dot(vector3.$clone(), cameraPosition.v.$clone());
                    result.v.M43 = -Microsoft.Xna.Framework.Vector3.Dot(vector.$clone(), cameraPosition.v.$clone());
                    result.v.M44 = 1.0;
                },
                /**
                 * Creates a new projection {@link } for orthographic view.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {number}                            width         Width of the viewing volume.
                 * @param   {number}                            height        Height of the viewing volume.
                 * @param   {number}                            zNearPlane    Depth of the near plane.
                 * @param   {number}                            zFarPlane     Depth of the far plane.
                 * @return  {Microsoft.Xna.Framework.Matrix}                  The new projection {@link } for orthographic view.
                 */
                CreateOrthographic: function (width, height, zNearPlane, zFarPlane) {
                    var matrix = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.CreateOrthographic$1(width, height, zNearPlane, zFarPlane, matrix);
                    return matrix.v.$clone();
                },
                /**
                 * Creates a new projection {@link } for orthographic view.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {number}                            width         Width of the viewing volume.
                 * @param   {number}                            height        Height of the viewing volume.
                 * @param   {number}                            zNearPlane    Depth of the near plane.
                 * @param   {number}                            zFarPlane     Depth of the far plane.
                 * @param   {Microsoft.Xna.Framework.Matrix}    result        The new projection {@link } for orthographic view as an output parameter.
                 * @return  {void}
                 */
                CreateOrthographic$1: function (width, height, zNearPlane, zFarPlane, result) {
                    result.v.M11 = 2.0 / width;
                    result.v.M12 = (result.v.M13 = (result.v.M14 = 0.0));
                    result.v.M22 = 2.0 / height;
                    result.v.M21 = (result.v.M23 = (result.v.M24 = 0.0));
                    result.v.M33 = 1.0 / (zNearPlane - zFarPlane);
                    result.v.M31 = (result.v.M32 = (result.v.M34 = 0.0));
                    result.v.M41 = (result.v.M42 = 0.0);
                    result.v.M43 = zNearPlane / (zNearPlane - zFarPlane);
                    result.v.M44 = 1.0;
                },
                /**
                 * Creates a new projection {@link } for customized orthographic view.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {number}                            left          Lower x-value at the near plane.
                 * @param   {number}                            right         Upper x-value at the near plane.
                 * @param   {number}                            bottom        Lower y-coordinate at the near plane.
                 * @param   {number}                            top           Upper y-value at the near plane.
                 * @param   {number}                            zNearPlane    Depth of the near plane.
                 * @param   {number}                            zFarPlane     Depth of the far plane.
                 * @return  {Microsoft.Xna.Framework.Matrix}                  The new projection {@link } for customized orthographic view.
                 */
                CreateOrthographicOffCenter$1: function (left, right, bottom, top, zNearPlane, zFarPlane) {
                    var matrix = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.CreateOrthographicOffCenter$2(left, right, bottom, top, zNearPlane, zFarPlane, matrix);
                    return matrix.v.$clone();
                },
                /**
                 * Creates a new projection {@link } for customized orthographic view.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Rectangle}    viewingVolume    The viewing volume.
                 * @param   {number}                               zNearPlane       Depth of the near plane.
                 * @param   {number}                               zFarPlane        Depth of the far plane.
                 * @return  {Microsoft.Xna.Framework.Matrix}                        The new projection {@link } for customized orthographic view.
                 */
                CreateOrthographicOffCenter: function (viewingVolume, zNearPlane, zFarPlane) {
                    var matrix = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.CreateOrthographicOffCenter$2(viewingVolume.Left, viewingVolume.Right, viewingVolume.Bottom, viewingVolume.Top, zNearPlane, zFarPlane, matrix);
                    return matrix.v.$clone();
                },
                /**
                 * Creates a new projection {@link } for customized orthographic view.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {number}                            left          Lower x-value at the near plane.
                 * @param   {number}                            right         Upper x-value at the near plane.
                 * @param   {number}                            bottom        Lower y-coordinate at the near plane.
                 * @param   {number}                            top           Upper y-value at the near plane.
                 * @param   {number}                            zNearPlane    Depth of the near plane.
                 * @param   {number}                            zFarPlane     Depth of the far plane.
                 * @param   {Microsoft.Xna.Framework.Matrix}    result        The new projection {@link } for customized orthographic view as an output parameter.
                 * @return  {void}
                 */
                CreateOrthographicOffCenter$2: function (left, right, bottom, top, zNearPlane, zFarPlane, result) {
                    result.v.M11 = 2.0 / (right - left);
                    result.v.M12 = 0.0;
                    result.v.M13 = 0.0;
                    result.v.M14 = 0.0;
                    result.v.M21 = 0.0;
                    result.v.M22 = 2.0 / (top - bottom);
                    result.v.M23 = 0.0;
                    result.v.M24 = 0.0;
                    result.v.M31 = 0.0;
                    result.v.M32 = 0.0;
                    result.v.M33 = 1.0 / (zNearPlane - zFarPlane);
                    result.v.M34 = 0.0;
                    result.v.M41 = (left + right) / (left - right);
                    result.v.M42 = (top + bottom) / (bottom - top);
                    result.v.M43 = zNearPlane / (zNearPlane - zFarPlane);
                    result.v.M44 = 1.0;
                },
                /**
                 * Creates a new projection {@link } for perspective view.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {number}                            width                Width of the viewing volume.
                 * @param   {number}                            height               Height of the viewing volume.
                 * @param   {number}                            nearPlaneDistance    Distance to the near plane.
                 * @param   {number}                            farPlaneDistance     Distance to the far plane.
                 * @return  {Microsoft.Xna.Framework.Matrix}                         The new projection {@link } for perspective view.
                 */
                CreatePerspective: function (width, height, nearPlaneDistance, farPlaneDistance) {
                    var matrix = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.CreatePerspective$1(width, height, nearPlaneDistance, farPlaneDistance, matrix);
                    return matrix.v.$clone();
                },
                /**
                 * Creates a new projection {@link } for perspective view.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {number}                            width                Width of the viewing volume.
                 * @param   {number}                            height               Height of the viewing volume.
                 * @param   {number}                            nearPlaneDistance    Distance to the near plane.
                 * @param   {number}                            farPlaneDistance     Distance to the far plane.
                 * @param   {Microsoft.Xna.Framework.Matrix}    result               The new projection {@link } for perspective view as an output parameter.
                 * @return  {void}
                 */
                CreatePerspective$1: function (width, height, nearPlaneDistance, farPlaneDistance, result) {
                    if (nearPlaneDistance <= 0.0) {
                        throw new System.ArgumentException.$ctor1("nearPlaneDistance <= 0");
                    }
                    if (farPlaneDistance <= 0.0) {
                        throw new System.ArgumentException.$ctor1("farPlaneDistance <= 0");
                    }
                    if (nearPlaneDistance >= farPlaneDistance) {
                        throw new System.ArgumentException.$ctor1("nearPlaneDistance >= farPlaneDistance");
                    }
                    result.v.M11 = (2.0 * nearPlaneDistance) / width;
                    result.v.M12 = (result.v.M13 = (result.v.M14 = 0.0));
                    result.v.M22 = (2.0 * nearPlaneDistance) / height;
                    result.v.M21 = (result.v.M23 = (result.v.M24 = 0.0));
                    result.v.M33 = farPlaneDistance / (nearPlaneDistance - farPlaneDistance);
                    result.v.M31 = (result.v.M32 = 0.0);
                    result.v.M34 = -1.0;
                    result.v.M41 = (result.v.M42 = (result.v.M44 = 0.0));
                    result.v.M43 = (nearPlaneDistance * farPlaneDistance) / (nearPlaneDistance - farPlaneDistance);
                },
                /**
                 * Creates a new projection {@link } for perspective view with field of view.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {number}                            fieldOfView          Field of view in the y direction in radians.
                 * @param   {number}                            aspectRatio          Width divided by height of the viewing volume.
                 * @param   {number}                            nearPlaneDistance    Distance to the near plane.
                 * @param   {number}                            farPlaneDistance     Distance to the far plane.
                 * @return  {Microsoft.Xna.Framework.Matrix}                         The new projection {@link } for perspective view with FOV.
                 */
                CreatePerspectiveFieldOfView: function (fieldOfView, aspectRatio, nearPlaneDistance, farPlaneDistance) {
                    var result = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.CreatePerspectiveFieldOfView$1(fieldOfView, aspectRatio, nearPlaneDistance, farPlaneDistance, result);
                    return result.v.$clone();
                },
                /**
                 * Creates a new projection {@link } for perspective view with field of view.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {number}                            fieldOfView          Field of view in the y direction in radians.
                 * @param   {number}                            aspectRatio          Width divided by height of the viewing volume.
                 * @param   {number}                            nearPlaneDistance    Distance of the near plane.
                 * @param   {number}                            farPlaneDistance     Distance of the far plane.
                 * @param   {Microsoft.Xna.Framework.Matrix}    result               The new projection {@link } for perspective view with FOV as an output parameter.
                 * @return  {void}
                 */
                CreatePerspectiveFieldOfView$1: function (fieldOfView, aspectRatio, nearPlaneDistance, farPlaneDistance, result) {
                    if ((fieldOfView <= 0.0) || (fieldOfView >= 3.141593)) {
                        throw new System.ArgumentException.$ctor1("fieldOfView <= 0 or >= PI");
                    }
                    if (nearPlaneDistance <= 0.0) {
                        throw new System.ArgumentException.$ctor1("nearPlaneDistance <= 0");
                    }
                    if (farPlaneDistance <= 0.0) {
                        throw new System.ArgumentException.$ctor1("farPlaneDistance <= 0");
                    }
                    if (nearPlaneDistance >= farPlaneDistance) {
                        throw new System.ArgumentException.$ctor1("nearPlaneDistance >= farPlaneDistance");
                    }
                    var num = 1.0 / Math.tan(fieldOfView * 0.5);
                    var num9 = num / aspectRatio;
                    result.v.M11 = num9;
                    result.v.M12 = (result.v.M13 = (result.v.M14 = 0));
                    result.v.M22 = num;
                    result.v.M21 = (result.v.M23 = (result.v.M24 = 0));
                    result.v.M31 = (result.v.M32 = 0.0);
                    result.v.M33 = farPlaneDistance / (nearPlaneDistance - farPlaneDistance);
                    result.v.M34 = -1;
                    result.v.M41 = (result.v.M42 = (result.v.M44 = 0));
                    result.v.M43 = (nearPlaneDistance * farPlaneDistance) / (nearPlaneDistance - farPlaneDistance);
                },
                /**
                 * Creates a new projection {@link } for customized perspective view.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {number}                            left                 Lower x-value at the near plane.
                 * @param   {number}                            right                Upper x-value at the near plane.
                 * @param   {number}                            bottom               Lower y-coordinate at the near plane.
                 * @param   {number}                            top                  Upper y-value at the near plane.
                 * @param   {number}                            nearPlaneDistance    Distance to the near plane.
                 * @param   {number}                            farPlaneDistance     Distance to the far plane.
                 * @return  {Microsoft.Xna.Framework.Matrix}                         The new {@link } for customized perspective view.
                 */
                CreatePerspectiveOffCenter$1: function (left, right, bottom, top, nearPlaneDistance, farPlaneDistance) {
                    var result = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.CreatePerspectiveOffCenter$2(left, right, bottom, top, nearPlaneDistance, farPlaneDistance, result);
                    return result.v.$clone();
                },
                /**
                 * Creates a new projection {@link } for customized perspective view.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Rectangle}    viewingVolume        The viewing volume.
                 * @param   {number}                               nearPlaneDistance    Distance to the near plane.
                 * @param   {number}                               farPlaneDistance     Distance to the far plane.
                 * @return  {Microsoft.Xna.Framework.Matrix}                            The new {@link } for customized perspective view.
                 */
                CreatePerspectiveOffCenter: function (viewingVolume, nearPlaneDistance, farPlaneDistance) {
                    var result = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.CreatePerspectiveOffCenter$2(viewingVolume.Left, viewingVolume.Right, viewingVolume.Bottom, viewingVolume.Top, nearPlaneDistance, farPlaneDistance, result);
                    return result.v.$clone();
                },
                /**
                 * Creates a new projection {@link } for customized perspective view.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {number}                            left                 Lower x-value at the near plane.
                 * @param   {number}                            right                Upper x-value at the near plane.
                 * @param   {number}                            bottom               Lower y-coordinate at the near plane.
                 * @param   {number}                            top                  Upper y-value at the near plane.
                 * @param   {number}                            nearPlaneDistance    Distance to the near plane.
                 * @param   {number}                            farPlaneDistance     Distance to the far plane.
                 * @param   {Microsoft.Xna.Framework.Matrix}    result               The new {@link } for customized perspective view as an output parameter.
                 * @return  {void}
                 */
                CreatePerspectiveOffCenter$2: function (left, right, bottom, top, nearPlaneDistance, farPlaneDistance, result) {
                    if (nearPlaneDistance <= 0.0) {
                        throw new System.ArgumentException.$ctor1("nearPlaneDistance <= 0");
                    }
                    if (farPlaneDistance <= 0.0) {
                        throw new System.ArgumentException.$ctor1("farPlaneDistance <= 0");
                    }
                    if (nearPlaneDistance >= farPlaneDistance) {
                        throw new System.ArgumentException.$ctor1("nearPlaneDistance >= farPlaneDistance");
                    }
                    result.v.M11 = (2.0 * nearPlaneDistance) / (right - left);
                    result.v.M12 = (result.v.M13 = (result.v.M14 = 0));
                    result.v.M22 = (2.0 * nearPlaneDistance) / (top - bottom);
                    result.v.M21 = (result.v.M23 = (result.v.M24 = 0));
                    result.v.M31 = (left + right) / (right - left);
                    result.v.M32 = (top + bottom) / (top - bottom);
                    result.v.M33 = farPlaneDistance / (nearPlaneDistance - farPlaneDistance);
                    result.v.M34 = -1;
                    result.v.M43 = (nearPlaneDistance * farPlaneDistance) / (nearPlaneDistance - farPlaneDistance);
                    result.v.M41 = (result.v.M42 = (result.v.M44 = 0));
                },
                /**
                 * Creates a new rotation {@link } around X axis.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {number}                            radians    Angle in radians.
                 * @return  {Microsoft.Xna.Framework.Matrix}               The rotation {@link } around X axis.
                 */
                CreateRotationX: function (radians) {
                    var result = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.CreateRotationX$1(radians, result);
                    return result.v.$clone();
                },
                /**
                 * Creates a new rotation {@link } around X axis.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {number}                            radians    Angle in radians.
                 * @param   {Microsoft.Xna.Framework.Matrix}    result     The rotation {@link } around X axis as an output parameter.
                 * @return  {void}
                 */
                CreateRotationX$1: function (radians, result) {
                    result.v = Microsoft.Xna.Framework.Matrix.Identity.$clone();

                    var val1 = Math.cos(radians);
                    var val2 = Math.sin(radians);

                    result.v.M22 = val1;
                    result.v.M23 = val2;
                    result.v.M32 = -val2;
                    result.v.M33 = val1;
                },
                /**
                 * Creates a new rotation {@link } around Y axis.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {number}                            radians    Angle in radians.
                 * @return  {Microsoft.Xna.Framework.Matrix}               The rotation {@link } around Y axis.
                 */
                CreateRotationY: function (radians) {
                    var result = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.CreateRotationY$1(radians, result);
                    return result.v.$clone();
                },
                /**
                 * Creates a new rotation {@link } around Y axis.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {number}                            radians    Angle in radians.
                 * @param   {Microsoft.Xna.Framework.Matrix}    result     The rotation {@link } around Y axis as an output parameter.
                 * @return  {void}
                 */
                CreateRotationY$1: function (radians, result) {
                    result.v = Microsoft.Xna.Framework.Matrix.Identity.$clone();

                    var val1 = Math.cos(radians);
                    var val2 = Math.sin(radians);

                    result.v.M11 = val1;
                    result.v.M13 = -val2;
                    result.v.M31 = val2;
                    result.v.M33 = val1;
                },
                /**
                 * Creates a new rotation {@link } around Z axis.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {number}                            radians    Angle in radians.
                 * @return  {Microsoft.Xna.Framework.Matrix}               The rotation {@link } around Z axis.
                 */
                CreateRotationZ: function (radians) {
                    var result = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.CreateRotationZ$1(radians, result);
                    return result.v.$clone();
                },
                /**
                 * Creates a new rotation {@link } around Z axis.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {number}                            radians    Angle in radians.
                 * @param   {Microsoft.Xna.Framework.Matrix}    result     The rotation {@link } around Z axis as an output parameter.
                 * @return  {void}
                 */
                CreateRotationZ$1: function (radians, result) {
                    result.v = Microsoft.Xna.Framework.Matrix.Identity.$clone();

                    var val1 = Math.cos(radians);
                    var val2 = Math.sin(radians);

                    result.v.M11 = val1;
                    result.v.M12 = val2;
                    result.v.M21 = -val2;
                    result.v.M22 = val1;
                },
                /**
                 * Creates a new scaling {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {number}                            scale    Scale value for all three axises.
                 * @return  {Microsoft.Xna.Framework.Matrix}             The scaling {@link }.
                 */
                CreateScale$1: function (scale) {
                    var result = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.CreateScale$5(scale, scale, scale, result);
                    return result.v.$clone();
                },
                /**
                 * Creates a new scaling {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {number}                            scale     Scale value for all three axises.
                 * @param   {Microsoft.Xna.Framework.Matrix}    result    The scaling {@link } as an output parameter.
                 * @return  {void}
                 */
                CreateScale$4: function (scale, result) {
                    Microsoft.Xna.Framework.Matrix.CreateScale$5(scale, scale, scale, result);
                },
                /**
                 * Creates a new scaling {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {number}                            xScale    Scale value for X axis.
                 * @param   {number}                            yScale    Scale value for Y axis.
                 * @param   {number}                            zScale    Scale value for Z axis.
                 * @return  {Microsoft.Xna.Framework.Matrix}              The scaling {@link }.
                 */
                CreateScale$2: function (xScale, yScale, zScale) {
                    var result = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.CreateScale$5(xScale, yScale, zScale, result);
                    return result.v.$clone();
                },
                /**
                 * Creates a new scaling {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {number}                            xScale    Scale value for X axis.
                 * @param   {number}                            yScale    Scale value for Y axis.
                 * @param   {number}                            zScale    Scale value for Z axis.
                 * @param   {Microsoft.Xna.Framework.Matrix}    result    The scaling {@link } as an output parameter.
                 * @return  {void}
                 */
                CreateScale$5: function (xScale, yScale, zScale, result) {
                    result.v.M11 = xScale;
                    result.v.M12 = 0;
                    result.v.M13 = 0;
                    result.v.M14 = 0;
                    result.v.M21 = 0;
                    result.v.M22 = yScale;
                    result.v.M23 = 0;
                    result.v.M24 = 0;
                    result.v.M31 = 0;
                    result.v.M32 = 0;
                    result.v.M33 = zScale;
                    result.v.M34 = 0;
                    result.v.M41 = 0;
                    result.v.M42 = 0;
                    result.v.M43 = 0;
                    result.v.M44 = 1;
                },
                /**
                 * Creates a new scaling {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Vector3}    scales    {@link } representing x,y and z scale values.
                 * @return  {Microsoft.Xna.Framework.Matrix}               The scaling {@link }.
                 */
                CreateScale: function (scales) {
                    scales = {v:scales};
                    var result = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.CreateScale$3(scales, result);
                    return result.v.$clone();
                },
                /**
                 * Creates a new scaling {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Vector3}    scales    {@link } representing x,y and z scale values.
                 * @param   {Microsoft.Xna.Framework.Matrix}     result    The scaling {@link } as an output parameter.
                 * @return  {void}
                 */
                CreateScale$3: function (scales, result) {
                    result.v.M11 = scales.v.X;
                    result.v.M12 = 0;
                    result.v.M13 = 0;
                    result.v.M14 = 0;
                    result.v.M21 = 0;
                    result.v.M22 = scales.v.Y;
                    result.v.M23 = 0;
                    result.v.M24 = 0;
                    result.v.M31 = 0;
                    result.v.M32 = 0;
                    result.v.M33 = scales.v.Z;
                    result.v.M34 = 0;
                    result.v.M41 = 0;
                    result.v.M42 = 0;
                    result.v.M43 = 0;
                    result.v.M44 = 1;
                },
                /**
                 * Creates a new {@link } that flattens geometry into a specified {@link } as if casting a shadow from a specified light source.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Vector3}    lightDirection    A vector specifying the direction from which the light that will cast the shadow is coming.
                 * @param   {Microsoft.Xna.Framework.Plane}      plane             The plane onto which the new matrix should flatten geometry so as to cast a shadow.
                 * @return  {Microsoft.Xna.Framework.Matrix}                       A {@link } that can be used to flatten geometry onto the specified plane from the specified direction.
                 */
                CreateShadow: function (lightDirection, plane) {
                    lightDirection = {v:lightDirection};
                    plane = {v:plane};
                    var result = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.CreateShadow$1(lightDirection, plane, result);
                    return result.v.$clone();
                },
                /**
                 * Creates a new {@link } that flattens geometry into a specified {@link } as if casting a shadow from a specified light source.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Vector3}    lightDirection    A vector specifying the direction from which the light that will cast the shadow is coming.
                 * @param   {Microsoft.Xna.Framework.Plane}      plane             The plane onto which the new matrix should flatten geometry so as to cast a shadow.
                 * @param   {Microsoft.Xna.Framework.Matrix}     result            A {@link } that can be used to flatten geometry onto the specified plane from the specified direction as an output parameter.
                 * @return  {void}
                 */
                CreateShadow$1: function (lightDirection, plane, result) {
                    var dot = (plane.v.Normal.X * lightDirection.v.X) + (plane.v.Normal.Y * lightDirection.v.Y) + (plane.v.Normal.Z * lightDirection.v.Z);
                    var x = -plane.v.Normal.X;
                    var y = -plane.v.Normal.Y;
                    var z = -plane.v.Normal.Z;
                    var d = -plane.v.D;

                    result.v.M11 = (x * lightDirection.v.X) + dot;
                    result.v.M12 = x * lightDirection.v.Y;
                    result.v.M13 = x * lightDirection.v.Z;
                    result.v.M14 = 0;
                    result.v.M21 = y * lightDirection.v.X;
                    result.v.M22 = (y * lightDirection.v.Y) + dot;
                    result.v.M23 = y * lightDirection.v.Z;
                    result.v.M24 = 0;
                    result.v.M31 = z * lightDirection.v.X;
                    result.v.M32 = z * lightDirection.v.Y;
                    result.v.M33 = (z * lightDirection.v.Z) + dot;
                    result.v.M34 = 0;
                    result.v.M41 = d * lightDirection.v.X;
                    result.v.M42 = d * lightDirection.v.Y;
                    result.v.M43 = d * lightDirection.v.Z;
                    result.v.M44 = dot;
                },
                /**
                 * Creates a new translation {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {number}                            xPosition    X coordinate of translation.
                 * @param   {number}                            yPosition    Y coordinate of translation.
                 * @param   {number}                            zPosition    Z coordinate of translation.
                 * @return  {Microsoft.Xna.Framework.Matrix}                 The translation {@link }.
                 */
                CreateTranslation$1: function (xPosition, yPosition, zPosition) {
                    var result = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.CreateTranslation$3(xPosition, yPosition, zPosition, result);
                    return result.v.$clone();
                },
                /**
                 * Creates a new translation {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Vector3}    position    X,Y and Z coordinates of translation.
                 * @param   {Microsoft.Xna.Framework.Matrix}     result      The translation {@link } as an output parameter.
                 * @return  {void}
                 */
                CreateTranslation$2: function (position, result) {
                    result.v.M11 = 1;
                    result.v.M12 = 0;
                    result.v.M13 = 0;
                    result.v.M14 = 0;
                    result.v.M21 = 0;
                    result.v.M22 = 1;
                    result.v.M23 = 0;
                    result.v.M24 = 0;
                    result.v.M31 = 0;
                    result.v.M32 = 0;
                    result.v.M33 = 1;
                    result.v.M34 = 0;
                    result.v.M41 = position.v.X;
                    result.v.M42 = position.v.Y;
                    result.v.M43 = position.v.Z;
                    result.v.M44 = 1;
                },
                /**
                 * Creates a new translation {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Vector3}    position    X,Y and Z coordinates of translation.
                 * @return  {Microsoft.Xna.Framework.Matrix}                 The translation {@link }.
                 */
                CreateTranslation: function (position) {
                    position = {v:position};
                    var result = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.CreateTranslation$2(position, result);
                    return result.v.$clone();
                },
                /**
                 * Creates a new translation {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {number}                            xPosition    X coordinate of translation.
                 * @param   {number}                            yPosition    Y coordinate of translation.
                 * @param   {number}                            zPosition    Z coordinate of translation.
                 * @param   {Microsoft.Xna.Framework.Matrix}    result       The translation {@link } as an output parameter.
                 * @return  {void}
                 */
                CreateTranslation$3: function (xPosition, yPosition, zPosition, result) {
                    result.v.M11 = 1;
                    result.v.M12 = 0;
                    result.v.M13 = 0;
                    result.v.M14 = 0;
                    result.v.M21 = 0;
                    result.v.M22 = 1;
                    result.v.M23 = 0;
                    result.v.M24 = 0;
                    result.v.M31 = 0;
                    result.v.M32 = 0;
                    result.v.M33 = 1;
                    result.v.M34 = 0;
                    result.v.M41 = xPosition;
                    result.v.M42 = yPosition;
                    result.v.M43 = zPosition;
                    result.v.M44 = 1;
                },
                /**
                 * Creates a new reflection {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Plane}     value    The plane that used for reflection calculation.
                 * @return  {Microsoft.Xna.Framework.Matrix}             The reflection {@link }.
                 */
                CreateReflection: function (value) {
                    value = {v:value};
                    var result = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.CreateReflection$1(value, result);
                    return result.v.$clone();
                },
                /**
                 * Creates a new reflection {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Plane}     value     The plane that used for reflection calculation.
                 * @param   {Microsoft.Xna.Framework.Matrix}    result    The reflection {@link } as an output parameter.
                 * @return  {void}
                 */
                CreateReflection$1: function (value, result) {
                    var plane = { v : new Microsoft.Xna.Framework.Plane() };
                    Microsoft.Xna.Framework.Plane.Normalize$1(value, plane);
                    var x = plane.v.Normal.X;
                    var y = plane.v.Normal.Y;
                    var z = plane.v.Normal.Z;
                    var num3 = -2.0 * x;
                    var num2 = -2.0 * y;
                    var num = -2.0 * z;
                    result.v.M11 = (num3 * x) + 1.0;
                    result.v.M12 = num2 * x;
                    result.v.M13 = num * x;
                    result.v.M14 = 0;
                    result.v.M21 = num3 * y;
                    result.v.M22 = (num2 * y) + 1;
                    result.v.M23 = num * y;
                    result.v.M24 = 0;
                    result.v.M31 = num3 * z;
                    result.v.M32 = num2 * z;
                    result.v.M33 = (num * z) + 1;
                    result.v.M34 = 0;
                    result.v.M41 = num3 * plane.v.D;
                    result.v.M42 = num2 * plane.v.D;
                    result.v.M43 = num * plane.v.D;
                    result.v.M44 = 1;
                },
                /**
                 * Creates a new world {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Vector3}    position    The position vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    forward     The forward direction vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    up          The upward direction vector. Usually {@link }.
                 * @return  {Microsoft.Xna.Framework.Matrix}                 The world {@link }.
                 */
                CreateWorld: function (position, forward, up) {
                    position = {v:position};
                    forward = {v:forward};
                    up = {v:up};
                    var ret = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.CreateWorld$1(position, forward, up, ret);
                    return ret.v.$clone();
                },
                /**
                 * Creates a new world {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Vector3}    position    The position vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    forward     The forward direction vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    up          The upward direction vector. Usually {@link }.
                 * @param   {Microsoft.Xna.Framework.Matrix}     result      The world {@link } as an output parameter.
                 * @return  {void}
                 */
                CreateWorld$1: function (position, forward, up, result) {
                    var x = { v : new Microsoft.Xna.Framework.Vector3() }, y = { v : new Microsoft.Xna.Framework.Vector3() }, z = { v : new Microsoft.Xna.Framework.Vector3() };
                    Microsoft.Xna.Framework.Vector3.Normalize$1(forward, z);
                    Microsoft.Xna.Framework.Vector3.Cross$1(forward, up, x);
                    Microsoft.Xna.Framework.Vector3.Cross$1(x, forward, y);
                    x.v.Normalize();
                    y.v.Normalize();

                    result.v = new Microsoft.Xna.Framework.Matrix.ctor();
                    result.v.Right = x.v.$clone();
                    result.v.Up = y.v.$clone();
                    result.v.Forward = z.v.$clone();
                    result.v.Translation = position.v.$clone();
                    result.v.M44 = 1.0;
                },
                /**
                 * Divides the elements of a {@link } by the elements of another matrix.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix2    Divisor {@link }.
                 * @return  {Microsoft.Xna.Framework.Matrix}               The result of dividing the matrix.
                 */
                Divide: function (matrix1, matrix2) {
                    matrix1.M11 = matrix1.M11 / matrix2.M11;
                    matrix1.M12 = matrix1.M12 / matrix2.M12;
                    matrix1.M13 = matrix1.M13 / matrix2.M13;
                    matrix1.M14 = matrix1.M14 / matrix2.M14;
                    matrix1.M21 = matrix1.M21 / matrix2.M21;
                    matrix1.M22 = matrix1.M22 / matrix2.M22;
                    matrix1.M23 = matrix1.M23 / matrix2.M23;
                    matrix1.M24 = matrix1.M24 / matrix2.M24;
                    matrix1.M31 = matrix1.M31 / matrix2.M31;
                    matrix1.M32 = matrix1.M32 / matrix2.M32;
                    matrix1.M33 = matrix1.M33 / matrix2.M33;
                    matrix1.M34 = matrix1.M34 / matrix2.M34;
                    matrix1.M41 = matrix1.M41 / matrix2.M41;
                    matrix1.M42 = matrix1.M42 / matrix2.M42;
                    matrix1.M43 = matrix1.M43 / matrix2.M43;
                    matrix1.M44 = matrix1.M44 / matrix2.M44;
                    return matrix1.$clone();
                },
                /**
                 * Divides the elements of a {@link } by the elements of another matrix.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix2    Divisor {@link }.
                 * @param   {Microsoft.Xna.Framework.Matrix}    result     The result of dividing the matrix as an output parameter.
                 * @return  {void}
                 */
                Divide$2: function (matrix1, matrix2, result) {
                    result.v.M11 = matrix1.v.M11 / matrix2.v.M11;
                    result.v.M12 = matrix1.v.M12 / matrix2.v.M12;
                    result.v.M13 = matrix1.v.M13 / matrix2.v.M13;
                    result.v.M14 = matrix1.v.M14 / matrix2.v.M14;
                    result.v.M21 = matrix1.v.M21 / matrix2.v.M21;
                    result.v.M22 = matrix1.v.M22 / matrix2.v.M22;
                    result.v.M23 = matrix1.v.M23 / matrix2.v.M23;
                    result.v.M24 = matrix1.v.M24 / matrix2.v.M24;
                    result.v.M31 = matrix1.v.M31 / matrix2.v.M31;
                    result.v.M32 = matrix1.v.M32 / matrix2.v.M32;
                    result.v.M33 = matrix1.v.M33 / matrix2.v.M33;
                    result.v.M34 = matrix1.v.M34 / matrix2.v.M34;
                    result.v.M41 = matrix1.v.M41 / matrix2.v.M41;
                    result.v.M42 = matrix1.v.M42 / matrix2.v.M42;
                    result.v.M43 = matrix1.v.M43 / matrix2.v.M43;
                    result.v.M44 = matrix1.v.M44 / matrix2.v.M44;
                },
                /**
                 * Divides the elements of a {@link } by a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix1    Source {@link }.
                 * @param   {number}                            divider    Divisor scalar.
                 * @return  {Microsoft.Xna.Framework.Matrix}               The result of dividing a matrix by a scalar.
                 */
                Divide$1: function (matrix1, divider) {
                    var num = 1.0 / divider;
                    matrix1.M11 = matrix1.M11 * num;
                    matrix1.M12 = matrix1.M12 * num;
                    matrix1.M13 = matrix1.M13 * num;
                    matrix1.M14 = matrix1.M14 * num;
                    matrix1.M21 = matrix1.M21 * num;
                    matrix1.M22 = matrix1.M22 * num;
                    matrix1.M23 = matrix1.M23 * num;
                    matrix1.M24 = matrix1.M24 * num;
                    matrix1.M31 = matrix1.M31 * num;
                    matrix1.M32 = matrix1.M32 * num;
                    matrix1.M33 = matrix1.M33 * num;
                    matrix1.M34 = matrix1.M34 * num;
                    matrix1.M41 = matrix1.M41 * num;
                    matrix1.M42 = matrix1.M42 * num;
                    matrix1.M43 = matrix1.M43 * num;
                    matrix1.M44 = matrix1.M44 * num;
                    return matrix1.$clone();
                },
                /**
                 * Divides the elements of a {@link } by a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix1    Source {@link }.
                 * @param   {number}                            divider    Divisor scalar.
                 * @param   {Microsoft.Xna.Framework.Matrix}    result     The result of dividing a matrix by a scalar as an output parameter.
                 * @return  {void}
                 */
                Divide$3: function (matrix1, divider, result) {
                    var num = 1.0 / divider;
                    result.v.M11 = matrix1.v.M11 * num;
                    result.v.M12 = matrix1.v.M12 * num;
                    result.v.M13 = matrix1.v.M13 * num;
                    result.v.M14 = matrix1.v.M14 * num;
                    result.v.M21 = matrix1.v.M21 * num;
                    result.v.M22 = matrix1.v.M22 * num;
                    result.v.M23 = matrix1.v.M23 * num;
                    result.v.M24 = matrix1.v.M24 * num;
                    result.v.M31 = matrix1.v.M31 * num;
                    result.v.M32 = matrix1.v.M32 * num;
                    result.v.M33 = matrix1.v.M33 * num;
                    result.v.M34 = matrix1.v.M34 * num;
                    result.v.M41 = matrix1.v.M41 * num;
                    result.v.M42 = matrix1.v.M42 * num;
                    result.v.M43 = matrix1.v.M43 * num;
                    result.v.M44 = matrix1.v.M44 * num;
                },
                /**
                 * Creates a new {@link } which contains inversion of the specified matrix.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix    Source {@link }.
                 * @return  {Microsoft.Xna.Framework.Matrix}              The inverted matrix.
                 */
                Invert: function (matrix) {
                    matrix = {v:matrix};
                    var result = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.Invert$1(matrix, result);
                    return result.v.$clone();
                },
                /**
                 * Creates a new {@link } which contains inversion of the specified matrix.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Matrix}    result    The inverted matrix as output parameter.
                 * @return  {void}
                 */
                Invert$1: function (matrix, result) {
                    var num1 = matrix.v.M11;
                    var num2 = matrix.v.M12;
                    var num3 = matrix.v.M13;
                    var num4 = matrix.v.M14;
                    var num5 = matrix.v.M21;
                    var num6 = matrix.v.M22;
                    var num7 = matrix.v.M23;
                    var num8 = matrix.v.M24;
                    var num9 = matrix.v.M31;
                    var num10 = matrix.v.M32;
                    var num11 = matrix.v.M33;
                    var num12 = matrix.v.M34;
                    var num13 = matrix.v.M41;
                    var num14 = matrix.v.M42;
                    var num15 = matrix.v.M43;
                    var num16 = matrix.v.M44;
                    var num17 = num11 * num16 - num12 * num15;
                    var num18 = num10 * num16 - num12 * num14;
                    var num19 = num10 * num15 - num11 * num14;
                    var num20 = num9 * num16 - num12 * num13;
                    var num21 = num9 * num15 - num11 * num13;
                    var num22 = num9 * num14 - num10 * num13;
                    var num23 = num6 * num17 - num7 * num18 + num8 * num19;
                    var num24 = -(num5 * num17 - num7 * num20 + num8 * num21);
                    var num25 = num5 * num18 - num6 * num20 + num8 * num22;
                    var num26 = -(num5 * num19 - num6 * num21 + num7 * num22);
                    var num27 = 1.0 / (num1 * num23 + num2 * num24 + num3 * num25 + num4 * num26);

                    result.v.M11 = num23 * num27;
                    result.v.M21 = num24 * num27;
                    result.v.M31 = num25 * num27;
                    result.v.M41 = num26 * num27;
                    result.v.M12 = -(num2 * num17 - num3 * num18 + num4 * num19) * num27;
                    result.v.M22 = (num1 * num17 - num3 * num20 + num4 * num21) * num27;
                    result.v.M32 = -(num1 * num18 - num2 * num20 + num4 * num22) * num27;
                    result.v.M42 = (num1 * num19 - num2 * num21 + num3 * num22) * num27;
                    var num28 = num7 * num16 - num8 * num15;
                    var num29 = num6 * num16 - num8 * num14;
                    var num30 = num6 * num15 - num7 * num14;
                    var num31 = num5 * num16 - num8 * num13;
                    var num32 = num5 * num15 - num7 * num13;
                    var num33 = num5 * num14 - num6 * num13;
                    result.v.M13 = (num2 * num28 - num3 * num29 + num4 * num30) * num27;
                    result.v.M23 = -(num1 * num28 - num3 * num31 + num4 * num32) * num27;
                    result.v.M33 = (num1 * num29 - num2 * num31 + num4 * num33) * num27;
                    result.v.M43 = -(num1 * num30 - num2 * num32 + num3 * num33) * num27;
                    var num34 = num7 * num12 - num8 * num11;
                    var num35 = num6 * num12 - num8 * num10;
                    var num36 = num6 * num11 - num7 * num10;
                    var num37 = num5 * num12 - num8 * num9;
                    var num38 = num5 * num11 - num7 * num9;
                    var num39 = num5 * num10 - num6 * num9;
                    result.v.M14 = -(num2 * num34 - num3 * num35 + num4 * num36) * num27;
                    result.v.M24 = (num1 * num34 - num3 * num37 + num4 * num38) * num27;
                    result.v.M34 = -(num1 * num35 - num2 * num37 + num4 * num39) * num27;
                    result.v.M44 = (num1 * num36 - num2 * num38 + num3 * num39) * num27;


                    /* 
                    			
                    			
                    ///
                    // Use Laplace expansion theorem to calculate the inverse of a 4x4 matrix
                    // 
                    // 1. Calculate the 2x2 determinants needed the 4x4 determinant based on the 2x2 determinants 
                    // 3. Create the adjugate matrix, which satisfies: A * adj(A) = det(A) * I
                    // 4. Divide adjugate matrix with the determinant to find the inverse

                    float det1, det2, det3, det4, det5, det6, det7, det8, det9, det10, det11, det12;
                    float detMatrix;
                    FindDeterminants(ref matrix, out detMatrix, out det1, out det2, out det3, out det4, out det5, out det6, 
                                    out det7, out det8, out det9, out det10, out det11, out det12);

                    float invDetMatrix = 1f / detMatrix;

                    Matrix ret; // Allow for matrix and result to point to the same structure

                    ret.M11 = (matrix.M22*det12 - matrix.M23*det11 + matrix.M24*det10) * invDetMatrix;
                    ret.M12 = (-matrix.M12*det12 + matrix.M13*det11 - matrix.M14*det10) * invDetMatrix;
                    ret.M13 = (matrix.M42*det6 - matrix.M43*det5 + matrix.M44*det4) * invDetMatrix;
                    ret.M14 = (-matrix.M32*det6 + matrix.M33*det5 - matrix.M34*det4) * invDetMatrix;
                    ret.M21 = (-matrix.M21*det12 + matrix.M23*det9 - matrix.M24*det8) * invDetMatrix;
                    ret.M22 = (matrix.M11*det12 - matrix.M13*det9 + matrix.M14*det8) * invDetMatrix;
                    ret.M23 = (-matrix.M41*det6 + matrix.M43*det3 - matrix.M44*det2) * invDetMatrix;
                    ret.M24 = (matrix.M31*det6 - matrix.M33*det3 + matrix.M34*det2) * invDetMatrix;
                    ret.M31 = (matrix.M21*det11 - matrix.M22*det9 + matrix.M24*det7) * invDetMatrix;
                    ret.M32 = (-matrix.M11*det11 + matrix.M12*det9 - matrix.M14*det7) * invDetMatrix;
                    ret.M33 = (matrix.M41*det5 - matrix.M42*det3 + matrix.M44*det1) * invDetMatrix;
                    ret.M34 = (-matrix.M31*det5 + matrix.M32*det3 - matrix.M34*det1) * invDetMatrix;
                    ret.M41 = (-matrix.M21*det10 + matrix.M22*det8 - matrix.M23*det7) * invDetMatrix;
                    ret.M42 = (matrix.M11*det10 - matrix.M12*det8 + matrix.M13*det7) * invDetMatrix;
                    ret.M43 = (-matrix.M41*det4 + matrix.M42*det2 - matrix.M43*det1) * invDetMatrix;
                    ret.M44 = (matrix.M31*det4 - matrix.M32*det2 + matrix.M33*det1) * invDetMatrix;

                    result = ret;
                    */
                },
                /**
                 * Creates a new {@link } that contains linear interpolation of the values in specified matrixes.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix1    The first {@link }.
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix2    The second {@link }.
                 * @param   {number}                            amount     Weighting value(between 0.0 and 1.0).
                 * @return  {Microsoft.Xna.Framework.Matrix}               &gt;The result of linear interpolation of the specified matrixes.
                 */
                Lerp: function (matrix1, matrix2, amount) {
                    matrix1.M11 = matrix1.M11 + ((matrix2.M11 - matrix1.M11) * amount);
                    matrix1.M12 = matrix1.M12 + ((matrix2.M12 - matrix1.M12) * amount);
                    matrix1.M13 = matrix1.M13 + ((matrix2.M13 - matrix1.M13) * amount);
                    matrix1.M14 = matrix1.M14 + ((matrix2.M14 - matrix1.M14) * amount);
                    matrix1.M21 = matrix1.M21 + ((matrix2.M21 - matrix1.M21) * amount);
                    matrix1.M22 = matrix1.M22 + ((matrix2.M22 - matrix1.M22) * amount);
                    matrix1.M23 = matrix1.M23 + ((matrix2.M23 - matrix1.M23) * amount);
                    matrix1.M24 = matrix1.M24 + ((matrix2.M24 - matrix1.M24) * amount);
                    matrix1.M31 = matrix1.M31 + ((matrix2.M31 - matrix1.M31) * amount);
                    matrix1.M32 = matrix1.M32 + ((matrix2.M32 - matrix1.M32) * amount);
                    matrix1.M33 = matrix1.M33 + ((matrix2.M33 - matrix1.M33) * amount);
                    matrix1.M34 = matrix1.M34 + ((matrix2.M34 - matrix1.M34) * amount);
                    matrix1.M41 = matrix1.M41 + ((matrix2.M41 - matrix1.M41) * amount);
                    matrix1.M42 = matrix1.M42 + ((matrix2.M42 - matrix1.M42) * amount);
                    matrix1.M43 = matrix1.M43 + ((matrix2.M43 - matrix1.M43) * amount);
                    matrix1.M44 = matrix1.M44 + ((matrix2.M44 - matrix1.M44) * amount);
                    return matrix1.$clone();
                },
                /**
                 * Creates a new {@link } that contains linear interpolation of the values in specified matrixes.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix1    The first {@link }.
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix2    The second {@link }.
                 * @param   {number}                            amount     Weighting value(between 0.0 and 1.0).
                 * @param   {Microsoft.Xna.Framework.Matrix}    result     The result of linear interpolation of the specified matrixes as an output parameter.
                 * @return  {void}
                 */
                Lerp$1: function (matrix1, matrix2, amount, result) {
                    result.v.M11 = matrix1.v.M11 + ((matrix2.v.M11 - matrix1.v.M11) * amount);
                    result.v.M12 = matrix1.v.M12 + ((matrix2.v.M12 - matrix1.v.M12) * amount);
                    result.v.M13 = matrix1.v.M13 + ((matrix2.v.M13 - matrix1.v.M13) * amount);
                    result.v.M14 = matrix1.v.M14 + ((matrix2.v.M14 - matrix1.v.M14) * amount);
                    result.v.M21 = matrix1.v.M21 + ((matrix2.v.M21 - matrix1.v.M21) * amount);
                    result.v.M22 = matrix1.v.M22 + ((matrix2.v.M22 - matrix1.v.M22) * amount);
                    result.v.M23 = matrix1.v.M23 + ((matrix2.v.M23 - matrix1.v.M23) * amount);
                    result.v.M24 = matrix1.v.M24 + ((matrix2.v.M24 - matrix1.v.M24) * amount);
                    result.v.M31 = matrix1.v.M31 + ((matrix2.v.M31 - matrix1.v.M31) * amount);
                    result.v.M32 = matrix1.v.M32 + ((matrix2.v.M32 - matrix1.v.M32) * amount);
                    result.v.M33 = matrix1.v.M33 + ((matrix2.v.M33 - matrix1.v.M33) * amount);
                    result.v.M34 = matrix1.v.M34 + ((matrix2.v.M34 - matrix1.v.M34) * amount);
                    result.v.M41 = matrix1.v.M41 + ((matrix2.v.M41 - matrix1.v.M41) * amount);
                    result.v.M42 = matrix1.v.M42 + ((matrix2.v.M42 - matrix1.v.M42) * amount);
                    result.v.M43 = matrix1.v.M43 + ((matrix2.v.M43 - matrix1.v.M43) * amount);
                    result.v.M44 = matrix1.v.M44 + ((matrix2.v.M44 - matrix1.v.M44) * amount);
                },
                /**
                 * Creates a new {@link } that contains a multiplication of two matrix.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix2    Source {@link }.
                 * @return  {Microsoft.Xna.Framework.Matrix}               Result of the matrix multiplication.
                 */
                Multiply: function (matrix1, matrix2) {
                    var m11 = (((matrix1.M11 * matrix2.M11) + (matrix1.M12 * matrix2.M21)) + (matrix1.M13 * matrix2.M31)) + (matrix1.M14 * matrix2.M41);
                    var m12 = (((matrix1.M11 * matrix2.M12) + (matrix1.M12 * matrix2.M22)) + (matrix1.M13 * matrix2.M32)) + (matrix1.M14 * matrix2.M42);
                    var m13 = (((matrix1.M11 * matrix2.M13) + (matrix1.M12 * matrix2.M23)) + (matrix1.M13 * matrix2.M33)) + (matrix1.M14 * matrix2.M43);
                    var m14 = (((matrix1.M11 * matrix2.M14) + (matrix1.M12 * matrix2.M24)) + (matrix1.M13 * matrix2.M34)) + (matrix1.M14 * matrix2.M44);
                    var m21 = (((matrix1.M21 * matrix2.M11) + (matrix1.M22 * matrix2.M21)) + (matrix1.M23 * matrix2.M31)) + (matrix1.M24 * matrix2.M41);
                    var m22 = (((matrix1.M21 * matrix2.M12) + (matrix1.M22 * matrix2.M22)) + (matrix1.M23 * matrix2.M32)) + (matrix1.M24 * matrix2.M42);
                    var m23 = (((matrix1.M21 * matrix2.M13) + (matrix1.M22 * matrix2.M23)) + (matrix1.M23 * matrix2.M33)) + (matrix1.M24 * matrix2.M43);
                    var m24 = (((matrix1.M21 * matrix2.M14) + (matrix1.M22 * matrix2.M24)) + (matrix1.M23 * matrix2.M34)) + (matrix1.M24 * matrix2.M44);
                    var m31 = (((matrix1.M31 * matrix2.M11) + (matrix1.M32 * matrix2.M21)) + (matrix1.M33 * matrix2.M31)) + (matrix1.M34 * matrix2.M41);
                    var m32 = (((matrix1.M31 * matrix2.M12) + (matrix1.M32 * matrix2.M22)) + (matrix1.M33 * matrix2.M32)) + (matrix1.M34 * matrix2.M42);
                    var m33 = (((matrix1.M31 * matrix2.M13) + (matrix1.M32 * matrix2.M23)) + (matrix1.M33 * matrix2.M33)) + (matrix1.M34 * matrix2.M43);
                    var m34 = (((matrix1.M31 * matrix2.M14) + (matrix1.M32 * matrix2.M24)) + (matrix1.M33 * matrix2.M34)) + (matrix1.M34 * matrix2.M44);
                    var m41 = (((matrix1.M41 * matrix2.M11) + (matrix1.M42 * matrix2.M21)) + (matrix1.M43 * matrix2.M31)) + (matrix1.M44 * matrix2.M41);
                    var m42 = (((matrix1.M41 * matrix2.M12) + (matrix1.M42 * matrix2.M22)) + (matrix1.M43 * matrix2.M32)) + (matrix1.M44 * matrix2.M42);
                    var m43 = (((matrix1.M41 * matrix2.M13) + (matrix1.M42 * matrix2.M23)) + (matrix1.M43 * matrix2.M33)) + (matrix1.M44 * matrix2.M43);
                    var m44 = (((matrix1.M41 * matrix2.M14) + (matrix1.M42 * matrix2.M24)) + (matrix1.M43 * matrix2.M34)) + (matrix1.M44 * matrix2.M44);
                    matrix1.M11 = m11;
                    matrix1.M12 = m12;
                    matrix1.M13 = m13;
                    matrix1.M14 = m14;
                    matrix1.M21 = m21;
                    matrix1.M22 = m22;
                    matrix1.M23 = m23;
                    matrix1.M24 = m24;
                    matrix1.M31 = m31;
                    matrix1.M32 = m32;
                    matrix1.M33 = m33;
                    matrix1.M34 = m34;
                    matrix1.M41 = m41;
                    matrix1.M42 = m42;
                    matrix1.M43 = m43;
                    matrix1.M44 = m44;
                    return matrix1.$clone();
                },
                /**
                 * Creates a new {@link } that contains a multiplication of two matrix.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix2    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Matrix}    result     Result of the matrix multiplication as an output parameter.
                 * @return  {void}
                 */
                Multiply$2: function (matrix1, matrix2, result) {
                    var m11 = (((matrix1.v.M11 * matrix2.v.M11) + (matrix1.v.M12 * matrix2.v.M21)) + (matrix1.v.M13 * matrix2.v.M31)) + (matrix1.v.M14 * matrix2.v.M41);
                    var m12 = (((matrix1.v.M11 * matrix2.v.M12) + (matrix1.v.M12 * matrix2.v.M22)) + (matrix1.v.M13 * matrix2.v.M32)) + (matrix1.v.M14 * matrix2.v.M42);
                    var m13 = (((matrix1.v.M11 * matrix2.v.M13) + (matrix1.v.M12 * matrix2.v.M23)) + (matrix1.v.M13 * matrix2.v.M33)) + (matrix1.v.M14 * matrix2.v.M43);
                    var m14 = (((matrix1.v.M11 * matrix2.v.M14) + (matrix1.v.M12 * matrix2.v.M24)) + (matrix1.v.M13 * matrix2.v.M34)) + (matrix1.v.M14 * matrix2.v.M44);
                    var m21 = (((matrix1.v.M21 * matrix2.v.M11) + (matrix1.v.M22 * matrix2.v.M21)) + (matrix1.v.M23 * matrix2.v.M31)) + (matrix1.v.M24 * matrix2.v.M41);
                    var m22 = (((matrix1.v.M21 * matrix2.v.M12) + (matrix1.v.M22 * matrix2.v.M22)) + (matrix1.v.M23 * matrix2.v.M32)) + (matrix1.v.M24 * matrix2.v.M42);
                    var m23 = (((matrix1.v.M21 * matrix2.v.M13) + (matrix1.v.M22 * matrix2.v.M23)) + (matrix1.v.M23 * matrix2.v.M33)) + (matrix1.v.M24 * matrix2.v.M43);
                    var m24 = (((matrix1.v.M21 * matrix2.v.M14) + (matrix1.v.M22 * matrix2.v.M24)) + (matrix1.v.M23 * matrix2.v.M34)) + (matrix1.v.M24 * matrix2.v.M44);
                    var m31 = (((matrix1.v.M31 * matrix2.v.M11) + (matrix1.v.M32 * matrix2.v.M21)) + (matrix1.v.M33 * matrix2.v.M31)) + (matrix1.v.M34 * matrix2.v.M41);
                    var m32 = (((matrix1.v.M31 * matrix2.v.M12) + (matrix1.v.M32 * matrix2.v.M22)) + (matrix1.v.M33 * matrix2.v.M32)) + (matrix1.v.M34 * matrix2.v.M42);
                    var m33 = (((matrix1.v.M31 * matrix2.v.M13) + (matrix1.v.M32 * matrix2.v.M23)) + (matrix1.v.M33 * matrix2.v.M33)) + (matrix1.v.M34 * matrix2.v.M43);
                    var m34 = (((matrix1.v.M31 * matrix2.v.M14) + (matrix1.v.M32 * matrix2.v.M24)) + (matrix1.v.M33 * matrix2.v.M34)) + (matrix1.v.M34 * matrix2.v.M44);
                    var m41 = (((matrix1.v.M41 * matrix2.v.M11) + (matrix1.v.M42 * matrix2.v.M21)) + (matrix1.v.M43 * matrix2.v.M31)) + (matrix1.v.M44 * matrix2.v.M41);
                    var m42 = (((matrix1.v.M41 * matrix2.v.M12) + (matrix1.v.M42 * matrix2.v.M22)) + (matrix1.v.M43 * matrix2.v.M32)) + (matrix1.v.M44 * matrix2.v.M42);
                    var m43 = (((matrix1.v.M41 * matrix2.v.M13) + (matrix1.v.M42 * matrix2.v.M23)) + (matrix1.v.M43 * matrix2.v.M33)) + (matrix1.v.M44 * matrix2.v.M43);
                    var m44 = (((matrix1.v.M41 * matrix2.v.M14) + (matrix1.v.M42 * matrix2.v.M24)) + (matrix1.v.M43 * matrix2.v.M34)) + (matrix1.v.M44 * matrix2.v.M44);
                    result.v.M11 = m11;
                    result.v.M12 = m12;
                    result.v.M13 = m13;
                    result.v.M14 = m14;
                    result.v.M21 = m21;
                    result.v.M22 = m22;
                    result.v.M23 = m23;
                    result.v.M24 = m24;
                    result.v.M31 = m31;
                    result.v.M32 = m32;
                    result.v.M33 = m33;
                    result.v.M34 = m34;
                    result.v.M41 = m41;
                    result.v.M42 = m42;
                    result.v.M43 = m43;
                    result.v.M44 = m44;
                },
                /**
                 * Creates a new {@link } that contains a multiplication of {@link } and a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix1        Source {@link }.
                 * @param   {number}                            scaleFactor    Scalar value.
                 * @return  {Microsoft.Xna.Framework.Matrix}                   Result of the matrix multiplication with a scalar.
                 */
                Multiply$1: function (matrix1, scaleFactor) {
                    matrix1.M11 *= scaleFactor;
                    matrix1.M12 *= scaleFactor;
                    matrix1.M13 *= scaleFactor;
                    matrix1.M14 *= scaleFactor;
                    matrix1.M21 *= scaleFactor;
                    matrix1.M22 *= scaleFactor;
                    matrix1.M23 *= scaleFactor;
                    matrix1.M24 *= scaleFactor;
                    matrix1.M31 *= scaleFactor;
                    matrix1.M32 *= scaleFactor;
                    matrix1.M33 *= scaleFactor;
                    matrix1.M34 *= scaleFactor;
                    matrix1.M41 *= scaleFactor;
                    matrix1.M42 *= scaleFactor;
                    matrix1.M43 *= scaleFactor;
                    matrix1.M44 *= scaleFactor;
                    return matrix1.$clone();
                },
                /**
                 * Creates a new {@link } that contains a multiplication of {@link } and a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix1        Source {@link }.
                 * @param   {number}                            scaleFactor    Scalar value.
                 * @param   {Microsoft.Xna.Framework.Matrix}    result         Result of the matrix multiplication with a scalar as an output parameter.
                 * @return  {void}
                 */
                Multiply$3: function (matrix1, scaleFactor, result) {
                    result.v.M11 = matrix1.v.M11 * scaleFactor;
                    result.v.M12 = matrix1.v.M12 * scaleFactor;
                    result.v.M13 = matrix1.v.M13 * scaleFactor;
                    result.v.M14 = matrix1.v.M14 * scaleFactor;
                    result.v.M21 = matrix1.v.M21 * scaleFactor;
                    result.v.M22 = matrix1.v.M22 * scaleFactor;
                    result.v.M23 = matrix1.v.M23 * scaleFactor;
                    result.v.M24 = matrix1.v.M24 * scaleFactor;
                    result.v.M31 = matrix1.v.M31 * scaleFactor;
                    result.v.M32 = matrix1.v.M32 * scaleFactor;
                    result.v.M33 = matrix1.v.M33 * scaleFactor;
                    result.v.M34 = matrix1.v.M34 * scaleFactor;
                    result.v.M41 = matrix1.v.M41 * scaleFactor;
                    result.v.M42 = matrix1.v.M42 * scaleFactor;
                    result.v.M43 = matrix1.v.M43 * scaleFactor;
                    result.v.M44 = matrix1.v.M44 * scaleFactor;

                },
                /**
                 * Copy the values of specified {@link } to the float array.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix    The source {@link }.
                 * @return  {Array.<number>}                              The array which matrix values will be stored.
                 */
                ToFloatArray: function (matrix) {
                    var matarray = System.Array.init([
                        matrix.M11, 
                        matrix.M12, 
                        matrix.M13, 
                        matrix.M14, 
                        matrix.M21, 
                        matrix.M22, 
                        matrix.M23, 
                        matrix.M24, 
                        matrix.M31, 
                        matrix.M32, 
                        matrix.M33, 
                        matrix.M34, 
                        matrix.M41, 
                        matrix.M42, 
                        matrix.M43, 
                        matrix.M44
                    ], System.Single);
                    return matarray;
                },
                /**
                 * Returns a matrix with the all values negated.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix    Source {@link }.
                 * @return  {Microsoft.Xna.Framework.Matrix}              Result of the matrix negation.
                 */
                Negate: function (matrix) {
                    matrix.M11 = -matrix.M11;
                    matrix.M12 = -matrix.M12;
                    matrix.M13 = -matrix.M13;
                    matrix.M14 = -matrix.M14;
                    matrix.M21 = -matrix.M21;
                    matrix.M22 = -matrix.M22;
                    matrix.M23 = -matrix.M23;
                    matrix.M24 = -matrix.M24;
                    matrix.M31 = -matrix.M31;
                    matrix.M32 = -matrix.M32;
                    matrix.M33 = -matrix.M33;
                    matrix.M34 = -matrix.M34;
                    matrix.M41 = -matrix.M41;
                    matrix.M42 = -matrix.M42;
                    matrix.M43 = -matrix.M43;
                    matrix.M44 = -matrix.M44;
                    return matrix.$clone();
                },
                /**
                 * Returns a matrix with the all values negated.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Matrix}    result    Result of the matrix negation as an output parameter.
                 * @return  {void}
                 */
                Negate$1: function (matrix, result) {
                    result.v.M11 = -matrix.v.M11;
                    result.v.M12 = -matrix.v.M12;
                    result.v.M13 = -matrix.v.M13;
                    result.v.M14 = -matrix.v.M14;
                    result.v.M21 = -matrix.v.M21;
                    result.v.M22 = -matrix.v.M22;
                    result.v.M23 = -matrix.v.M23;
                    result.v.M24 = -matrix.v.M24;
                    result.v.M31 = -matrix.v.M31;
                    result.v.M32 = -matrix.v.M32;
                    result.v.M33 = -matrix.v.M33;
                    result.v.M34 = -matrix.v.M34;
                    result.v.M41 = -matrix.v.M41;
                    result.v.M42 = -matrix.v.M42;
                    result.v.M43 = -matrix.v.M43;
                    result.v.M44 = -matrix.v.M44;
                },
                /**
                 * Creates a new {@link } that contains subtraction of one matrix from another.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix1    The first {@link }.
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix2    The second {@link }.
                 * @return  {Microsoft.Xna.Framework.Matrix}               The result of the matrix subtraction.
                 */
                Subtract: function (matrix1, matrix2) {
                    matrix1.M11 = matrix1.M11 - matrix2.M11;
                    matrix1.M12 = matrix1.M12 - matrix2.M12;
                    matrix1.M13 = matrix1.M13 - matrix2.M13;
                    matrix1.M14 = matrix1.M14 - matrix2.M14;
                    matrix1.M21 = matrix1.M21 - matrix2.M21;
                    matrix1.M22 = matrix1.M22 - matrix2.M22;
                    matrix1.M23 = matrix1.M23 - matrix2.M23;
                    matrix1.M24 = matrix1.M24 - matrix2.M24;
                    matrix1.M31 = matrix1.M31 - matrix2.M31;
                    matrix1.M32 = matrix1.M32 - matrix2.M32;
                    matrix1.M33 = matrix1.M33 - matrix2.M33;
                    matrix1.M34 = matrix1.M34 - matrix2.M34;
                    matrix1.M41 = matrix1.M41 - matrix2.M41;
                    matrix1.M42 = matrix1.M42 - matrix2.M42;
                    matrix1.M43 = matrix1.M43 - matrix2.M43;
                    matrix1.M44 = matrix1.M44 - matrix2.M44;
                    return matrix1.$clone();
                },
                /**
                 * Creates a new {@link } that contains subtraction of one matrix from another.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix1    The first {@link }.
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix2    The second {@link }.
                 * @param   {Microsoft.Xna.Framework.Matrix}    result     The result of the matrix subtraction as an output parameter.
                 * @return  {void}
                 */
                Subtract$1: function (matrix1, matrix2, result) {
                    result.v.M11 = matrix1.v.M11 - matrix2.v.M11;
                    result.v.M12 = matrix1.v.M12 - matrix2.v.M12;
                    result.v.M13 = matrix1.v.M13 - matrix2.v.M13;
                    result.v.M14 = matrix1.v.M14 - matrix2.v.M14;
                    result.v.M21 = matrix1.v.M21 - matrix2.v.M21;
                    result.v.M22 = matrix1.v.M22 - matrix2.v.M22;
                    result.v.M23 = matrix1.v.M23 - matrix2.v.M23;
                    result.v.M24 = matrix1.v.M24 - matrix2.v.M24;
                    result.v.M31 = matrix1.v.M31 - matrix2.v.M31;
                    result.v.M32 = matrix1.v.M32 - matrix2.v.M32;
                    result.v.M33 = matrix1.v.M33 - matrix2.v.M33;
                    result.v.M34 = matrix1.v.M34 - matrix2.v.M34;
                    result.v.M41 = matrix1.v.M41 - matrix2.v.M41;
                    result.v.M42 = matrix1.v.M42 - matrix2.v.M42;
                    result.v.M43 = matrix1.v.M43 - matrix2.v.M43;
                    result.v.M44 = matrix1.v.M44 - matrix2.v.M44;
                },
                /**
                 * Swap the matrix rows and columns.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix    The matrix for transposing operation.
                 * @return  {Microsoft.Xna.Framework.Matrix}              The new {@link } which contains the transposing result.
                 */
                Transpose: function (matrix) {
                    matrix = {v:matrix};
                    var ret = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.Transpose$1(matrix, ret);
                    return ret.v.$clone();
                },
                /**
                 * Swap the matrix rows and columns.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix    The matrix for transposing operation.
                 * @param   {Microsoft.Xna.Framework.Matrix}    result    The new {@link } which contains the transposing result as an output parameter.
                 * @return  {void}
                 */
                Transpose$1: function (matrix, result) {
                    var ret = new Microsoft.Xna.Framework.Matrix();

                    ret.M11 = matrix.v.M11;
                    ret.M12 = matrix.v.M21;
                    ret.M13 = matrix.v.M31;
                    ret.M14 = matrix.v.M41;

                    ret.M21 = matrix.v.M12;
                    ret.M22 = matrix.v.M22;
                    ret.M23 = matrix.v.M32;
                    ret.M24 = matrix.v.M42;

                    ret.M31 = matrix.v.M13;
                    ret.M32 = matrix.v.M23;
                    ret.M33 = matrix.v.M33;
                    ret.M34 = matrix.v.M43;

                    ret.M41 = matrix.v.M14;
                    ret.M42 = matrix.v.M24;
                    ret.M43 = matrix.v.M34;
                    ret.M44 = matrix.v.M44;

                    result.v = ret.$clone();
                },
                /**
                 * Helper method for using the Laplace expansion theorem using two rows expansions to calculate major and 
                 minor determinants of a 4x4 matrix. This method is used for inverting a matrix.
                 *
                 * @static
                 * @private
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix     
                 * @param   {System.Single}                     major      
                 * @param   {System.Single}                     minor1     
                 * @param   {System.Single}                     minor2     
                 * @param   {System.Single}                     minor3     
                 * @param   {System.Single}                     minor4     
                 * @param   {System.Single}                     minor5     
                 * @param   {System.Single}                     minor6     
                 * @param   {System.Single}                     minor7     
                 * @param   {System.Single}                     minor8     
                 * @param   {System.Single}                     minor9     
                 * @param   {System.Single}                     minor10    
                 * @param   {System.Single}                     minor11    
                 * @param   {System.Single}                     minor12
                 * @return  {void}
                 */
                FindDeterminants: function (matrix, major, minor1, minor2, minor3, minor4, minor5, minor6, minor7, minor8, minor9, minor10, minor11, minor12) {
                    var det1 = matrix.v.M11 * matrix.v.M22 - matrix.v.M12 * matrix.v.M21;
                    var det2 = matrix.v.M11 * matrix.v.M23 - matrix.v.M13 * matrix.v.M21;
                    var det3 = matrix.v.M11 * matrix.v.M24 - matrix.v.M14 * matrix.v.M21;
                    var det4 = matrix.v.M12 * matrix.v.M23 - matrix.v.M13 * matrix.v.M22;
                    var det5 = matrix.v.M12 * matrix.v.M24 - matrix.v.M14 * matrix.v.M22;
                    var det6 = matrix.v.M13 * matrix.v.M24 - matrix.v.M14 * matrix.v.M23;
                    var det7 = matrix.v.M31 * matrix.v.M42 - matrix.v.M32 * matrix.v.M41;
                    var det8 = matrix.v.M31 * matrix.v.M43 - matrix.v.M33 * matrix.v.M41;
                    var det9 = matrix.v.M31 * matrix.v.M44 - matrix.v.M34 * matrix.v.M41;
                    var det10 = matrix.v.M32 * matrix.v.M43 - matrix.v.M33 * matrix.v.M42;
                    var det11 = matrix.v.M32 * matrix.v.M44 - matrix.v.M34 * matrix.v.M42;
                    var det12 = matrix.v.M33 * matrix.v.M44 - matrix.v.M34 * matrix.v.M43;

                    major.v = det1 * det12 - det2 * det11 + det3 * det10 + det4 * det9 - det5 * det8 + det6 * det7;
                    minor1.v = det1;
                    minor2.v = det2;
                    minor3.v = det3;
                    minor4.v = det4;
                    minor5.v = det5;
                    minor6.v = det6;
                    minor7.v = det7;
                    minor8.v = det8;
                    minor9.v = det9;
                    minor10.v = det10;
                    minor11.v = det11;
                    minor12.v = det12;
                }/**
                 * Adds two matrixes.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix1    Source {@link } on the left of the add sign.
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix2    Source {@link } on the right of the add sign.
                 * @return  {Microsoft.Xna.Framework.Matrix}               Sum of the matrixes.
                 */
                ,
                op_Addition: function (matrix1, matrix2) {
                    matrix1.M11 = matrix1.M11 + matrix2.M11;
                    matrix1.M12 = matrix1.M12 + matrix2.M12;
                    matrix1.M13 = matrix1.M13 + matrix2.M13;
                    matrix1.M14 = matrix1.M14 + matrix2.M14;
                    matrix1.M21 = matrix1.M21 + matrix2.M21;
                    matrix1.M22 = matrix1.M22 + matrix2.M22;
                    matrix1.M23 = matrix1.M23 + matrix2.M23;
                    matrix1.M24 = matrix1.M24 + matrix2.M24;
                    matrix1.M31 = matrix1.M31 + matrix2.M31;
                    matrix1.M32 = matrix1.M32 + matrix2.M32;
                    matrix1.M33 = matrix1.M33 + matrix2.M33;
                    matrix1.M34 = matrix1.M34 + matrix2.M34;
                    matrix1.M41 = matrix1.M41 + matrix2.M41;
                    matrix1.M42 = matrix1.M42 + matrix2.M42;
                    matrix1.M43 = matrix1.M43 + matrix2.M43;
                    matrix1.M44 = matrix1.M44 + matrix2.M44;
                    return matrix1.$clone();
                }/**
                 * Divides the elements of a {@link } by the elements of another {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix1    Source {@link } on the left of the div sign.
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix2    Divisor {@link } on the right of the div sign.
                 * @return  {Microsoft.Xna.Framework.Matrix}               The result of dividing the matrixes.
                 */
                ,
                op_Division: function (matrix1, matrix2) {
                    matrix1.M11 = matrix1.M11 / matrix2.M11;
                    matrix1.M12 = matrix1.M12 / matrix2.M12;
                    matrix1.M13 = matrix1.M13 / matrix2.M13;
                    matrix1.M14 = matrix1.M14 / matrix2.M14;
                    matrix1.M21 = matrix1.M21 / matrix2.M21;
                    matrix1.M22 = matrix1.M22 / matrix2.M22;
                    matrix1.M23 = matrix1.M23 / matrix2.M23;
                    matrix1.M24 = matrix1.M24 / matrix2.M24;
                    matrix1.M31 = matrix1.M31 / matrix2.M31;
                    matrix1.M32 = matrix1.M32 / matrix2.M32;
                    matrix1.M33 = matrix1.M33 / matrix2.M33;
                    matrix1.M34 = matrix1.M34 / matrix2.M34;
                    matrix1.M41 = matrix1.M41 / matrix2.M41;
                    matrix1.M42 = matrix1.M42 / matrix2.M42;
                    matrix1.M43 = matrix1.M43 / matrix2.M43;
                    matrix1.M44 = matrix1.M44 / matrix2.M44;
                    return matrix1.$clone();
                }/**
                 * Divides the elements of a {@link } by a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix     Source {@link } on the left of the div sign.
                 * @param   {number}                            divider    Divisor scalar on the right of the div sign.
                 * @return  {Microsoft.Xna.Framework.Matrix}               The result of dividing a matrix by a scalar.
                 */
                ,
                op_Division$1: function (matrix, divider) {
                    var num = 1.0 / divider;
                    matrix.M11 = matrix.M11 * num;
                    matrix.M12 = matrix.M12 * num;
                    matrix.M13 = matrix.M13 * num;
                    matrix.M14 = matrix.M14 * num;
                    matrix.M21 = matrix.M21 * num;
                    matrix.M22 = matrix.M22 * num;
                    matrix.M23 = matrix.M23 * num;
                    matrix.M24 = matrix.M24 * num;
                    matrix.M31 = matrix.M31 * num;
                    matrix.M32 = matrix.M32 * num;
                    matrix.M33 = matrix.M33 * num;
                    matrix.M34 = matrix.M34 * num;
                    matrix.M41 = matrix.M41 * num;
                    matrix.M42 = matrix.M42 * num;
                    matrix.M43 = matrix.M43 * num;
                    matrix.M44 = matrix.M44 * num;
                    return matrix.$clone();
                }/**
                 * Compares whether two {@link } instances are equal without any tolerance.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix1    Source {@link } on the left of the equal sign.
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix2    Source {@link } on the right of the equal sign.
                 * @return  {boolean}                                      <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
                 */
                ,
                op_Equality: function (matrix1, matrix2) {
                    return (matrix1.M11 === matrix2.M11 && matrix1.M12 === matrix2.M12 && matrix1.M13 === matrix2.M13 && matrix1.M14 === matrix2.M14 && matrix1.M21 === matrix2.M21 && matrix1.M22 === matrix2.M22 && matrix1.M23 === matrix2.M23 && matrix1.M24 === matrix2.M24 && matrix1.M31 === matrix2.M31 && matrix1.M32 === matrix2.M32 && matrix1.M33 === matrix2.M33 && matrix1.M34 === matrix2.M34 && matrix1.M41 === matrix2.M41 && matrix1.M42 === matrix2.M42 && matrix1.M43 === matrix2.M43 && matrix1.M44 === matrix2.M44);
                }/**
                 * Compares whether two {@link } instances are not equal without any tolerance.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix1    Source {@link } on the left of the not equal sign.
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix2    Source {@link } on the right of the not equal sign.
                 * @return  {boolean}                                      <pre><code>true</code></pre> if the instances are not equal; <pre><code>false</code></pre> otherwise.
                 */
                ,
                op_Inequality: function (matrix1, matrix2) {
                    return (matrix1.M11 !== matrix2.M11 || matrix1.M12 !== matrix2.M12 || matrix1.M13 !== matrix2.M13 || matrix1.M14 !== matrix2.M14 || matrix1.M21 !== matrix2.M21 || matrix1.M22 !== matrix2.M22 || matrix1.M23 !== matrix2.M23 || matrix1.M24 !== matrix2.M24 || matrix1.M31 !== matrix2.M31 || matrix1.M32 !== matrix2.M32 || matrix1.M33 !== matrix2.M33 || matrix1.M34 !== matrix2.M34 || matrix1.M41 !== matrix2.M41 || matrix1.M42 !== matrix2.M42 || matrix1.M43 !== matrix2.M43 || matrix1.M44 !== matrix2.M44);
                }/**
                 * Multiplies two matrixes.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix1    Source {@link } on the left of the mul sign.
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix2    Source {@link } on the right of the mul sign.
                 * @return  {Microsoft.Xna.Framework.Matrix}               Result of the matrix multiplication.
                 */
                ,
                op_Multiply: function (matrix1, matrix2) {
                    var m11 = (((matrix1.M11 * matrix2.M11) + (matrix1.M12 * matrix2.M21)) + (matrix1.M13 * matrix2.M31)) + (matrix1.M14 * matrix2.M41);
                    var m12 = (((matrix1.M11 * matrix2.M12) + (matrix1.M12 * matrix2.M22)) + (matrix1.M13 * matrix2.M32)) + (matrix1.M14 * matrix2.M42);
                    var m13 = (((matrix1.M11 * matrix2.M13) + (matrix1.M12 * matrix2.M23)) + (matrix1.M13 * matrix2.M33)) + (matrix1.M14 * matrix2.M43);
                    var m14 = (((matrix1.M11 * matrix2.M14) + (matrix1.M12 * matrix2.M24)) + (matrix1.M13 * matrix2.M34)) + (matrix1.M14 * matrix2.M44);
                    var m21 = (((matrix1.M21 * matrix2.M11) + (matrix1.M22 * matrix2.M21)) + (matrix1.M23 * matrix2.M31)) + (matrix1.M24 * matrix2.M41);
                    var m22 = (((matrix1.M21 * matrix2.M12) + (matrix1.M22 * matrix2.M22)) + (matrix1.M23 * matrix2.M32)) + (matrix1.M24 * matrix2.M42);
                    var m23 = (((matrix1.M21 * matrix2.M13) + (matrix1.M22 * matrix2.M23)) + (matrix1.M23 * matrix2.M33)) + (matrix1.M24 * matrix2.M43);
                    var m24 = (((matrix1.M21 * matrix2.M14) + (matrix1.M22 * matrix2.M24)) + (matrix1.M23 * matrix2.M34)) + (matrix1.M24 * matrix2.M44);
                    var m31 = (((matrix1.M31 * matrix2.M11) + (matrix1.M32 * matrix2.M21)) + (matrix1.M33 * matrix2.M31)) + (matrix1.M34 * matrix2.M41);
                    var m32 = (((matrix1.M31 * matrix2.M12) + (matrix1.M32 * matrix2.M22)) + (matrix1.M33 * matrix2.M32)) + (matrix1.M34 * matrix2.M42);
                    var m33 = (((matrix1.M31 * matrix2.M13) + (matrix1.M32 * matrix2.M23)) + (matrix1.M33 * matrix2.M33)) + (matrix1.M34 * matrix2.M43);
                    var m34 = (((matrix1.M31 * matrix2.M14) + (matrix1.M32 * matrix2.M24)) + (matrix1.M33 * matrix2.M34)) + (matrix1.M34 * matrix2.M44);
                    var m41 = (((matrix1.M41 * matrix2.M11) + (matrix1.M42 * matrix2.M21)) + (matrix1.M43 * matrix2.M31)) + (matrix1.M44 * matrix2.M41);
                    var m42 = (((matrix1.M41 * matrix2.M12) + (matrix1.M42 * matrix2.M22)) + (matrix1.M43 * matrix2.M32)) + (matrix1.M44 * matrix2.M42);
                    var m43 = (((matrix1.M41 * matrix2.M13) + (matrix1.M42 * matrix2.M23)) + (matrix1.M43 * matrix2.M33)) + (matrix1.M44 * matrix2.M43);
                    var m44 = (((matrix1.M41 * matrix2.M14) + (matrix1.M42 * matrix2.M24)) + (matrix1.M43 * matrix2.M34)) + (matrix1.M44 * matrix2.M44);
                    matrix1.M11 = m11;
                    matrix1.M12 = m12;
                    matrix1.M13 = m13;
                    matrix1.M14 = m14;
                    matrix1.M21 = m21;
                    matrix1.M22 = m22;
                    matrix1.M23 = m23;
                    matrix1.M24 = m24;
                    matrix1.M31 = m31;
                    matrix1.M32 = m32;
                    matrix1.M33 = m33;
                    matrix1.M34 = m34;
                    matrix1.M41 = m41;
                    matrix1.M42 = m42;
                    matrix1.M43 = m43;
                    matrix1.M44 = m44;
                    return matrix1.$clone();
                }/**
                 * Multiplies the elements of matrix by a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix         Source {@link } on the left of the mul sign.
                 * @param   {number}                            scaleFactor    Scalar value on the right of the mul sign.
                 * @return  {Microsoft.Xna.Framework.Matrix}                   Result of the matrix multiplication with a scalar.
                 */
                ,
                op_Multiply$1: function (matrix, scaleFactor) {
                    matrix.M11 = matrix.M11 * scaleFactor;
                    matrix.M12 = matrix.M12 * scaleFactor;
                    matrix.M13 = matrix.M13 * scaleFactor;
                    matrix.M14 = matrix.M14 * scaleFactor;
                    matrix.M21 = matrix.M21 * scaleFactor;
                    matrix.M22 = matrix.M22 * scaleFactor;
                    matrix.M23 = matrix.M23 * scaleFactor;
                    matrix.M24 = matrix.M24 * scaleFactor;
                    matrix.M31 = matrix.M31 * scaleFactor;
                    matrix.M32 = matrix.M32 * scaleFactor;
                    matrix.M33 = matrix.M33 * scaleFactor;
                    matrix.M34 = matrix.M34 * scaleFactor;
                    matrix.M41 = matrix.M41 * scaleFactor;
                    matrix.M42 = matrix.M42 * scaleFactor;
                    matrix.M43 = matrix.M43 * scaleFactor;
                    matrix.M44 = matrix.M44 * scaleFactor;
                    return matrix.$clone();
                }/**
                 * Subtracts the values of one {@link } from another {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix1    Source {@link } on the left of the sub sign.
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix2    Source {@link } on the right of the sub sign.
                 * @return  {Microsoft.Xna.Framework.Matrix}               Result of the matrix subtraction.
                 */
                ,
                op_Subtraction: function (matrix1, matrix2) {
                    matrix1.M11 = matrix1.M11 - matrix2.M11;
                    matrix1.M12 = matrix1.M12 - matrix2.M12;
                    matrix1.M13 = matrix1.M13 - matrix2.M13;
                    matrix1.M14 = matrix1.M14 - matrix2.M14;
                    matrix1.M21 = matrix1.M21 - matrix2.M21;
                    matrix1.M22 = matrix1.M22 - matrix2.M22;
                    matrix1.M23 = matrix1.M23 - matrix2.M23;
                    matrix1.M24 = matrix1.M24 - matrix2.M24;
                    matrix1.M31 = matrix1.M31 - matrix2.M31;
                    matrix1.M32 = matrix1.M32 - matrix2.M32;
                    matrix1.M33 = matrix1.M33 - matrix2.M33;
                    matrix1.M34 = matrix1.M34 - matrix2.M34;
                    matrix1.M41 = matrix1.M41 - matrix2.M41;
                    matrix1.M42 = matrix1.M42 - matrix2.M42;
                    matrix1.M43 = matrix1.M43 - matrix2.M43;
                    matrix1.M44 = matrix1.M44 - matrix2.M44;
                    return matrix1.$clone();
                }/**
                 * Inverts values in the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Matrix
                 * @memberof Microsoft.Xna.Framework.Matrix
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix    Source {@link } on the right of the sub sign.
                 * @return  {Microsoft.Xna.Framework.Matrix}              Result of the inversion.
                 */
                ,
                op_UnaryNegation: function (matrix) {
                    matrix.M11 = -matrix.M11;
                    matrix.M12 = -matrix.M12;
                    matrix.M13 = -matrix.M13;
                    matrix.M14 = -matrix.M14;
                    matrix.M21 = -matrix.M21;
                    matrix.M22 = -matrix.M22;
                    matrix.M23 = -matrix.M23;
                    matrix.M24 = -matrix.M24;
                    matrix.M31 = -matrix.M31;
                    matrix.M32 = -matrix.M32;
                    matrix.M33 = -matrix.M33;
                    matrix.M34 = -matrix.M34;
                    matrix.M41 = -matrix.M41;
                    matrix.M42 = -matrix.M42;
                    matrix.M43 = -matrix.M43;
                    matrix.M44 = -matrix.M44;
                    return matrix.$clone();
                },
                getDefaultValue: function () { return new Microsoft.Xna.Framework.Matrix(); }
            }
        },
        fields: {
            /**
             * A first row and first column value.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Matrix
             * @type number
             */
            M11: 0,
            /**
             * A first row and second column value.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Matrix
             * @type number
             */
            M12: 0,
            /**
             * A first row and third column value.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Matrix
             * @type number
             */
            M13: 0,
            /**
             * A first row and fourth column value.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Matrix
             * @type number
             */
            M14: 0,
            /**
             * A second row and first column value.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Matrix
             * @type number
             */
            M21: 0,
            /**
             * A second row and second column value.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Matrix
             * @type number
             */
            M22: 0,
            /**
             * A second row and third column value.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Matrix
             * @type number
             */
            M23: 0,
            /**
             * A second row and fourth column value.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Matrix
             * @type number
             */
            M24: 0,
            /**
             * A third row and first column value.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Matrix
             * @type number
             */
            M31: 0,
            /**
             * A third row and second column value.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Matrix
             * @type number
             */
            M32: 0,
            /**
             * A third row and third column value.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Matrix
             * @type number
             */
            M33: 0,
            /**
             * A third row and fourth column value.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Matrix
             * @type number
             */
            M34: 0,
            /**
             * A fourth row and first column value.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Matrix
             * @type number
             */
            M41: 0,
            /**
             * A fourth row and second column value.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Matrix
             * @type number
             */
            M42: 0,
            /**
             * A fourth row and third column value.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Matrix
             * @type number
             */
            M43: 0,
            /**
             * A fourth row and fourth column value.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Matrix
             * @type number
             */
            M44: 0
        },
        props: {
            /**
             * The backward vector formed from the third row M31, M32, M33 elements.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Matrix
             * @function Backward
             * @type Microsoft.Xna.Framework.Vector3
             */
            Backward: {
                get: function () {
                    return new Microsoft.Xna.Framework.Vector3.$ctor3(this.M31, this.M32, this.M33);
                },
                set: function (value) {
                    this.M31 = value.X;
                    this.M32 = value.Y;
                    this.M33 = value.Z;
                }
            },
            /**
             * The down vector formed from the second row -M21, -M22, -M23 elements.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Matrix
             * @function Down
             * @type Microsoft.Xna.Framework.Vector3
             */
            Down: {
                get: function () {
                    return new Microsoft.Xna.Framework.Vector3.$ctor3(-this.M21, -this.M22, -this.M23);
                },
                set: function (value) {
                    this.M21 = -value.X;
                    this.M22 = -value.Y;
                    this.M23 = -value.Z;
                }
            },
            /**
             * The forward vector formed from the third row -M31, -M32, -M33 elements.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Matrix
             * @function Forward
             * @type Microsoft.Xna.Framework.Vector3
             */
            Forward: {
                get: function () {
                    return new Microsoft.Xna.Framework.Vector3.$ctor3(-this.M31, -this.M32, -this.M33);
                },
                set: function (value) {
                    this.M31 = -value.X;
                    this.M32 = -value.Y;
                    this.M33 = -value.Z;
                }
            },
            /**
             * The left vector formed from the first row -M11, -M12, -M13 elements.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Matrix
             * @function Left
             * @type Microsoft.Xna.Framework.Vector3
             */
            Left: {
                get: function () {
                    return new Microsoft.Xna.Framework.Vector3.$ctor3(-this.M11, -this.M12, -this.M13);
                },
                set: function (value) {
                    this.M11 = -value.X;
                    this.M12 = -value.Y;
                    this.M13 = -value.Z;
                }
            },
            /**
             * The right vector formed from the first row M11, M12, M13 elements.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Matrix
             * @function Right
             * @type Microsoft.Xna.Framework.Vector3
             */
            Right: {
                get: function () {
                    return new Microsoft.Xna.Framework.Vector3.$ctor3(this.M11, this.M12, this.M13);
                },
                set: function (value) {
                    this.M11 = value.X;
                    this.M12 = value.Y;
                    this.M13 = value.Z;
                }
            },
            /**
             * Position stored in this matrix.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Matrix
             * @function Translation
             * @type Microsoft.Xna.Framework.Vector3
             */
            Translation: {
                get: function () {
                    return new Microsoft.Xna.Framework.Vector3.$ctor3(this.M41, this.M42, this.M43);
                },
                set: function (value) {
                    this.M41 = value.X;
                    this.M42 = value.Y;
                    this.M43 = value.Z;
                }
            },
            /**
             * The upper vector formed from the second row M21, M22, M23 elements.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Matrix
             * @function Up
             * @type Microsoft.Xna.Framework.Vector3
             */
            Up: {
                get: function () {
                    return new Microsoft.Xna.Framework.Vector3.$ctor3(this.M21, this.M22, this.M23);
                },
                set: function (value) {
                    this.M21 = value.X;
                    this.M22 = value.Y;
                    this.M23 = value.Z;
                }
            },
            DebugDisplayString: {
                get: function () {
                    if (Microsoft.Xna.Framework.Matrix.op_Equality(this, Microsoft.Xna.Framework.Matrix.Identity.$clone())) {
                        return "Identity";
                    }

                    return System.String.concat(["( ", System.Single.format(this.M11), "  ", System.Single.format(this.M12), "  ", System.Single.format(this.M13), "  ", System.Single.format(this.M14), " )  \r\n", "( ", System.Single.format(this.M21), "  ", System.Single.format(this.M22), "  ", System.Single.format(this.M23), "  ", System.Single.format(this.M24), " )  \r\n", "( ", System.Single.format(this.M31), "  ", System.Single.format(this.M32), "  ", System.Single.format(this.M33), "  ", System.Single.format(this.M34), " )  \r\n", "( ", System.Single.format(this.M41), "  ", System.Single.format(this.M42), "  ", System.Single.format(this.M43), "  ", System.Single.format(this.M44), " )"]);
                }
            }
        },
        alias: ["equalsT", "System$IEquatable$1$Microsoft$Xna$Framework$Matrix$equalsT"],
        ctors: {
            /**
             * Constructs a matrix.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Matrix
             * @memberof Microsoft.Xna.Framework.Matrix
             * @param   {number}    m11    A first row and first column value.
             * @param   {number}    m12    A first row and second column value.
             * @param   {number}    m13    A first row and third column value.
             * @param   {number}    m14    A first row and fourth column value.
             * @param   {number}    m21    A second row and first column value.
             * @param   {number}    m22    A second row and second column value.
             * @param   {number}    m23    A second row and third column value.
             * @param   {number}    m24    A second row and fourth column value.
             * @param   {number}    m31    A third row and first column value.
             * @param   {number}    m32    A third row and second column value.
             * @param   {number}    m33    A third row and third column value.
             * @param   {number}    m34    A third row and fourth column value.
             * @param   {number}    m41    A fourth row and first column value.
             * @param   {number}    m42    A fourth row and second column value.
             * @param   {number}    m43    A fourth row and third column value.
             * @param   {number}    m44    A fourth row and fourth column value.
             * @return  {void}
             */
            $ctor2: function (m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) {
                this.$initialize();
                this.M11 = m11;
                this.M12 = m12;
                this.M13 = m13;
                this.M14 = m14;
                this.M21 = m21;
                this.M22 = m22;
                this.M23 = m23;
                this.M24 = m24;
                this.M31 = m31;
                this.M32 = m32;
                this.M33 = m33;
                this.M34 = m34;
                this.M41 = m41;
                this.M42 = m42;
                this.M43 = m43;
                this.M44 = m44;
            },
            /**
             * Constructs a matrix.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Matrix
             * @memberof Microsoft.Xna.Framework.Matrix
             * @param   {Microsoft.Xna.Framework.Vector4}    row1    A first row of the created matrix.
             * @param   {Microsoft.Xna.Framework.Vector4}    row2    A second row of the created matrix.
             * @param   {Microsoft.Xna.Framework.Vector4}    row3    A third row of the created matrix.
             * @param   {Microsoft.Xna.Framework.Vector4}    row4    A fourth row of the created matrix.
             * @return  {void}
             */
            $ctor1: function (row1, row2, row3, row4) {
                this.$initialize();
                this.M11 = row1.X;
                this.M12 = row1.Y;
                this.M13 = row1.Z;
                this.M14 = row1.W;
                this.M21 = row2.X;
                this.M22 = row2.Y;
                this.M23 = row2.Z;
                this.M24 = row2.W;
                this.M31 = row3.X;
                this.M32 = row3.Y;
                this.M33 = row3.Z;
                this.M34 = row3.W;
                this.M41 = row4.X;
                this.M42 = row4.Y;
                this.M43 = row4.Z;
                this.M44 = row4.W;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getItem: function (index) {
                switch (index) {
                    case 0: 
                        return this.M11;
                    case 1: 
                        return this.M12;
                    case 2: 
                        return this.M13;
                    case 3: 
                        return this.M14;
                    case 4: 
                        return this.M21;
                    case 5: 
                        return this.M22;
                    case 6: 
                        return this.M23;
                    case 7: 
                        return this.M24;
                    case 8: 
                        return this.M31;
                    case 9: 
                        return this.M32;
                    case 10: 
                        return this.M33;
                    case 11: 
                        return this.M34;
                    case 12: 
                        return this.M41;
                    case 13: 
                        return this.M42;
                    case 14: 
                        return this.M43;
                    case 15: 
                        return this.M44;
                }
                throw new System.ArgumentOutOfRangeException.ctor();
            },
            setItem: function (index, value) {
                switch (index) {
                    case 0: 
                        this.M11 = value;
                        break;
                    case 1: 
                        this.M12 = value;
                        break;
                    case 2: 
                        this.M13 = value;
                        break;
                    case 3: 
                        this.M14 = value;
                        break;
                    case 4: 
                        this.M21 = value;
                        break;
                    case 5: 
                        this.M22 = value;
                        break;
                    case 6: 
                        this.M23 = value;
                        break;
                    case 7: 
                        this.M24 = value;
                        break;
                    case 8: 
                        this.M31 = value;
                        break;
                    case 9: 
                        this.M32 = value;
                        break;
                    case 10: 
                        this.M33 = value;
                        break;
                    case 11: 
                        this.M34 = value;
                        break;
                    case 12: 
                        this.M41 = value;
                        break;
                    case 13: 
                        this.M42 = value;
                        break;
                    case 14: 
                        this.M43 = value;
                        break;
                    case 15: 
                        this.M44 = value;
                        break;
                    default: 
                        throw new System.ArgumentOutOfRangeException.ctor();
                }
            },
            getItem$1: function (row, column) {
                return this.getItem((((Bridge.Int.mul(row, 4)) + column) | 0));
            },
            setItem$1: function (row, column, value) {
                this.setItem((((Bridge.Int.mul(row, 4)) + column) | 0), value);
            },
            /**
             * Decomposes this matrix to translation, rotation and scale elements. Returns <pre><code>true</code></pre> if matrix can be decomposed; <pre><code>false</code></pre> otherwise.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Matrix
             * @memberof Microsoft.Xna.Framework.Matrix
             * @param   {Microsoft.Xna.Framework.Vector3}       scale          Scale vector as an output parameter.
             * @param   {Microsoft.Xna.Framework.Quaternion}    rotation       Rotation quaternion as an output parameter.
             * @param   {Microsoft.Xna.Framework.Vector3}       translation    Translation vector as an output parameter.
             * @return  {boolean}                                              <pre><code>true</code></pre> if matrix can be decomposed; <pre><code>false</code></pre> otherwise.
             */
            Decompose: function (scale, rotation, translation) {
                translation.v.X = this.M41;
                translation.v.Y = this.M42;
                translation.v.Z = this.M43;

                var xs = (Bridge.Int.sign(this.M11 * this.M12 * this.M13 * this.M14) < 0) ? -1 : 1;
                var ys = (Bridge.Int.sign(this.M21 * this.M22 * this.M23 * this.M24) < 0) ? -1 : 1;
                var zs = (Bridge.Int.sign(this.M31 * this.M32 * this.M33 * this.M34) < 0) ? -1 : 1;

                scale.v.X = xs * Math.sqrt(this.M11 * this.M11 + this.M12 * this.M12 + this.M13 * this.M13);
                scale.v.Y = ys * Math.sqrt(this.M21 * this.M21 + this.M22 * this.M22 + this.M23 * this.M23);
                scale.v.Z = zs * Math.sqrt(this.M31 * this.M31 + this.M32 * this.M32 + this.M33 * this.M33);

                if (scale.v.X === 0.0 || scale.v.Y === 0.0 || scale.v.Z === 0.0) {
                    rotation.v = Microsoft.Xna.Framework.Quaternion.Identity.$clone();
                    return false;
                }

                var m1 = new Microsoft.Xna.Framework.Matrix.$ctor2(this.M11 / scale.v.X, this.M12 / scale.v.X, this.M13 / scale.v.X, 0, this.M21 / scale.v.Y, this.M22 / scale.v.Y, this.M23 / scale.v.Y, 0, this.M31 / scale.v.Z, this.M32 / scale.v.Z, this.M33 / scale.v.Z, 0, 0, 0, 0, 1);

                rotation.v = Microsoft.Xna.Framework.Quaternion.CreateFromRotationMatrix(m1.$clone());
                return true;
            },
            /**
             * Returns a determinant of this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Matrix
             * @memberof Microsoft.Xna.Framework.Matrix
             * @return  {number}        Determinant of this {@link }
             */
            Determinant: function () {
                var num22 = this.M11;
                var num21 = this.M12;
                var num20 = this.M13;
                var num19 = this.M14;
                var num12 = this.M21;
                var num11 = this.M22;
                var num10 = this.M23;
                var num9 = this.M24;
                var num8 = this.M31;
                var num7 = this.M32;
                var num6 = this.M33;
                var num5 = this.M34;
                var num4 = this.M41;
                var num3 = this.M42;
                var num2 = this.M43;
                var num = this.M44;
                var num18 = (num6 * num) - (num5 * num2);
                var num17 = (num7 * num) - (num5 * num3);
                var num16 = (num7 * num2) - (num6 * num3);
                var num15 = (num8 * num) - (num5 * num4);
                var num14 = (num8 * num2) - (num6 * num4);
                var num13 = (num8 * num3) - (num7 * num4);
                return ((((num22 * (((num11 * num18) - (num10 * num17)) + (num9 * num16))) - (num21 * (((num12 * num18) - (num10 * num15)) + (num9 * num14)))) + (num20 * (((num12 * num17) - (num11 * num15)) + (num9 * num13)))) - (num19 * (((num12 * num16) - (num11 * num14)) + (num10 * num13))));
            },
            /**
             * Compares whether current instance is equal to specified {@link } without any tolerance.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Matrix
             * @memberof Microsoft.Xna.Framework.Matrix
             * @param   {Microsoft.Xna.Framework.Matrix}    other    The {@link } to compare.
             * @return  {boolean}                                    <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
             */
            equalsT: function (other) {
                return ((((((this.M11 === other.M11) && (this.M22 === other.M22)) && ((this.M33 === other.M33) && (this.M44 === other.M44))) && (((this.M12 === other.M12) && (this.M13 === other.M13)) && ((this.M14 === other.M14) && (this.M21 === other.M21)))) && ((((this.M23 === other.M23) && (this.M24 === other.M24)) && ((this.M31 === other.M31) && (this.M32 === other.M32))) && (((this.M34 === other.M34) && (this.M41 === other.M41)) && (this.M42 === other.M42)))) && (this.M43 === other.M43));
            },
            /**
             * Compares whether current instance is equal to specified {@link } without any tolerance.
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.Matrix
             * @memberof Microsoft.Xna.Framework.Matrix
             * @param   {System.Object}    obj    The {@link } to compare.
             * @return  {boolean}                 <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
             */
            equals: function (obj) {
                var flag = false;
                if (Bridge.is(obj, Microsoft.Xna.Framework.Matrix)) {
                    flag = this.equalsT(System.Nullable.getValue(Bridge.cast(Bridge.unbox(obj, Microsoft.Xna.Framework.Matrix), Microsoft.Xna.Framework.Matrix)));
                }
                return flag;
            },
            /**
             * Gets the hash code of this {@link }.
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.Matrix
             * @memberof Microsoft.Xna.Framework.Matrix
             * @return  {number}        Hash code of this {@link }.
             */
            getHashCode: function () {
                return (((((((((((((((((((((((((((((((((((((((((((((System.Single.getHashCode(this.M11) + System.Single.getHashCode(this.M12)) | 0)) + System.Single.getHashCode(this.M13)) | 0)) + System.Single.getHashCode(this.M14)) | 0)) + System.Single.getHashCode(this.M21)) | 0)) + System.Single.getHashCode(this.M22)) | 0)) + System.Single.getHashCode(this.M23)) | 0)) + System.Single.getHashCode(this.M24)) | 0)) + System.Single.getHashCode(this.M31)) | 0)) + System.Single.getHashCode(this.M32)) | 0)) + System.Single.getHashCode(this.M33)) | 0)) + System.Single.getHashCode(this.M34)) | 0)) + System.Single.getHashCode(this.M41)) | 0)) + System.Single.getHashCode(this.M42)) | 0)) + System.Single.getHashCode(this.M43)) | 0)) + System.Single.getHashCode(this.M44)) | 0));
            },
            /**
             * Returns a {@link } representation of this {@link } in the format:
             {M11:[{@link }] M12:[{@link }] M13:[{@link }] M14:[{@link }]}
             {M21:[{@link }] M12:[{@link }] M13:[{@link }] M14:[{@link }]}
             {M31:[{@link }] M32:[{@link }] M33:[{@link }] M34:[{@link }]}
             {M41:[{@link }] M42:[{@link }] M43:[{@link }] M44:[{@link }]}
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.Matrix
             * @memberof Microsoft.Xna.Framework.Matrix
             * @return  {string}        A {@link } representation of this {@link }.
             */
            toString: function () {
                return "{M11:" + System.Single.format(this.M11) + " M12:" + System.Single.format(this.M12) + " M13:" + System.Single.format(this.M13) + " M14:" + System.Single.format(this.M14) + "}" + " {M21:" + System.Single.format(this.M21) + " M22:" + System.Single.format(this.M22) + " M23:" + System.Single.format(this.M23) + " M24:" + System.Single.format(this.M24) + "}" + " {M31:" + System.Single.format(this.M31) + " M32:" + System.Single.format(this.M32) + " M33:" + System.Single.format(this.M33) + " M34:" + System.Single.format(this.M34) + "}" + " {M41:" + System.Single.format(this.M41) + " M42:" + System.Single.format(this.M42) + " M43:" + System.Single.format(this.M43) + " M44:" + System.Single.format(this.M44) + "}";
            },
            $clone: function (to) {
                var s = to || new Microsoft.Xna.Framework.Matrix();
                s.M11 = this.M11;
                s.M12 = this.M12;
                s.M13 = this.M13;
                s.M14 = this.M14;
                s.M21 = this.M21;
                s.M22 = this.M22;
                s.M23 = this.M23;
                s.M24 = this.M24;
                s.M31 = this.M31;
                s.M32 = this.M32;
                s.M33 = this.M33;
                s.M34 = this.M34;
                s.M41 = this.M41;
                s.M42 = this.M42;
                s.M43 = this.M43;
                s.M44 = this.M44;
                return s;
            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.Media.MediaPlayer", {
        statics: {
            fields: {
                gameHasControl: false,
                contentManager: null,
                currentSong: null,
                isPlaying: false,
                IsRepeating: false
            },
            props: {
                GameHasControl: {
                    get: function () {
                        return Microsoft.Xna.Framework.Media.MediaPlayer.gameHasControl;
                    }
                }
            },
            ctors: {
                init: function () {
                    this.gameHasControl = true;
                }
            },
            methods: {
                Play: function (T, obj) {
                    if (Bridge.referenceEquals(T, Microsoft.Xna.Framework.Media.Song)) {
                        var song = Bridge.as(obj, Microsoft.Xna.Framework.Media.Song);
                        if (Bridge.referenceEquals(Microsoft.Xna.Framework.Media.MediaPlayer.currentSong, song)) {
                            if (!Microsoft.Xna.Framework.Media.MediaPlayer.isPlaying) {
                                song.Resume();
                            }
                        } else {
                            song.SetLoop(Microsoft.Xna.Framework.Media.MediaPlayer.IsRepeating);
                            Microsoft.Xna.Framework.Media.MediaPlayer.currentSong = song;
                            if (song.Loaded) {
                                song.Play();
                                Microsoft.Xna.Framework.Media.MediaPlayer.isPlaying = true;
                            } else {
                                Microsoft.Xna.Framework.Media.MediaPlayer.contentManager.OnAllResourceLoaded = function () {
                                    song.Play();
                                    Microsoft.Xna.Framework.Media.MediaPlayer.isPlaying = true;
                                };
                            }
                        }
                    }
                },
                Stop: function () {
                    if (Microsoft.Xna.Framework.Media.MediaPlayer.currentSong.Loaded) {
                        Microsoft.Xna.Framework.Media.MediaPlayer.currentSong.Suspend();
                        Microsoft.Xna.Framework.Media.MediaPlayer.isPlaying = false;
                    }
                },
                Unload: function () {
                    Microsoft.Xna.Framework.Media.MediaPlayer.currentSong = null;
                }
            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.Plane", {
        inherits: function () { return [System.IEquatable$1(Microsoft.Xna.Framework.Plane)]; },
        $kind: "struct",
        statics: {
            methods: {
                /**
                 * Transforms a normalized plane by a matrix.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Plane
                 * @memberof Microsoft.Xna.Framework.Plane
                 * @param   {Microsoft.Xna.Framework.Plane}     plane     The normalized plane to transform.
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix    The transformation matrix.
                 * @return  {Microsoft.Xna.Framework.Plane}               The transformed plane.
                 */
                Transform: function (plane, matrix) {
                    plane = {v:plane};
                    matrix = {v:matrix};
                    var result = { v : new Microsoft.Xna.Framework.Plane() };
                    Microsoft.Xna.Framework.Plane.Transform$2(plane, matrix, result);
                    return result.v.$clone();
                },
                /**
                 * Transforms a normalized plane by a matrix.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Plane
                 * @memberof Microsoft.Xna.Framework.Plane
                 * @param   {Microsoft.Xna.Framework.Plane}     plane     The normalized plane to transform.
                 * @param   {Microsoft.Xna.Framework.Matrix}    matrix    The transformation matrix.
                 * @param   {Microsoft.Xna.Framework.Plane}     result    The transformed plane.
                 * @return  {void}
                 */
                Transform$2: function (plane, matrix, result) {

                    var transformedMatrix = { v : new Microsoft.Xna.Framework.Matrix() };
                    Microsoft.Xna.Framework.Matrix.Invert$1(matrix, transformedMatrix);
                    Microsoft.Xna.Framework.Matrix.Transpose$1(transformedMatrix, transformedMatrix);

                    var vector = { v : new Microsoft.Xna.Framework.Vector4.$ctor2(plane.v.Normal.$clone(), plane.v.D) };

                    var transformedVector = { v : new Microsoft.Xna.Framework.Vector4() };
                    Microsoft.Xna.Framework.Vector4.Transform$10(vector, transformedMatrix, transformedVector);

                    result.v = new Microsoft.Xna.Framework.Plane.$ctor3(transformedVector.v.$clone());
                },
                /**
                 * Transforms a normalized plane by a quaternion rotation.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Plane
                 * @memberof Microsoft.Xna.Framework.Plane
                 * @param   {Microsoft.Xna.Framework.Plane}         plane       The normalized plane to transform.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    rotation    The quaternion rotation.
                 * @return  {Microsoft.Xna.Framework.Plane}                     The transformed plane.
                 */
                Transform$1: function (plane, rotation) {
                    plane = {v:plane};
                    rotation = {v:rotation};
                    var result = { v : new Microsoft.Xna.Framework.Plane() };
                    Microsoft.Xna.Framework.Plane.Transform$3(plane, rotation, result);
                    return result.v.$clone();
                },
                /**
                 * Transforms a normalized plane by a quaternion rotation.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Plane
                 * @memberof Microsoft.Xna.Framework.Plane
                 * @param   {Microsoft.Xna.Framework.Plane}         plane       The normalized plane to transform.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    rotation    The quaternion rotation.
                 * @param   {Microsoft.Xna.Framework.Plane}         result      The transformed plane.
                 * @return  {void}
                 */
                Transform$3: function (plane, rotation, result) {
                    Microsoft.Xna.Framework.Vector3.Transform$3(Bridge.ref(plane.v, "Normal"), rotation, Bridge.ref(result.v, "Normal"));
                    result.v.D = plane.v.D;
                },
                Normalize: function (value) {
                    value = {v:value};
                    var ret = { v : new Microsoft.Xna.Framework.Plane() };
                    Microsoft.Xna.Framework.Plane.Normalize$1(value, ret);
                    return ret.v.$clone();
                },
                Normalize$1: function (value, result) {
                    var length = value.v.Normal.Length();
                    var factor = 1.0 / length;
                    Microsoft.Xna.Framework.Vector3.Multiply$3(Bridge.ref(value.v, "Normal"), factor, Bridge.ref(result.v, "Normal"));
                    result.v.D = value.v.D * factor;
                },
                op_Inequality: function (plane1, plane2) {
                    return !plane1.equalsT(plane2.$clone());
                },
                op_Equality: function (plane1, plane2) {
                    return plane1.equalsT(plane2.$clone());
                },
                getDefaultValue: function () { return new Microsoft.Xna.Framework.Plane(); }
            }
        },
        fields: {
            D: 0,
            Normal: null
        },
        props: {
            DebugDisplayString: {
                get: function () {
                    return System.String.concat(this.Normal.DebugDisplayString, "  ", System.Single.format(this.D));
                }
            }
        },
        alias: ["equalsT", "System$IEquatable$1$Microsoft$Xna$Framework$Plane$equalsT"],
        ctors: {
            init: function () {
                this.Normal = new Microsoft.Xna.Framework.Vector3();
            },
            $ctor3: function (value) {
                Microsoft.Xna.Framework.Plane.$ctor2.call(this, new Microsoft.Xna.Framework.Vector3.$ctor3(value.X, value.Y, value.Z), value.W);

            },
            $ctor2: function (normal, d) {
                this.$initialize();
                this.Normal = normal.$clone();
                this.D = d;
            },
            $ctor1: function (a, b, c) {
                this.$initialize();
                var ab = Microsoft.Xna.Framework.Vector3.op_Subtraction(b.$clone(), a.$clone());
                var ac = Microsoft.Xna.Framework.Vector3.op_Subtraction(c.$clone(), a.$clone());

                var cross = { v : Microsoft.Xna.Framework.Vector3.Cross(ab.$clone(), ac.$clone()) };
                Microsoft.Xna.Framework.Vector3.Normalize$1(cross, Bridge.ref(this, "Normal"));
                this.D = -(Microsoft.Xna.Framework.Vector3.Dot(this.Normal.$clone(), a.$clone()));
            },
            $ctor4: function (a, b, c, d) {
                Microsoft.Xna.Framework.Plane.$ctor2.call(this, new Microsoft.Xna.Framework.Vector3.$ctor3(a, b, c), d);

            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            Dot: function (value) {
                return ((((this.Normal.X * value.X) + (this.Normal.Y * value.Y)) + (this.Normal.Z * value.Z)) + (this.D * value.W));
            },
            Dot$1: function (value, result) {
                result.v = (((this.Normal.X * value.v.X) + (this.Normal.Y * value.v.Y)) + (this.Normal.Z * value.v.Z)) + (this.D * value.v.W);
            },
            DotCoordinate: function (value) {
                return ((((this.Normal.X * value.X) + (this.Normal.Y * value.Y)) + (this.Normal.Z * value.Z)) + this.D);
            },
            DotCoordinate$1: function (value, result) {
                result.v = (((this.Normal.X * value.v.X) + (this.Normal.Y * value.v.Y)) + (this.Normal.Z * value.v.Z)) + this.D;
            },
            DotNormal: function (value) {
                return (((this.Normal.X * value.X) + (this.Normal.Y * value.Y)) + (this.Normal.Z * value.Z));
            },
            DotNormal$1: function (value, result) {
                result.v = ((this.Normal.X * value.v.X) + (this.Normal.Y * value.v.Y)) + (this.Normal.Z * value.v.Z);
            },
            Normalize: function () {
                var length = this.Normal.Length();
                var factor = 1.0 / length;
                Microsoft.Xna.Framework.Vector3.Multiply$3(Bridge.ref(this, "Normal"), factor, Bridge.ref(this, "Normal"));
                this.D = this.D * factor;
            },
            equals: function (other) {
                return (Bridge.is(other, Microsoft.Xna.Framework.Plane)) ? this.equalsT(System.Nullable.getValue(Bridge.cast(Bridge.unbox(other, Microsoft.Xna.Framework.Plane), Microsoft.Xna.Framework.Plane))) : false;
            },
            equalsT: function (other) {
                return ((Microsoft.Xna.Framework.Vector3.op_Equality(this.Normal.$clone(), other.Normal.$clone())) && (this.D === other.D));
            },
            getHashCode: function () {
                return this.Normal.getHashCode() ^ System.Single.getHashCode(this.D);
            },
            Intersects: function (box) {
                return box.Intersects(this);
            },
            Intersects$3: function (box, result) {
                box.v.Intersects$7(Bridge.ref(this), result);
            },
            Intersects$1: function (frustum) {
                return frustum.Intersects(this);
            },
            Intersects$2: function (sphere) {
                return sphere.Intersects(this);
            },
            Intersects$4: function (sphere, result) {
                sphere.v.Intersects$6(Bridge.ref(this), result);
            },
            Intersects$5: function (point) {
                var distance = { };
                this.DotCoordinate$1(point, distance);

                if (distance.v > 0) {
                    return Microsoft.Xna.Framework.PlaneIntersectionType.Front;
                }

                if (distance.v < 0) {
                    return Microsoft.Xna.Framework.PlaneIntersectionType.Back;
                }

                return Microsoft.Xna.Framework.PlaneIntersectionType.Intersecting;
            },
            toString: function () {
                return "{Normal:" + this.Normal + " D:" + System.Single.format(this.D) + "}";
            },
            /**
             * Deconstruction method for {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Plane
             * @memberof Microsoft.Xna.Framework.Plane
             * @param   {Microsoft.Xna.Framework.Vector3}    normal    
             * @param   {System.Single}                      d
             * @return  {void}
             */
            Deconstruct: function (normal, d) {
                normal.v = this.Normal.$clone();
                d.v = this.D;
            },
            $clone: function (to) {
                var s = to || new Microsoft.Xna.Framework.Plane();
                s.D = this.D;
                s.Normal = this.Normal.$clone();
                return s;
            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.PlaneHelper", {
        statics: {
            methods: {
                /**
                 * Returns a value indicating what side (positive/negative) of a plane a point is
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.PlaneHelper
                 * @memberof Microsoft.Xna.Framework.PlaneHelper
                 * @param   {Microsoft.Xna.Framework.Vector3}    point    The point to check with
                 * @param   {Microsoft.Xna.Framework.Plane}      plane    The plane to check against
                 * @return  {number}                                      Greater than zero if on the positive side, less than zero if on the negative size, 0 otherwise
                 */
                ClassifyPoint: function (point, plane) {
                    return point.v.X * plane.v.Normal.X + point.v.Y * plane.v.Normal.Y + point.v.Z * plane.v.Normal.Z + plane.v.D;
                },
                /**
                 * Returns the perpendicular distance from a point to a plane
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.PlaneHelper
                 * @memberof Microsoft.Xna.Framework.PlaneHelper
                 * @param   {Microsoft.Xna.Framework.Vector3}    point    The point to check
                 * @param   {Microsoft.Xna.Framework.Plane}      plane    The place to check
                 * @return  {number}                                      The perpendicular distance from the point to the plane
                 */
                PerpendicularDistance: function (point, plane) {
                    return Math.abs((plane.v.Normal.X * point.v.X + plane.v.Normal.Y * point.v.Y + plane.v.Normal.Z * point.v.Z) / Math.sqrt(plane.v.Normal.X * plane.v.Normal.X + plane.v.Normal.Y * plane.v.Normal.Y + plane.v.Normal.Z * plane.v.Normal.Z));
                }
            }
        }
    });

    /**
     * Defines the intersection between a {@link } and a bounding volume.
     *
     * @public
     * @class Microsoft.Xna.Framework.PlaneIntersectionType
     */
    Bridge.define("Microsoft.Xna.Framework.PlaneIntersectionType", {
        $kind: "enum",
        statics: {
            fields: {
                /**
                 * There is no intersection, the bounding volume is in the negative half space of the plane.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.PlaneIntersectionType
                 * @constant
                 * @default 0
                 * @type Microsoft.Xna.Framework.PlaneIntersectionType
                 */
                Front: 0,
                /**
                 * There is no intersection, the bounding volume is in the positive half space of the plane.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.PlaneIntersectionType
                 * @constant
                 * @default 1
                 * @type Microsoft.Xna.Framework.PlaneIntersectionType
                 */
                Back: 1,
                /**
                 * The plane is intersected.
                 *
                 * @static
                 * @public
                 * @memberof Microsoft.Xna.Framework.PlaneIntersectionType
                 * @constant
                 * @default 2
                 * @type Microsoft.Xna.Framework.PlaneIntersectionType
                 */
                Intersecting: 2
            }
        }
    });

    /**
     * Describes a 2D-point.
     *
     * @public
     * @class Microsoft.Xna.Framework.Point
     * @implements  System.IEquatable$1
     */
    Bridge.define("Microsoft.Xna.Framework.Point", {
        inherits: function () { return [System.IEquatable$1(Microsoft.Xna.Framework.Point)]; },
        $kind: "struct",
        statics: {
            fields: {
                zeroPoint: null
            },
            props: {
                /**
                 * Returns a {@link } with coordinates 0, 0.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Point
                 * @function Zero
                 * @type Microsoft.Xna.Framework.Point
                 */
                Zero: {
                    get: function () {
                        return Microsoft.Xna.Framework.Point.zeroPoint.$clone();
                    }
                }
            },
            ctors: {
                init: function () {
                    this.zeroPoint = new Microsoft.Xna.Framework.Point();
                }
            },
            methods: {
                /**
                 * Adds two points.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Point
                 * @memberof Microsoft.Xna.Framework.Point
                 * @param   {Microsoft.Xna.Framework.Point}    value1    Source {@link } on the left of the add sign.
                 * @param   {Microsoft.Xna.Framework.Point}    value2    Source {@link } on the right of the add sign.
                 * @return  {Microsoft.Xna.Framework.Point}              Sum of the points.
                 */
                op_Addition: function (value1, value2) {
                    return new Microsoft.Xna.Framework.Point.$ctor2(((value1.X + value2.X) | 0), ((value1.Y + value2.Y) | 0));
                }/**
                 * Subtracts a {@link } from a {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Point
                 * @memberof Microsoft.Xna.Framework.Point
                 * @param   {Microsoft.Xna.Framework.Point}    value1    Source {@link } on the left of the sub sign.
                 * @param   {Microsoft.Xna.Framework.Point}    value2    Source {@link } on the right of the sub sign.
                 * @return  {Microsoft.Xna.Framework.Point}              Result of the subtraction.
                 */
                ,
                op_Subtraction: function (value1, value2) {
                    return new Microsoft.Xna.Framework.Point.$ctor2(((value1.X - value2.X) | 0), ((value1.Y - value2.Y) | 0));
                }/**
                 * Multiplies the components of two points by each other.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Point
                 * @memberof Microsoft.Xna.Framework.Point
                 * @param   {Microsoft.Xna.Framework.Point}    value1    Source {@link } on the left of the mul sign.
                 * @param   {Microsoft.Xna.Framework.Point}    value2    Source {@link } on the right of the mul sign.
                 * @return  {Microsoft.Xna.Framework.Point}              Result of the multiplication.
                 */
                ,
                op_Multiply: function (value1, value2) {
                    return new Microsoft.Xna.Framework.Point.$ctor2(Bridge.Int.mul(value1.X, value2.X), Bridge.Int.mul(value1.Y, value2.Y));
                }/**
                 * Divides the components of a {@link } by the components of another {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Point
                 * @memberof Microsoft.Xna.Framework.Point
                 * @param   {Microsoft.Xna.Framework.Point}    source     Source {@link } on the left of the div sign.
                 * @param   {Microsoft.Xna.Framework.Point}    divisor    Divisor {@link } on the right of the div sign.
                 * @return  {Microsoft.Xna.Framework.Point}               The result of dividing the points.
                 */
                ,
                op_Division: function (source, divisor) {
                    return new Microsoft.Xna.Framework.Point.$ctor2(((Bridge.Int.div(source.X, divisor.X)) | 0), ((Bridge.Int.div(source.Y, divisor.Y)) | 0));
                }/**
                 * Compares whether two {@link } instances are equal.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Point
                 * @memberof Microsoft.Xna.Framework.Point
                 * @param   {Microsoft.Xna.Framework.Point}    a    {@link } instance on the left of the equal sign.
                 * @param   {Microsoft.Xna.Framework.Point}    b    {@link } instance on the right of the equal sign.
                 * @return  {boolean}                               <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
                 */
                ,
                op_Equality: function (a, b) {
                    return a.equalsT(b.$clone());
                }/**
                 * Compares whether two {@link } instances are not equal.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Point
                 * @memberof Microsoft.Xna.Framework.Point
                 * @param   {Microsoft.Xna.Framework.Point}    a    {@link } instance on the left of the not equal sign.
                 * @param   {Microsoft.Xna.Framework.Point}    b    {@link } instance on the right of the not equal sign.
                 * @return  {boolean}                               <pre><code>true</code></pre> if the instances are not equal; <pre><code>false</code></pre> otherwise.
                 */
                ,
                op_Inequality: function (a, b) {
                    return !a.equalsT(b.$clone());
                },
                getDefaultValue: function () { return new Microsoft.Xna.Framework.Point(); }
            }
        },
        fields: {
            /**
             * The x coordinate of this {@link }.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Point
             * @type number
             */
            X: 0,
            /**
             * The y coordinate of this {@link }.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Point
             * @type number
             */
            Y: 0
        },
        props: {
            DebugDisplayString: {
                get: function () {
                    return System.String.concat(Bridge.toString(this.X), "  ", Bridge.toString(this.Y));
                }
            }
        },
        alias: ["equalsT", "System$IEquatable$1$Microsoft$Xna$Framework$Point$equalsT"],
        ctors: {
            /**
             * Constructs a point with X and Y from two values.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Point
             * @memberof Microsoft.Xna.Framework.Point
             * @param   {number}    x    The x coordinate in 2d-space.
             * @param   {number}    y    The y coordinate in 2d-space.
             * @return  {void}
             */
            $ctor2: function (x, y) {
                this.$initialize();
                this.X = x;
                this.Y = y;
            },
            /**
             * Constructs a point with X and Y set to the same value.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Point
             * @memberof Microsoft.Xna.Framework.Point
             * @param   {number}    value    The x and y coordinates in 2d-space.
             * @return  {void}
             */
            $ctor1: function (value) {
                this.$initialize();
                this.X = value;
                this.Y = value;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Compares whether current instance is equal to specified {@link }.
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.Point
             * @memberof Microsoft.Xna.Framework.Point
             * @param   {System.Object}    obj    The {@link } to compare.
             * @return  {boolean}                 <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
             */
            equals: function (obj) {
                return (Bridge.is(obj, Microsoft.Xna.Framework.Point)) && this.equalsT(System.Nullable.getValue(Bridge.cast(Bridge.unbox(obj, Microsoft.Xna.Framework.Point), Microsoft.Xna.Framework.Point)));
            },
            /**
             * Compares whether current instance is equal to specified {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Point
             * @memberof Microsoft.Xna.Framework.Point
             * @param   {Microsoft.Xna.Framework.Point}    other    The {@link } to compare.
             * @return  {boolean}                                   <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
             */
            equalsT: function (other) {
                return ((this.X === other.X) && (this.Y === other.Y));
            },
            /**
             * Gets the hash code of this {@link }.
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.Point
             * @memberof Microsoft.Xna.Framework.Point
             * @return  {number}        Hash code of this {@link }.
             */
            getHashCode: function () {
                var hash = 17;
                hash = (Bridge.Int.mul(hash, 23) + Bridge.getHashCode(this.X)) | 0;
                hash = (Bridge.Int.mul(hash, 23) + Bridge.getHashCode(this.Y)) | 0;
                return hash;

            },
            /**
             * Returns a {@link } representation of this {@link } in the format:
             {X:[{@link }] Y:[{@link }]}
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.Point
             * @memberof Microsoft.Xna.Framework.Point
             * @return  {string}        {@link } representation of this {@link }.
             */
            toString: function () {
                return "{X:" + this.X + " Y:" + this.Y + "}";
            },
            /**
             * Gets a {@link } representation for this object.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Point
             * @memberof Microsoft.Xna.Framework.Point
             * @return  {Microsoft.Xna.Framework.Vector2}        A {@link } representation for this object.
             */
            ToVector2: function () {
                return new Microsoft.Xna.Framework.Vector2.$ctor2(this.X, this.Y);
            },
            /**
             * Deconstruction method for {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Point
             * @memberof Microsoft.Xna.Framework.Point
             * @param   {System.Int32}    x    
             * @param   {System.Int32}    y
             * @return  {void}
             */
            Deconstruct: function (x, y) {
                x.v = this.X;
                y.v = this.Y;
            },
            $clone: function (to) {
                var s = to || new Microsoft.Xna.Framework.Point();
                s.X = this.X;
                s.Y = this.Y;
                return s;
            }
        }
    });

    /**
     * The arguments to the {@link } event.
     *
     * @public
     * @class Microsoft.Xna.Framework.PreparingDeviceSettingsEventArgs
     * @augments System.Object
     */
    Bridge.define("Microsoft.Xna.Framework.PreparingDeviceSettingsEventArgs");

    /**
     * An efficient mathematical representation for three dimensional rotations.
     *
     * @public
     * @class Microsoft.Xna.Framework.Quaternion
     * @implements  System.IEquatable$1
     */
    Bridge.define("Microsoft.Xna.Framework.Quaternion", {
        inherits: function () { return [System.IEquatable$1(Microsoft.Xna.Framework.Quaternion)]; },
        $kind: "struct",
        statics: {
            fields: {
                _identity: null
            },
            props: {
                /**
                 * Returns a quaternion representing no rotation.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @function Identity
                 * @type Microsoft.Xna.Framework.Quaternion
                 */
                Identity: {
                    get: function () {
                        return Microsoft.Xna.Framework.Quaternion._identity.$clone();
                    }
                }
            },
            ctors: {
                init: function () {
                    this._identity = new Microsoft.Xna.Framework.Quaternion();
                    this._identity = new Microsoft.Xna.Framework.Quaternion.$ctor3(0, 0, 0, 1);
                }
            },
            methods: {
                /**
                 * Creates a new {@link } that contains the sum of two quaternions.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion2    Source {@link }.
                 * @return  {Microsoft.Xna.Framework.Quaternion}                   The result of the quaternion addition.
                 */
                Add: function (quaternion1, quaternion2) {
                    var quaternion = new Microsoft.Xna.Framework.Quaternion();
                    quaternion.X = quaternion1.X + quaternion2.X;
                    quaternion.Y = quaternion1.Y + quaternion2.Y;
                    quaternion.Z = quaternion1.Z + quaternion2.Z;
                    quaternion.W = quaternion1.W + quaternion2.W;
                    return quaternion.$clone();
                },
                /**
                 * Creates a new {@link } that contains the sum of two quaternions.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion2    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    result         The result of the quaternion addition as an output parameter.
                 * @return  {void}
                 */
                Add$1: function (quaternion1, quaternion2, result) {
                    result.v.X = quaternion1.v.X + quaternion2.v.X;
                    result.v.Y = quaternion1.v.Y + quaternion2.v.Y;
                    result.v.Z = quaternion1.v.Z + quaternion2.v.Z;
                    result.v.W = quaternion1.v.W + quaternion2.v.W;
                },
                /**
                 * Creates a new {@link } that contains concatenation between two quaternion.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    value1    The first {@link } to concatenate.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    value2    The second {@link } to concatenate.
                 * @return  {Microsoft.Xna.Framework.Quaternion}              The result of rotation of <b /> followed by <b /> rotation.
                 */
                Concatenate: function (value1, value2) {
                    var quaternion = new Microsoft.Xna.Framework.Quaternion();

                    var x1 = value1.X;
                    var y1 = value1.Y;
                    var z1 = value1.Z;
                    var w1 = value1.W;

                    var x2 = value2.X;
                    var y2 = value2.Y;
                    var z2 = value2.Z;
                    var w2 = value2.W;

                    quaternion.X = ((x2 * w1) + (x1 * w2)) + ((y2 * z1) - (z2 * y1));
                    quaternion.Y = ((y2 * w1) + (y1 * w2)) + ((z2 * x1) - (x2 * z1));
                    quaternion.Z = ((z2 * w1) + (z1 * w2)) + ((x2 * y1) - (y2 * x1));
                    quaternion.W = (w2 * w1) - (((x2 * x1) + (y2 * y1)) + (z2 * z1));

                    return quaternion.$clone();
                },
                /**
                 * Creates a new {@link } that contains concatenation between two quaternion.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    value1    The first {@link } to concatenate.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    value2    The second {@link } to concatenate.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    result    The result of rotation of <b>result</b> followed by <b>result</b> rotation as an output parameter.
                 * @return  {void}
                 */
                Concatenate$1: function (value1, value2, result) {
                    var x1 = value1.v.X;
                    var y1 = value1.v.Y;
                    var z1 = value1.v.Z;
                    var w1 = value1.v.W;

                    var x2 = value2.v.X;
                    var y2 = value2.v.Y;
                    var z2 = value2.v.Z;
                    var w2 = value2.v.W;

                    result.v.X = ((x2 * w1) + (x1 * w2)) + ((y2 * z1) - (z2 * y1));
                    result.v.Y = ((y2 * w1) + (y1 * w2)) + ((z2 * x1) - (x2 * z1));
                    result.v.Z = ((z2 * w1) + (z1 * w2)) + ((x2 * y1) - (y2 * x1));
                    result.v.W = (w2 * w1) - (((x2 * x1) + (y2 * y1)) + (z2 * z1));
                },
                /**
                 * Creates a new {@link } that contains conjugated version of the specified quaternion.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    value    The quaternion which values will be used to create the conjugated version.
                 * @return  {Microsoft.Xna.Framework.Quaternion}             The conjugate version of the specified quaternion.
                 */
                Conjugate: function (value) {
                    return new Microsoft.Xna.Framework.Quaternion.$ctor3(-value.X, -value.Y, -value.Z, value.W);
                },
                /**
                 * Creates a new {@link } that contains conjugated version of the specified quaternion.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    value     The quaternion which values will be used to create the conjugated version.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    result    The conjugated version of the specified quaternion as an output parameter.
                 * @return  {void}
                 */
                Conjugate$1: function (value, result) {
                    result.v.X = -value.v.X;
                    result.v.Y = -value.v.Y;
                    result.v.Z = -value.v.Z;
                    result.v.W = value.v.W;
                },
                /**
                 * Creates a new {@link } from the specified axis and angle.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Vector3}       axis     The axis of rotation.
                 * @param   {number}                                angle    The angle in radians.
                 * @return  {Microsoft.Xna.Framework.Quaternion}             The new quaternion builded from axis and angle.
                 */
                CreateFromAxisAngle: function (axis, angle) {
                    var half = angle * 0.5;
                    var sin = Math.sin(half);
                    var cos = Math.cos(half);
                    return new Microsoft.Xna.Framework.Quaternion.$ctor3(axis.X * sin, axis.Y * sin, axis.Z * sin, cos);
                },
                /**
                 * Creates a new {@link } from the specified axis and angle.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Vector3}       axis      The axis of rotation.
                 * @param   {number}                                angle     The angle in radians.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    result    The new quaternion builded from axis and angle as an output parameter.
                 * @return  {void}
                 */
                CreateFromAxisAngle$1: function (axis, angle, result) {
                    var half = angle * 0.5;
                    var sin = Math.sin(half);
                    var cos = Math.cos(half);
                    result.v.X = axis.v.X * sin;
                    result.v.Y = axis.v.Y * sin;
                    result.v.Z = axis.v.Z * sin;
                    result.v.W = cos;
                },
                /**
                 * Creates a new {@link } from the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Matrix}        matrix    The rotation matrix.
                 * @return  {Microsoft.Xna.Framework.Quaternion}              A quaternion composed from the rotation part of the matrix.
                 */
                CreateFromRotationMatrix: function (matrix) {
                    var quaternion = new Microsoft.Xna.Framework.Quaternion();
                    var sqrt;
                    var half;
                    var scale = matrix.M11 + matrix.M22 + matrix.M33;

                    if (scale > 0.0) {
                        sqrt = Math.sqrt(scale + 1.0);
                        quaternion.W = sqrt * 0.5;
                        sqrt = 0.5 / sqrt;

                        quaternion.X = (matrix.M23 - matrix.M32) * sqrt;
                        quaternion.Y = (matrix.M31 - matrix.M13) * sqrt;
                        quaternion.Z = (matrix.M12 - matrix.M21) * sqrt;

                        return quaternion.$clone();
                    }
                    if ((matrix.M11 >= matrix.M22) && (matrix.M11 >= matrix.M33)) {
                        sqrt = Math.sqrt(1.0 + matrix.M11 - matrix.M22 - matrix.M33);
                        half = 0.5 / sqrt;

                        quaternion.X = 0.5 * sqrt;
                        quaternion.Y = (matrix.M12 + matrix.M21) * half;
                        quaternion.Z = (matrix.M13 + matrix.M31) * half;
                        quaternion.W = (matrix.M23 - matrix.M32) * half;

                        return quaternion.$clone();
                    }
                    if (matrix.M22 > matrix.M33) {
                        sqrt = Math.sqrt(1.0 + matrix.M22 - matrix.M11 - matrix.M33);
                        half = 0.5 / sqrt;

                        quaternion.X = (matrix.M21 + matrix.M12) * half;
                        quaternion.Y = 0.5 * sqrt;
                        quaternion.Z = (matrix.M32 + matrix.M23) * half;
                        quaternion.W = (matrix.M31 - matrix.M13) * half;

                        return quaternion.$clone();
                    }
                    sqrt = Math.sqrt(1.0 + matrix.M33 - matrix.M11 - matrix.M22);
                    half = 0.5 / sqrt;

                    quaternion.X = (matrix.M31 + matrix.M13) * half;
                    quaternion.Y = (matrix.M32 + matrix.M23) * half;
                    quaternion.Z = 0.5 * sqrt;
                    quaternion.W = (matrix.M12 - matrix.M21) * half;

                    return quaternion.$clone();
                },
                /**
                 * Creates a new {@link } from the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Matrix}        matrix    The rotation matrix.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    result    A quaternion composed from the rotation part of the matrix as an output parameter.
                 * @return  {void}
                 */
                CreateFromRotationMatrix$1: function (matrix, result) {
                    var sqrt;
                    var half;
                    var scale = matrix.v.M11 + matrix.v.M22 + matrix.v.M33;

                    if (scale > 0.0) {
                        sqrt = Math.sqrt(scale + 1.0);
                        result.v.W = sqrt * 0.5;
                        sqrt = 0.5 / sqrt;

                        result.v.X = (matrix.v.M23 - matrix.v.M32) * sqrt;
                        result.v.Y = (matrix.v.M31 - matrix.v.M13) * sqrt;
                        result.v.Z = (matrix.v.M12 - matrix.v.M21) * sqrt;
                    } else if ((matrix.v.M11 >= matrix.v.M22) && (matrix.v.M11 >= matrix.v.M33)) {
                        sqrt = Math.sqrt(1.0 + matrix.v.M11 - matrix.v.M22 - matrix.v.M33);
                        half = 0.5 / sqrt;

                        result.v.X = 0.5 * sqrt;
                        result.v.Y = (matrix.v.M12 + matrix.v.M21) * half;
                        result.v.Z = (matrix.v.M13 + matrix.v.M31) * half;
                        result.v.W = (matrix.v.M23 - matrix.v.M32) * half;
                    } else if (matrix.v.M22 > matrix.v.M33) {
                        sqrt = Math.sqrt(1.0 + matrix.v.M22 - matrix.v.M11 - matrix.v.M33);
                        half = 0.5 / sqrt;

                        result.v.X = (matrix.v.M21 + matrix.v.M12) * half;
                        result.v.Y = 0.5 * sqrt;
                        result.v.Z = (matrix.v.M32 + matrix.v.M23) * half;
                        result.v.W = (matrix.v.M31 - matrix.v.M13) * half;
                    } else {
                        sqrt = Math.sqrt(1.0 + matrix.v.M33 - matrix.v.M11 - matrix.v.M22);
                        half = 0.5 / sqrt;

                        result.v.X = (matrix.v.M31 + matrix.v.M13) * half;
                        result.v.Y = (matrix.v.M32 + matrix.v.M23) * half;
                        result.v.Z = 0.5 * sqrt;
                        result.v.W = (matrix.v.M12 - matrix.v.M21) * half;
                    }
                },
                /**
                 * Creates a new {@link } from the specified yaw, pitch and roll angles.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {number}                                yaw      Yaw around the y axis in radians.
                 * @param   {number}                                pitch    Pitch around the x axis in radians.
                 * @param   {number}                                roll     Roll around the z axis in radians.
                 * @return  {Microsoft.Xna.Framework.Quaternion}             A new quaternion from the concatenated yaw, pitch, and roll angles.
                 */
                CreateFromYawPitchRoll: function (yaw, pitch, roll) {
                    var halfRoll = roll * 0.5;
                    var halfPitch = pitch * 0.5;
                    var halfYaw = yaw * 0.5;

                    var sinRoll = Math.sin(halfRoll);
                    var cosRoll = Math.cos(halfRoll);
                    var sinPitch = Math.sin(halfPitch);
                    var cosPitch = Math.cos(halfPitch);
                    var sinYaw = Math.sin(halfYaw);
                    var cosYaw = Math.cos(halfYaw);

                    return new Microsoft.Xna.Framework.Quaternion.$ctor3((cosYaw * sinPitch * cosRoll) + (sinYaw * cosPitch * sinRoll), (sinYaw * cosPitch * cosRoll) - (cosYaw * sinPitch * sinRoll), (cosYaw * cosPitch * sinRoll) - (sinYaw * sinPitch * cosRoll), (cosYaw * cosPitch * cosRoll) + (sinYaw * sinPitch * sinRoll));
                },
                /**
                 * Creates a new {@link } from the specified yaw, pitch and roll angles.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {number}                                yaw       Yaw around the y axis in radians.
                 * @param   {number}                                pitch     Pitch around the x axis in radians.
                 * @param   {number}                                roll      Roll around the z axis in radians.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    result    A new quaternion from the concatenated yaw, pitch, and roll angles as an output parameter.
                 * @return  {void}
                 */
                CreateFromYawPitchRoll$1: function (yaw, pitch, roll, result) {
                    var halfRoll = roll * 0.5;
                    var halfPitch = pitch * 0.5;
                    var halfYaw = yaw * 0.5;

                    var sinRoll = Math.sin(halfRoll);
                    var cosRoll = Math.cos(halfRoll);
                    var sinPitch = Math.sin(halfPitch);
                    var cosPitch = Math.cos(halfPitch);
                    var sinYaw = Math.sin(halfYaw);
                    var cosYaw = Math.cos(halfYaw);

                    result.v.X = (cosYaw * sinPitch * cosRoll) + (sinYaw * cosPitch * sinRoll);
                    result.v.Y = (sinYaw * cosPitch * cosRoll) - (cosYaw * sinPitch * sinRoll);
                    result.v.Z = (cosYaw * cosPitch * sinRoll) - (sinYaw * sinPitch * cosRoll);
                    result.v.W = (cosYaw * cosPitch * cosRoll) + (sinYaw * sinPitch * sinRoll);
                },
                /**
                 * Divides a {@link } by the other {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion2    Divisor {@link }.
                 * @return  {Microsoft.Xna.Framework.Quaternion}                   The result of dividing the quaternions.
                 */
                Divide: function (quaternion1, quaternion2) {
                    var quaternion = new Microsoft.Xna.Framework.Quaternion();
                    var x = quaternion1.X;
                    var y = quaternion1.Y;
                    var z = quaternion1.Z;
                    var w = quaternion1.W;
                    var num14 = (((quaternion2.X * quaternion2.X) + (quaternion2.Y * quaternion2.Y)) + (quaternion2.Z * quaternion2.Z)) + (quaternion2.W * quaternion2.W);
                    var num5 = 1.0 / num14;
                    var num4 = -quaternion2.X * num5;
                    var num3 = -quaternion2.Y * num5;
                    var num2 = -quaternion2.Z * num5;
                    var num = quaternion2.W * num5;
                    var num13 = (y * num2) - (z * num3);
                    var num12 = (z * num4) - (x * num2);
                    var num11 = (x * num3) - (y * num4);
                    var num10 = ((x * num4) + (y * num3)) + (z * num2);
                    quaternion.X = ((x * num) + (num4 * w)) + num13;
                    quaternion.Y = ((y * num) + (num3 * w)) + num12;
                    quaternion.Z = ((z * num) + (num2 * w)) + num11;
                    quaternion.W = (w * num) - num10;
                    return quaternion.$clone();
                },
                /**
                 * Divides a {@link } by the other {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion2    Divisor {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    result         The result of dividing the quaternions as an output parameter.
                 * @return  {void}
                 */
                Divide$1: function (quaternion1, quaternion2, result) {
                    var x = quaternion1.v.X;
                    var y = quaternion1.v.Y;
                    var z = quaternion1.v.Z;
                    var w = quaternion1.v.W;
                    var num14 = (((quaternion2.v.X * quaternion2.v.X) + (quaternion2.v.Y * quaternion2.v.Y)) + (quaternion2.v.Z * quaternion2.v.Z)) + (quaternion2.v.W * quaternion2.v.W);
                    var num5 = 1.0 / num14;
                    var num4 = -quaternion2.v.X * num5;
                    var num3 = -quaternion2.v.Y * num5;
                    var num2 = -quaternion2.v.Z * num5;
                    var num = quaternion2.v.W * num5;
                    var num13 = (y * num2) - (z * num3);
                    var num12 = (z * num4) - (x * num2);
                    var num11 = (x * num3) - (y * num4);
                    var num10 = ((x * num4) + (y * num3)) + (z * num2);
                    result.v.X = ((x * num) + (num4 * w)) + num13;
                    result.v.Y = ((y * num) + (num3 * w)) + num12;
                    result.v.Z = ((z * num) + (num2 * w)) + num11;
                    result.v.W = (w * num) - num10;
                },
                /**
                 * Returns a dot product of two quaternions.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion1    The first quaternion.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion2    The second quaternion.
                 * @return  {number}                                               The dot product of two quaternions.
                 */
                Dot: function (quaternion1, quaternion2) {
                    return ((((quaternion1.X * quaternion2.X) + (quaternion1.Y * quaternion2.Y)) + (quaternion1.Z * quaternion2.Z)) + (quaternion1.W * quaternion2.W));
                },
                /**
                 * Returns a dot product of two quaternions.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion1    The first quaternion.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion2    The second quaternion.
                 * @param   {System.Single}                         result         The dot product of two quaternions as an output parameter.
                 * @return  {void}
                 */
                Dot$1: function (quaternion1, quaternion2, result) {
                    result.v = (((quaternion1.v.X * quaternion2.v.X) + (quaternion1.v.Y * quaternion2.v.Y)) + (quaternion1.v.Z * quaternion2.v.Z)) + (quaternion1.v.W * quaternion2.v.W);
                },
                /**
                 * Returns the inverse quaternion which represents the opposite rotation.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion    Source {@link }.
                 * @return  {Microsoft.Xna.Framework.Quaternion}                  The inverse quaternion.
                 */
                Inverse: function (quaternion) {
                    var quaternion2 = new Microsoft.Xna.Framework.Quaternion();
                    var num2 = (((quaternion.X * quaternion.X) + (quaternion.Y * quaternion.Y)) + (quaternion.Z * quaternion.Z)) + (quaternion.W * quaternion.W);
                    var num = 1.0 / num2;
                    quaternion2.X = -quaternion.X * num;
                    quaternion2.Y = -quaternion.Y * num;
                    quaternion2.Z = -quaternion.Z * num;
                    quaternion2.W = quaternion.W * num;
                    return quaternion2.$clone();
                },
                /**
                 * Returns the inverse quaternion which represents the opposite rotation.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    result        The inverse quaternion as an output parameter.
                 * @return  {void}
                 */
                Inverse$1: function (quaternion, result) {
                    var num2 = (((quaternion.v.X * quaternion.v.X) + (quaternion.v.Y * quaternion.v.Y)) + (quaternion.v.Z * quaternion.v.Z)) + (quaternion.v.W * quaternion.v.W);
                    var num = 1.0 / num2;
                    result.v.X = -quaternion.v.X * num;
                    result.v.Y = -quaternion.v.Y * num;
                    result.v.Z = -quaternion.v.Z * num;
                    result.v.W = quaternion.v.W * num;
                },
                /**
                 * Performs a linear blend between two quaternions.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion2    Source {@link }.
                 * @param   {number}                                amount         The blend amount where 0 returns <b>amount</b> and 1 <b>amount</b>.
                 * @return  {Microsoft.Xna.Framework.Quaternion}                   The result of linear blending between two quaternions.
                 */
                Lerp: function (quaternion1, quaternion2, amount) {
                    var num = amount;
                    var num2 = 1.0 - num;
                    var quaternion = new Microsoft.Xna.Framework.Quaternion.ctor();
                    var num5 = (((quaternion1.X * quaternion2.X) + (quaternion1.Y * quaternion2.Y)) + (quaternion1.Z * quaternion2.Z)) + (quaternion1.W * quaternion2.W);
                    if (num5 >= 0.0) {
                        quaternion.X = (num2 * quaternion1.X) + (num * quaternion2.X);
                        quaternion.Y = (num2 * quaternion1.Y) + (num * quaternion2.Y);
                        quaternion.Z = (num2 * quaternion1.Z) + (num * quaternion2.Z);
                        quaternion.W = (num2 * quaternion1.W) + (num * quaternion2.W);
                    } else {
                        quaternion.X = (num2 * quaternion1.X) - (num * quaternion2.X);
                        quaternion.Y = (num2 * quaternion1.Y) - (num * quaternion2.Y);
                        quaternion.Z = (num2 * quaternion1.Z) - (num * quaternion2.Z);
                        quaternion.W = (num2 * quaternion1.W) - (num * quaternion2.W);
                    }
                    var num4 = (((quaternion.X * quaternion.X) + (quaternion.Y * quaternion.Y)) + (quaternion.Z * quaternion.Z)) + (quaternion.W * quaternion.W);
                    var num3 = 1.0 / Math.sqrt(num4);
                    quaternion.X *= num3;
                    quaternion.Y *= num3;
                    quaternion.Z *= num3;
                    quaternion.W *= num3;
                    return quaternion.$clone();
                },
                /**
                 * Performs a linear blend between two quaternions.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion2    Source {@link }.
                 * @param   {number}                                amount         The blend amount where 0 returns <b>amount</b> and 1 <b>amount</b>.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    result         The result of linear blending between two quaternions as an output parameter.
                 * @return  {void}
                 */
                Lerp$1: function (quaternion1, quaternion2, amount, result) {
                    var num = amount;
                    var num2 = 1.0 - num;
                    var num5 = (((quaternion1.v.X * quaternion2.v.X) + (quaternion1.v.Y * quaternion2.v.Y)) + (quaternion1.v.Z * quaternion2.v.Z)) + (quaternion1.v.W * quaternion2.v.W);
                    if (num5 >= 0.0) {
                        result.v.X = (num2 * quaternion1.v.X) + (num * quaternion2.v.X);
                        result.v.Y = (num2 * quaternion1.v.Y) + (num * quaternion2.v.Y);
                        result.v.Z = (num2 * quaternion1.v.Z) + (num * quaternion2.v.Z);
                        result.v.W = (num2 * quaternion1.v.W) + (num * quaternion2.v.W);
                    } else {
                        result.v.X = (num2 * quaternion1.v.X) - (num * quaternion2.v.X);
                        result.v.Y = (num2 * quaternion1.v.Y) - (num * quaternion2.v.Y);
                        result.v.Z = (num2 * quaternion1.v.Z) - (num * quaternion2.v.Z);
                        result.v.W = (num2 * quaternion1.v.W) - (num * quaternion2.v.W);
                    }
                    var num4 = (((result.v.X * result.v.X) + (result.v.Y * result.v.Y)) + (result.v.Z * result.v.Z)) + (result.v.W * result.v.W);
                    var num3 = 1.0 / Math.sqrt(num4);
                    result.v.X *= num3;
                    result.v.Y *= num3;
                    result.v.Z *= num3;
                    result.v.W *= num3;

                },
                /**
                 * Performs a spherical linear blend between two quaternions.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion2    Source {@link }.
                 * @param   {number}                                amount         The blend amount where 0 returns <b>amount</b> and 1 <b>amount</b>.
                 * @return  {Microsoft.Xna.Framework.Quaternion}                   The result of spherical linear blending between two quaternions.
                 */
                Slerp: function (quaternion1, quaternion2, amount) {
                    var num2;
                    var num3;
                    var quaternion = new Microsoft.Xna.Framework.Quaternion();
                    var num = amount;
                    var num4 = (((quaternion1.X * quaternion2.X) + (quaternion1.Y * quaternion2.Y)) + (quaternion1.Z * quaternion2.Z)) + (quaternion1.W * quaternion2.W);
                    var flag = false;
                    if (num4 < 0.0) {
                        flag = true;
                        num4 = -num4;
                    }
                    if (num4 > 0.999999) {
                        num3 = 1.0 - num;
                        num2 = flag ? -num : num;
                    } else {
                        var num5 = Math.acos(num4);
                        var num6 = 1.0 / Math.sin(num5);
                        num3 = Math.sin((1.0 - num) * num5) * num6;
                        num2 = flag ? ((-Math.sin(num * num5)) * num6) : (Math.sin(num * num5) * num6);
                    }
                    quaternion.X = (num3 * quaternion1.X) + (num2 * quaternion2.X);
                    quaternion.Y = (num3 * quaternion1.Y) + (num2 * quaternion2.Y);
                    quaternion.Z = (num3 * quaternion1.Z) + (num2 * quaternion2.Z);
                    quaternion.W = (num3 * quaternion1.W) + (num2 * quaternion2.W);
                    return quaternion.$clone();
                },
                /**
                 * Performs a spherical linear blend between two quaternions.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion2    Source {@link }.
                 * @param   {number}                                amount         The blend amount where 0 returns <b>amount</b> and 1 <b>amount</b>.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    result         The result of spherical linear blending between two quaternions as an output parameter.
                 * @return  {void}
                 */
                Slerp$1: function (quaternion1, quaternion2, amount, result) {
                    var num2;
                    var num3;
                    var num = amount;
                    var num4 = (((quaternion1.v.X * quaternion2.v.X) + (quaternion1.v.Y * quaternion2.v.Y)) + (quaternion1.v.Z * quaternion2.v.Z)) + (quaternion1.v.W * quaternion2.v.W);
                    var flag = false;
                    if (num4 < 0.0) {
                        flag = true;
                        num4 = -num4;
                    }
                    if (num4 > 0.999999) {
                        num3 = 1.0 - num;
                        num2 = flag ? -num : num;
                    } else {
                        var num5 = Math.acos(num4);
                        var num6 = 1.0 / Math.sin(num5);
                        num3 = Math.sin((1.0 - num) * num5) * num6;
                        num2 = flag ? ((-Math.sin(num * num5)) * num6) : (Math.sin(num * num5) * num6);
                    }
                    result.v.X = (num3 * quaternion1.v.X) + (num2 * quaternion2.v.X);
                    result.v.Y = (num3 * quaternion1.v.Y) + (num2 * quaternion2.v.Y);
                    result.v.Z = (num3 * quaternion1.v.Z) + (num2 * quaternion2.v.Z);
                    result.v.W = (num3 * quaternion1.v.W) + (num2 * quaternion2.v.W);
                },
                /**
                 * Creates a new {@link } that contains subtraction of one {@link } from another.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion2    Source {@link }.
                 * @return  {Microsoft.Xna.Framework.Quaternion}                   The result of the quaternion subtraction.
                 */
                Subtract: function (quaternion1, quaternion2) {
                    var quaternion = new Microsoft.Xna.Framework.Quaternion();
                    quaternion.X = quaternion1.X - quaternion2.X;
                    quaternion.Y = quaternion1.Y - quaternion2.Y;
                    quaternion.Z = quaternion1.Z - quaternion2.Z;
                    quaternion.W = quaternion1.W - quaternion2.W;
                    return quaternion.$clone();
                },
                /**
                 * Creates a new {@link } that contains subtraction of one {@link } from another.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion2    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    result         The result of the quaternion subtraction as an output parameter.
                 * @return  {void}
                 */
                Subtract$1: function (quaternion1, quaternion2, result) {
                    result.v.X = quaternion1.v.X - quaternion2.v.X;
                    result.v.Y = quaternion1.v.Y - quaternion2.v.Y;
                    result.v.Z = quaternion1.v.Z - quaternion2.v.Z;
                    result.v.W = quaternion1.v.W - quaternion2.v.W;
                },
                /**
                 * Creates a new {@link } that contains a multiplication of two quaternions.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion2    Source {@link }.
                 * @return  {Microsoft.Xna.Framework.Quaternion}                   The result of the quaternion multiplication.
                 */
                Multiply: function (quaternion1, quaternion2) {
                    var quaternion = new Microsoft.Xna.Framework.Quaternion();
                    var x = quaternion1.X;
                    var y = quaternion1.Y;
                    var z = quaternion1.Z;
                    var w = quaternion1.W;
                    var num4 = quaternion2.X;
                    var num3 = quaternion2.Y;
                    var num2 = quaternion2.Z;
                    var num = quaternion2.W;
                    var num12 = (y * num2) - (z * num3);
                    var num11 = (z * num4) - (x * num2);
                    var num10 = (x * num3) - (y * num4);
                    var num9 = ((x * num4) + (y * num3)) + (z * num2);
                    quaternion.X = ((x * num) + (num4 * w)) + num12;
                    quaternion.Y = ((y * num) + (num3 * w)) + num11;
                    quaternion.Z = ((z * num) + (num2 * w)) + num10;
                    quaternion.W = (w * num) - num9;
                    return quaternion.$clone();
                },
                /**
                 * Creates a new {@link } that contains a multiplication of {@link } and a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion1    Source {@link }.
                 * @param   {number}                                scaleFactor    Scalar value.
                 * @return  {Microsoft.Xna.Framework.Quaternion}                   The result of the quaternion multiplication with a scalar.
                 */
                Multiply$1: function (quaternion1, scaleFactor) {
                    var quaternion = new Microsoft.Xna.Framework.Quaternion();
                    quaternion.X = quaternion1.X * scaleFactor;
                    quaternion.Y = quaternion1.Y * scaleFactor;
                    quaternion.Z = quaternion1.Z * scaleFactor;
                    quaternion.W = quaternion1.W * scaleFactor;
                    return quaternion.$clone();
                },
                /**
                 * Creates a new {@link } that contains a multiplication of {@link } and a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion1    Source {@link }.
                 * @param   {number}                                scaleFactor    Scalar value.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    result         The result of the quaternion multiplication with a scalar as an output parameter.
                 * @return  {void}
                 */
                Multiply$3: function (quaternion1, scaleFactor, result) {
                    result.v.X = quaternion1.v.X * scaleFactor;
                    result.v.Y = quaternion1.v.Y * scaleFactor;
                    result.v.Z = quaternion1.v.Z * scaleFactor;
                    result.v.W = quaternion1.v.W * scaleFactor;
                },
                /**
                 * Creates a new {@link } that contains a multiplication of two quaternions.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion2    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    result         The result of the quaternion multiplication as an output parameter.
                 * @return  {void}
                 */
                Multiply$2: function (quaternion1, quaternion2, result) {
                    var x = quaternion1.v.X;
                    var y = quaternion1.v.Y;
                    var z = quaternion1.v.Z;
                    var w = quaternion1.v.W;
                    var num4 = quaternion2.v.X;
                    var num3 = quaternion2.v.Y;
                    var num2 = quaternion2.v.Z;
                    var num = quaternion2.v.W;
                    var num12 = (y * num2) - (z * num3);
                    var num11 = (z * num4) - (x * num2);
                    var num10 = (x * num3) - (y * num4);
                    var num9 = ((x * num4) + (y * num3)) + (z * num2);
                    result.v.X = ((x * num) + (num4 * w)) + num12;
                    result.v.Y = ((y * num) + (num3 * w)) + num11;
                    result.v.Z = ((z * num) + (num2 * w)) + num10;
                    result.v.W = (w * num) - num9;
                },
                /**
                 * Flips the sign of the all the quaternion components.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion    Source {@link }.
                 * @return  {Microsoft.Xna.Framework.Quaternion}                  The result of the quaternion negation.
                 */
                Negate: function (quaternion) {
                    return new Microsoft.Xna.Framework.Quaternion.$ctor3(-quaternion.X, -quaternion.Y, -quaternion.Z, -quaternion.W);
                },
                /**
                 * Flips the sign of the all the quaternion components.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    result        The result of the quaternion negation as an output parameter.
                 * @return  {void}
                 */
                Negate$1: function (quaternion, result) {
                    result.v.X = -quaternion.v.X;
                    result.v.Y = -quaternion.v.Y;
                    result.v.Z = -quaternion.v.Z;
                    result.v.W = -quaternion.v.W;
                },
                /**
                 * Scales the quaternion magnitude to unit length.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion    Source {@link }.
                 * @return  {Microsoft.Xna.Framework.Quaternion}                  The unit length quaternion.
                 */
                Normalize: function (quaternion) {
                    var result = new Microsoft.Xna.Framework.Quaternion();
                    var num = 1.0 / Math.sqrt((quaternion.X * quaternion.X) + (quaternion.Y * quaternion.Y) + (quaternion.Z * quaternion.Z) + (quaternion.W * quaternion.W));
                    result.X = quaternion.X * num;
                    result.Y = quaternion.Y * num;
                    result.Z = quaternion.Z * num;
                    result.W = quaternion.W * num;
                    return result.$clone();
                },
                /**
                 * Scales the quaternion magnitude to unit length.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    result        The unit length quaternion an output parameter.
                 * @return  {void}
                 */
                Normalize$1: function (quaternion, result) {
                    var num = 1.0 / Math.sqrt((quaternion.v.X * quaternion.v.X) + (quaternion.v.Y * quaternion.v.Y) + (quaternion.v.Z * quaternion.v.Z) + (quaternion.v.W * quaternion.v.W));
                    result.v.X = quaternion.v.X * num;
                    result.v.Y = quaternion.v.Y * num;
                    result.v.Z = quaternion.v.Z * num;
                    result.v.W = quaternion.v.W * num;
                }/**
                 * Adds two quaternions.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion1    Source {@link } on the left of the add sign.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion2    Source {@link } on the right of the add sign.
                 * @return  {Microsoft.Xna.Framework.Quaternion}                   Sum of the vectors.
                 */
                ,
                op_Addition: function (quaternion1, quaternion2) {
                    var quaternion = new Microsoft.Xna.Framework.Quaternion();
                    quaternion.X = quaternion1.X + quaternion2.X;
                    quaternion.Y = quaternion1.Y + quaternion2.Y;
                    quaternion.Z = quaternion1.Z + quaternion2.Z;
                    quaternion.W = quaternion1.W + quaternion2.W;
                    return quaternion.$clone();
                }/**
                 * Divides a {@link } by the other {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion1    Source {@link } on the left of the div sign.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion2    Divisor {@link } on the right of the div sign.
                 * @return  {Microsoft.Xna.Framework.Quaternion}                   The result of dividing the quaternions.
                 */
                ,
                op_Division: function (quaternion1, quaternion2) {
                    var quaternion = new Microsoft.Xna.Framework.Quaternion();
                    var x = quaternion1.X;
                    var y = quaternion1.Y;
                    var z = quaternion1.Z;
                    var w = quaternion1.W;
                    var num14 = (((quaternion2.X * quaternion2.X) + (quaternion2.Y * quaternion2.Y)) + (quaternion2.Z * quaternion2.Z)) + (quaternion2.W * quaternion2.W);
                    var num5 = 1.0 / num14;
                    var num4 = -quaternion2.X * num5;
                    var num3 = -quaternion2.Y * num5;
                    var num2 = -quaternion2.Z * num5;
                    var num = quaternion2.W * num5;
                    var num13 = (y * num2) - (z * num3);
                    var num12 = (z * num4) - (x * num2);
                    var num11 = (x * num3) - (y * num4);
                    var num10 = ((x * num4) + (y * num3)) + (z * num2);
                    quaternion.X = ((x * num) + (num4 * w)) + num13;
                    quaternion.Y = ((y * num) + (num3 * w)) + num12;
                    quaternion.Z = ((z * num) + (num2 * w)) + num11;
                    quaternion.W = (w * num) - num10;
                    return quaternion.$clone();
                }/**
                 * Compares whether two {@link } instances are equal.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion1    {@link } instance on the left of the equal sign.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion2    {@link } instance on the right of the equal sign.
                 * @return  {boolean}                                              <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
                 */
                ,
                op_Equality: function (quaternion1, quaternion2) {
                    return ((((quaternion1.X === quaternion2.X) && (quaternion1.Y === quaternion2.Y)) && (quaternion1.Z === quaternion2.Z)) && (quaternion1.W === quaternion2.W));
                }/**
                 * Compares whether two {@link } instances are not equal.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion1    {@link } instance on the left of the not equal sign.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion2    {@link } instance on the right of the not equal sign.
                 * @return  {boolean}                                              <pre><code>true</code></pre> if the instances are not equal; <pre><code>false</code></pre> otherwise.
                 */
                ,
                op_Inequality: function (quaternion1, quaternion2) {
                    if (((quaternion1.X === quaternion2.X) && (quaternion1.Y === quaternion2.Y)) && (quaternion1.Z === quaternion2.Z)) {
                        return (quaternion1.W !== quaternion2.W);
                    }
                    return true;
                }/**
                 * Multiplies two quaternions.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion1    Source {@link } on the left of the mul sign.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion2    Source {@link } on the right of the mul sign.
                 * @return  {Microsoft.Xna.Framework.Quaternion}                   Result of the quaternions multiplication.
                 */
                ,
                op_Multiply: function (quaternion1, quaternion2) {
                    var quaternion = new Microsoft.Xna.Framework.Quaternion();
                    var x = quaternion1.X;
                    var y = quaternion1.Y;
                    var z = quaternion1.Z;
                    var w = quaternion1.W;
                    var num4 = quaternion2.X;
                    var num3 = quaternion2.Y;
                    var num2 = quaternion2.Z;
                    var num = quaternion2.W;
                    var num12 = (y * num2) - (z * num3);
                    var num11 = (z * num4) - (x * num2);
                    var num10 = (x * num3) - (y * num4);
                    var num9 = ((x * num4) + (y * num3)) + (z * num2);
                    quaternion.X = ((x * num) + (num4 * w)) + num12;
                    quaternion.Y = ((y * num) + (num3 * w)) + num11;
                    quaternion.Z = ((z * num) + (num2 * w)) + num10;
                    quaternion.W = (w * num) - num9;
                    return quaternion.$clone();
                }/**
                 * Multiplies the components of quaternion by a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion1    Source {@link } on the left of the mul sign.
                 * @param   {number}                                scaleFactor    Scalar value on the right of the mul sign.
                 * @return  {Microsoft.Xna.Framework.Quaternion}                   Result of the quaternion multiplication with a scalar.
                 */
                ,
                op_Multiply$1: function (quaternion1, scaleFactor) {
                    var quaternion = new Microsoft.Xna.Framework.Quaternion();
                    quaternion.X = quaternion1.X * scaleFactor;
                    quaternion.Y = quaternion1.Y * scaleFactor;
                    quaternion.Z = quaternion1.Z * scaleFactor;
                    quaternion.W = quaternion1.W * scaleFactor;
                    return quaternion.$clone();
                }/**
                 * Subtracts a {@link } from a {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion1    Source {@link } on the left of the sub sign.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion2    Source {@link } on the right of the sub sign.
                 * @return  {Microsoft.Xna.Framework.Quaternion}                   Result of the quaternion subtraction.
                 */
                ,
                op_Subtraction: function (quaternion1, quaternion2) {
                    var quaternion = new Microsoft.Xna.Framework.Quaternion();
                    quaternion.X = quaternion1.X - quaternion2.X;
                    quaternion.Y = quaternion1.Y - quaternion2.Y;
                    quaternion.Z = quaternion1.Z - quaternion2.Z;
                    quaternion.W = quaternion1.W - quaternion2.W;
                    return quaternion.$clone();

                }/**
                 * Flips the sign of the all the quaternion components.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Quaternion
                 * @memberof Microsoft.Xna.Framework.Quaternion
                 * @param   {Microsoft.Xna.Framework.Quaternion}    quaternion    Source {@link } on the right of the sub sign.
                 * @return  {Microsoft.Xna.Framework.Quaternion}                  The result of the quaternion negation.
                 */
                ,
                op_UnaryNegation: function (quaternion) {
                    var quaternion2 = new Microsoft.Xna.Framework.Quaternion();
                    quaternion2.X = -quaternion.X;
                    quaternion2.Y = -quaternion.Y;
                    quaternion2.Z = -quaternion.Z;
                    quaternion2.W = -quaternion.W;
                    return quaternion2.$clone();
                },
                getDefaultValue: function () { return new Microsoft.Xna.Framework.Quaternion(); }
            }
        },
        fields: {
            /**
             * The x coordinate of this {@link }.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Quaternion
             * @type number
             */
            X: 0,
            /**
             * The y coordinate of this {@link }.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Quaternion
             * @type number
             */
            Y: 0,
            /**
             * The z coordinate of this {@link }.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Quaternion
             * @type number
             */
            Z: 0,
            /**
             * The rotation component of this {@link }.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Quaternion
             * @type number
             */
            W: 0
        },
        props: {
            DebugDisplayString: {
                get: function () {
                    if (Microsoft.Xna.Framework.Quaternion.op_Equality(this, Microsoft.Xna.Framework.Quaternion._identity.$clone())) {
                        return "Identity";
                    }

                    return System.String.concat([System.Single.format(this.X), " ", System.Single.format(this.Y), " ", System.Single.format(this.Z), " ", System.Single.format(this.W)]);
                }
            }
        },
        alias: ["equalsT", "System$IEquatable$1$Microsoft$Xna$Framework$Quaternion$equalsT"],
        ctors: {
            /**
             * Constructs a quaternion with X, Y, Z and W from four values.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Quaternion
             * @memberof Microsoft.Xna.Framework.Quaternion
             * @param   {number}    x    The x coordinate in 3d-space.
             * @param   {number}    y    The y coordinate in 3d-space.
             * @param   {number}    z    The z coordinate in 3d-space.
             * @param   {number}    w    The rotation component.
             * @return  {void}
             */
            $ctor3: function (x, y, z, w) {
                this.$initialize();
                this.X = x;
                this.Y = y;
                this.Z = z;
                this.W = w;
            },
            /**
             * Constructs a quaternion with X, Y, Z from {@link } and rotation component from a scalar.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Quaternion
             * @memberof Microsoft.Xna.Framework.Quaternion
             * @param   {Microsoft.Xna.Framework.Vector3}    value    The x, y, z coordinates in 3d-space.
             * @param   {number}                             w        The rotation component.
             * @return  {void}
             */
            $ctor1: function (value, w) {
                this.$initialize();
                this.X = value.X;
                this.Y = value.Y;
                this.Z = value.Z;
                this.W = w;
            },
            /**
             * Constructs a quaternion from {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Quaternion
             * @memberof Microsoft.Xna.Framework.Quaternion
             * @param   {Microsoft.Xna.Framework.Vector4}    value    The x, y, z coordinates in 3d-space and the rotation component.
             * @return  {void}
             */
            $ctor2: function (value) {
                this.$initialize();
                this.X = value.X;
                this.Y = value.Y;
                this.Z = value.Z;
                this.W = value.W;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Transforms this quaternion into its conjugated version.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Quaternion
             * @memberof Microsoft.Xna.Framework.Quaternion
             * @return  {void}
             */
            Conjugate: function () {
                this.X = -this.X;
                this.Y = -this.Y;
                this.Z = -this.Z;
            },
            /**
             * Compares whether current instance is equal to specified {@link }.
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.Quaternion
             * @memberof Microsoft.Xna.Framework.Quaternion
             * @param   {System.Object}    obj    The {@link } to compare.
             * @return  {boolean}                 <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
             */
            equals: function (obj) {
                if (Bridge.is(obj, Microsoft.Xna.Framework.Quaternion)) {
                    return this.equalsT(System.Nullable.getValue(Bridge.cast(Bridge.unbox(obj, Microsoft.Xna.Framework.Quaternion), Microsoft.Xna.Framework.Quaternion)));
                }
                return false;
            },
            /**
             * Compares whether current instance is equal to specified {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Quaternion
             * @memberof Microsoft.Xna.Framework.Quaternion
             * @param   {Microsoft.Xna.Framework.Quaternion}    other    The {@link } to compare.
             * @return  {boolean}                                        <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
             */
            equalsT: function (other) {
                return this.X === other.X && this.Y === other.Y && this.Z === other.Z && this.W === other.W;
            },
            /**
             * Gets the hash code of this {@link }.
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.Quaternion
             * @memberof Microsoft.Xna.Framework.Quaternion
             * @return  {number}        Hash code of this {@link }.
             */
            getHashCode: function () {
                return ((((((System.Single.getHashCode(this.X) + System.Single.getHashCode(this.Y)) | 0) + System.Single.getHashCode(this.Z)) | 0) + System.Single.getHashCode(this.W)) | 0);
            },
            /**
             * Returns the magnitude of the quaternion components.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Quaternion
             * @memberof Microsoft.Xna.Framework.Quaternion
             * @return  {number}        The magnitude of the quaternion components.
             */
            Length: function () {
                return Math.sqrt((this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z) + (this.W * this.W));
            },
            /**
             * Returns the squared magnitude of the quaternion components.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Quaternion
             * @memberof Microsoft.Xna.Framework.Quaternion
             * @return  {number}        The squared magnitude of the quaternion components.
             */
            LengthSquared: function () {
                return (this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z) + (this.W * this.W);
            },
            /**
             * Scales the quaternion magnitude to unit length.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Quaternion
             * @memberof Microsoft.Xna.Framework.Quaternion
             * @return  {void}
             */
            Normalize: function () {
                var num = 1.0 / Math.sqrt((this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z) + (this.W * this.W));
                this.X *= num;
                this.Y *= num;
                this.Z *= num;
                this.W *= num;
            },
            /**
             * Returns a {@link } representation of this {@link } in the format:
             {X:[{@link }] Y:[{@link }] Z:[{@link }] W:[{@link }]}
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.Quaternion
             * @memberof Microsoft.Xna.Framework.Quaternion
             * @return  {string}        A {@link } representation of this {@link }.
             */
            toString: function () {
                return "{X:" + System.Single.format(this.X) + " Y:" + System.Single.format(this.Y) + " Z:" + System.Single.format(this.Z) + " W:" + System.Single.format(this.W) + "}";
            },
            /**
             * Gets a {@link } representation for this object.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Quaternion
             * @memberof Microsoft.Xna.Framework.Quaternion
             * @return  {Microsoft.Xna.Framework.Vector4}        A {@link } representation for this object.
             */
            ToVector4: function () {
                return new Microsoft.Xna.Framework.Vector4.$ctor4(this.X, this.Y, this.Z, this.W);
            },
            Deconstruct: function (x, y, z, w) {
                x.v = this.X;
                y.v = this.Y;
                z.v = this.Z;
                w.v = this.W;
            },
            $clone: function (to) {
                var s = to || new Microsoft.Xna.Framework.Quaternion();
                s.X = this.X;
                s.Y = this.Y;
                s.Z = this.Z;
                s.W = this.W;
                return s;
            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.Ray", {
        inherits: function () { return [System.IEquatable$1(Microsoft.Xna.Framework.Ray)]; },
        $kind: "struct",
        statics: {
            methods: {
                op_Inequality: function (a, b) {
                    return !a.equalsT(b.$clone());
                },
                op_Equality: function (a, b) {
                    return a.equalsT(b.$clone());
                },
                getDefaultValue: function () { return new Microsoft.Xna.Framework.Ray(); }
            }
        },
        fields: {
            Direction: null,
            Position: null
        },
        props: {
            DebugDisplayString: {
                get: function () {
                    return System.String.concat(["Pos( ", this.Position.DebugDisplayString, " )  \r\n", "Dir( ", this.Direction.DebugDisplayString, " )"]);
                }
            }
        },
        alias: ["equalsT", "System$IEquatable$1$Microsoft$Xna$Framework$Ray$equalsT"],
        ctors: {
            init: function () {
                this.Direction = new Microsoft.Xna.Framework.Vector3();
                this.Position = new Microsoft.Xna.Framework.Vector3();
            },
            $ctor1: function (position, direction) {
                this.$initialize();
                this.Position = position.$clone();
                this.Direction = direction.$clone();
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            equals: function (obj) {
                return (Bridge.is(obj, Microsoft.Xna.Framework.Ray)) ? this.equalsT(System.Nullable.getValue(Bridge.cast(Bridge.unbox(obj, Microsoft.Xna.Framework.Ray), Microsoft.Xna.Framework.Ray))) : false;
            },
            equalsT: function (other) {
                return this.Position.equalsT(other.Position.$clone()) && this.Direction.equalsT(other.Direction.$clone());
            },
            getHashCode: function () {
                return this.Position.getHashCode() ^ this.Direction.getHashCode();
            },
            Intersects: function (box) {
                var Epsilon = 1E-06;

                var tMin = null, tMax = null;

                if (Math.abs(this.Direction.X) < Epsilon) {
                    if (this.Position.X < box.Min.X || this.Position.X > box.Max.X) {
                        return null;
                    }
                } else {
                    tMin = (box.Min.X - this.Position.X) / this.Direction.X;
                    tMax = (box.Max.X - this.Position.X) / this.Direction.X;

                    if (System.Nullable.gt(tMin, tMax)) {
                        var temp = tMin;
                        tMin = tMax;
                        tMax = temp;
                    }
                }

                if (Math.abs(this.Direction.Y) < Epsilon) {
                    if (this.Position.Y < box.Min.Y || this.Position.Y > box.Max.Y) {
                        return null;
                    }
                } else {
                    var tMinY = (box.Min.Y - this.Position.Y) / this.Direction.Y;
                    var tMaxY = (box.Max.Y - this.Position.Y) / this.Direction.Y;

                    if (tMinY > tMaxY) {
                        var temp1 = tMinY;
                        tMinY = tMaxY;
                        tMaxY = temp1;
                    }

                    if ((System.Nullable.hasValue(tMin) && System.Nullable.gt(tMin, tMaxY)) || (System.Nullable.hasValue(tMax) && System.Nullable.gt(tMinY, tMax))) {
                        return null;
                    }

                    if (!System.Nullable.hasValue(tMin) || System.Nullable.gt(tMinY, tMin)) {
                        tMin = tMinY;
                    }
                    if (!System.Nullable.hasValue(tMax) || System.Nullable.lt(tMaxY, tMax)) {
                        tMax = tMaxY;
                    }
                }

                if (Math.abs(this.Direction.Z) < Epsilon) {
                    if (this.Position.Z < box.Min.Z || this.Position.Z > box.Max.Z) {
                        return null;
                    }
                } else {
                    var tMinZ = (box.Min.Z - this.Position.Z) / this.Direction.Z;
                    var tMaxZ = (box.Max.Z - this.Position.Z) / this.Direction.Z;

                    if (tMinZ > tMaxZ) {
                        var temp2 = tMinZ;
                        tMinZ = tMaxZ;
                        tMaxZ = temp2;
                    }

                    if ((System.Nullable.hasValue(tMin) && System.Nullable.gt(tMin, tMaxZ)) || (System.Nullable.hasValue(tMax) && System.Nullable.gt(tMinZ, tMax))) {
                        return null;
                    }

                    if (!System.Nullable.hasValue(tMin) || System.Nullable.gt(tMinZ, tMin)) {
                        tMin = tMinZ;
                    }
                    if (!System.Nullable.hasValue(tMax) || System.Nullable.lt(tMaxZ, tMax)) {
                        tMax = tMaxZ;
                    }
                }

                if ((System.Nullable.hasValue(tMin) && System.Nullable.lt(tMin, 0)) && System.Nullable.gt(tMax, 0)) {
                    return 0;
                }

                if (System.Nullable.lt(tMin, 0)) {
                    return null;
                }

                return tMin;
            },
            Intersects$3: function (box, result) {
                result.v = this.Intersects(box.v.$clone());
            },
            Intersects$1: function (sphere) {
                sphere = {v:sphere};
                var result = { };
                this.Intersects$4(sphere, result);
                return result.v;
            },
            Intersects$2: function (plane) {
                plane = {v:plane};
                var result = { };
                this.Intersects$5(plane, result);
                return result.v;
            },
            Intersects$5: function (plane, result) {
                var den = Microsoft.Xna.Framework.Vector3.Dot(this.Direction.$clone(), plane.v.Normal.$clone());
                if (Math.abs(den) < 1E-05) {
                    result.v = null;
                    return;
                }

                result.v = (-plane.v.D - Microsoft.Xna.Framework.Vector3.Dot(plane.v.Normal.$clone(), this.Position.$clone())) / den;

                if (System.Nullable.lt(result.v, 0.0)) {
                    if (System.Nullable.lt(result.v, -1E-05)) {
                        result.v = null;
                        return;
                    }

                    result.v = 0.0;
                }
            },
            Intersects$4: function (sphere, result) {
                var difference = { v : Microsoft.Xna.Framework.Vector3.op_Subtraction(sphere.v.Center.$clone(), this.Position.$clone()) };

                var differenceLengthSquared = difference.v.LengthSquared();
                var sphereRadiusSquared = sphere.v.Radius * sphere.v.Radius;

                var distanceAlongRay = { };

                if (differenceLengthSquared < sphereRadiusSquared) {
                    result.v = 0.0;
                    return;
                }

                Microsoft.Xna.Framework.Vector3.Dot$1(Bridge.ref(this, "Direction"), difference, distanceAlongRay);
                if (distanceAlongRay.v < 0) {
                    result.v = null;
                    return;
                }

                var dist = sphereRadiusSquared + distanceAlongRay.v * distanceAlongRay.v - differenceLengthSquared;

                result.v = (dist < 0) ? null : System.Nullable.sub(distanceAlongRay.v, Math.sqrt(dist));
            },
            toString: function () {
                return "{{Position:" + (this.Position.toString() || "") + " Direction:" + (this.Direction.toString() || "") + "}}";
            },
            /**
             * Deconstruction method for {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Ray
             * @memberof Microsoft.Xna.Framework.Ray
             * @param   {Microsoft.Xna.Framework.Vector3}    position     Receives the start position of the ray.
             * @param   {Microsoft.Xna.Framework.Vector3}    direction    Receives the direction of the ray.
             * @return  {void}
             */
            Deconstruct: function (position, direction) {
                position.v = this.Position.$clone();
                direction.v = this.Direction.$clone();
            },
            $clone: function (to) {
                var s = to || new Microsoft.Xna.Framework.Ray();
                s.Direction = this.Direction.$clone();
                s.Position = this.Position.$clone();
                return s;
            }
        }
    });

    /**
     * Describes a 2D-rectangle.
     *
     * @public
     * @class Microsoft.Xna.Framework.Rectangle
     * @implements  System.IEquatable$1
     */
    Bridge.define("Microsoft.Xna.Framework.Rectangle", {
        inherits: function () { return [System.IEquatable$1(Microsoft.Xna.Framework.Rectangle)]; },
        $kind: "struct",
        statics: {
            fields: {
                emptyRectangle: null
            },
            props: {
                /**
                 * Returns a {@link } with X=0, Y=0, Width=0, Height=0.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Rectangle
                 * @function Empty
                 * @type Microsoft.Xna.Framework.Rectangle
                 */
                Empty: {
                    get: function () {
                        return Microsoft.Xna.Framework.Rectangle.emptyRectangle.$clone();
                    }
                }
            },
            ctors: {
                init: function () {
                    this.emptyRectangle = new Microsoft.Xna.Framework.Rectangle();
                }
            },
            methods: {
                /**
                 * Creates a new {@link } that contains overlapping region of two other rectangles.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Rectangle
                 * @memberof Microsoft.Xna.Framework.Rectangle
                 * @param   {Microsoft.Xna.Framework.Rectangle}    value1    The first {@link }.
                 * @param   {Microsoft.Xna.Framework.Rectangle}    value2    The second {@link }.
                 * @return  {Microsoft.Xna.Framework.Rectangle}              Overlapping region of the two rectangles.
                 */
                Intersect: function (value1, value2) {
                    value1 = {v:value1};
                    value2 = {v:value2};
                    var rectangle = { v : new Microsoft.Xna.Framework.Rectangle() };
                    Microsoft.Xna.Framework.Rectangle.Intersect$1(value1, value2, rectangle);
                    return rectangle.v.$clone();
                },
                /**
                 * Creates a new {@link } that contains overlapping region of two other rectangles.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Rectangle
                 * @memberof Microsoft.Xna.Framework.Rectangle
                 * @param   {Microsoft.Xna.Framework.Rectangle}    value1    The first {@link }.
                 * @param   {Microsoft.Xna.Framework.Rectangle}    value2    The second {@link }.
                 * @param   {Microsoft.Xna.Framework.Rectangle}    result    Overlapping region of the two rectangles as an output parameter.
                 * @return  {void}
                 */
                Intersect$1: function (value1, value2, result) {
                    if (value1.v.Intersects(value2.v.$clone())) {
                        var right_side = Math.min(((value1.v.X + value1.v.Width) | 0), ((value2.v.X + value2.v.Width) | 0));
                        var left_side = Math.max(value1.v.X, value2.v.X);
                        var top_side = Math.max(value1.v.Y, value2.v.Y);
                        var bottom_side = Math.min(((value1.v.Y + value1.v.Height) | 0), ((value2.v.Y + value2.v.Height) | 0));
                        result.v = new Microsoft.Xna.Framework.Rectangle.$ctor2(left_side, top_side, ((right_side - left_side) | 0), ((bottom_side - top_side) | 0));
                    } else {
                        result.v = new Microsoft.Xna.Framework.Rectangle.$ctor2(0, 0, 0, 0);
                    }
                },
                /**
                 * Creates a new {@link } that completely contains two other rectangles.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Rectangle
                 * @memberof Microsoft.Xna.Framework.Rectangle
                 * @param   {Microsoft.Xna.Framework.Rectangle}    value1    The first {@link }.
                 * @param   {Microsoft.Xna.Framework.Rectangle}    value2    The second {@link }.
                 * @return  {Microsoft.Xna.Framework.Rectangle}              The union of the two rectangles.
                 */
                Union: function (value1, value2) {
                    var x = Math.min(value1.X, value2.X);
                    var y = Math.min(value1.Y, value2.Y);
                    return new Microsoft.Xna.Framework.Rectangle.$ctor2(x, y, ((Math.max(value1.Right, value2.Right) - x) | 0), ((Math.max(value1.Bottom, value2.Bottom) - y) | 0));
                },
                /**
                 * Creates a new {@link } that completely contains two other rectangles.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Rectangle
                 * @memberof Microsoft.Xna.Framework.Rectangle
                 * @param   {Microsoft.Xna.Framework.Rectangle}    value1    The first {@link }.
                 * @param   {Microsoft.Xna.Framework.Rectangle}    value2    The second {@link }.
                 * @param   {Microsoft.Xna.Framework.Rectangle}    result    The union of the two rectangles as an output parameter.
                 * @return  {void}
                 */
                Union$1: function (value1, value2, result) {
                    result.v.X = Math.min(value1.v.X, value2.v.X);
                    result.v.Y = Math.min(value1.v.Y, value2.v.Y);
                    result.v.Width = (Math.max(value1.v.Right, value2.v.Right) - result.v.X) | 0;
                    result.v.Height = (Math.max(value1.v.Bottom, value2.v.Bottom) - result.v.Y) | 0;
                }/**
                 * Compares whether two {@link } instances are equal.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Rectangle
                 * @memberof Microsoft.Xna.Framework.Rectangle
                 * @param   {Microsoft.Xna.Framework.Rectangle}    a    {@link } instance on the left of the equal sign.
                 * @param   {Microsoft.Xna.Framework.Rectangle}    b    {@link } instance on the right of the equal sign.
                 * @return  {boolean}                                   <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
                 */
                ,
                op_Equality: function (a, b) {
                    return ((a.X === b.X) && (a.Y === b.Y) && (a.Width === b.Width) && (a.Height === b.Height));
                }/**
                 * Compares whether two {@link } instances are not equal.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Rectangle
                 * @memberof Microsoft.Xna.Framework.Rectangle
                 * @param   {Microsoft.Xna.Framework.Rectangle}    a    {@link } instance on the left of the not equal sign.
                 * @param   {Microsoft.Xna.Framework.Rectangle}    b    {@link } instance on the right of the not equal sign.
                 * @return  {boolean}                                   <pre><code>true</code></pre> if the instances are not equal; <pre><code>false</code></pre> otherwise.
                 */
                ,
                op_Inequality: function (a, b) {
                    return !(Microsoft.Xna.Framework.Rectangle.op_Equality(a.$clone(), b.$clone()));
                },
                getDefaultValue: function () { return new Microsoft.Xna.Framework.Rectangle(); }
            }
        },
        fields: {
            /**
             * The x coordinate of the top-left corner of this {@link }.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @type number
             */
            X: 0,
            /**
             * The y coordinate of the top-left corner of this {@link }.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @type number
             */
            Y: 0,
            /**
             * The width of this {@link }.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @type number
             */
            Width: 0,
            /**
             * The height of this {@link }.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @type number
             */
            Height: 0
        },
        props: {
            /**
             * Returns the x coordinate of the left edge of this {@link }.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @function Left
             * @type number
             */
            Left: {
                get: function () {
                    return this.X;
                }
            },
            /**
             * Returns the x coordinate of the right edge of this {@link }.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @function Right
             * @type number
             */
            Right: {
                get: function () {
                    return (((this.X + this.Width) | 0));
                }
            },
            /**
             * Returns the y coordinate of the top edge of this {@link }.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @function Top
             * @type number
             */
            Top: {
                get: function () {
                    return this.Y;
                }
            },
            /**
             * Returns the y coordinate of the bottom edge of this {@link }.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @function Bottom
             * @type number
             */
            Bottom: {
                get: function () {
                    return (((this.Y + this.Height) | 0));
                }
            },
            /**
             * Whether or not this {@link } has a {@link } and
             {@link } of 0, and a {@link } of (0, 0).
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @function IsEmpty
             * @type boolean
             */
            IsEmpty: {
                get: function () {
                    return ((((this.Width === 0) && (this.Height === 0)) && (this.X === 0)) && (this.Y === 0));
                }
            },
            /**
             * The top-left coordinates of this {@link }.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @function Location
             * @type Microsoft.Xna.Framework.Point
             */
            Location: {
                get: function () {
                    return new Microsoft.Xna.Framework.Point.$ctor2(this.X, this.Y);
                },
                set: function (value) {
                    this.X = value.X;
                    this.Y = value.Y;
                }
            },
            /**
             * The width-height coordinates of this {@link }.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @function Size
             * @type Microsoft.Xna.Framework.Point
             */
            Size: {
                get: function () {
                    return new Microsoft.Xna.Framework.Point.$ctor2(this.Width, this.Height);
                },
                set: function (value) {
                    this.Width = value.X;
                    this.Height = value.Y;
                }
            },
            /**
             * A {@link } located in the center of this {@link }.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @function Center
             * @type Microsoft.Xna.Framework.Point
             */
            Center: {
                get: function () {
                    return new Microsoft.Xna.Framework.Point.$ctor2(((this.X + (((Bridge.Int.div(this.Width, 2)) | 0))) | 0), ((this.Y + (((Bridge.Int.div(this.Height, 2)) | 0))) | 0));
                }
            },
            DebugDisplayString: {
                get: function () {
                    return System.String.concat(Bridge.box(this.X, System.Int32), "  ", Bridge.box(this.Y, System.Int32), "  ", Bridge.box(this.Width, System.Int32), "  ", Bridge.box(this.Height, System.Int32));
                }
            }
        },
        alias: ["equalsT", "System$IEquatable$1$Microsoft$Xna$Framework$Rectangle$equalsT"],
        ctors: {
            /**
             * Creates a new instance of {@link } struct, with the specified
             position, width, and height.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Rectangle
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @param   {number}    x         The x coordinate of the top-left corner of the created {@link }.
             * @param   {number}    y         The y coordinate of the top-left corner of the created {@link }.
             * @param   {number}    width     The width of the created {@link }.
             * @param   {number}    height    The height of the created {@link }.
             * @return  {void}
             */
            $ctor2: function (x, y, width, height) {
                this.$initialize();
                this.X = x;
                this.Y = y;
                this.Width = width;
                this.Height = height;
            },
            /**
             * Creates a new instance of {@link } struct, with the specified
             location and size.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Rectangle
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @param   {Microsoft.Xna.Framework.Point}    location    The x and y coordinates of the top-left corner of the created {@link }.
             * @param   {Microsoft.Xna.Framework.Point}    size        The width and height of the created {@link }.
             * @return  {void}
             */
            $ctor1: function (location, size) {
                this.$initialize();
                this.X = location.X;
                this.Y = location.Y;
                this.Width = size.X;
                this.Height = size.Y;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Gets whether or not the provided coordinates lie within the bounds of this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Rectangle
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @param   {number}     x    The x coordinate of the point to check for containment.
             * @param   {number}     y    The y coordinate of the point to check for containment.
             * @return  {boolean}         <pre><code>true</code></pre> if the provided coordinates lie inside this {@link }; <pre><code>false</code></pre> otherwise.
             */
            Contains$3: function (x, y) {
                return ((((this.X <= x) && (x < (((this.X + this.Width) | 0)))) && (this.Y <= y)) && (y < (((this.Y + this.Height) | 0))));
            },
            /**
             * Gets whether or not the provided coordinates lie within the bounds of this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Rectangle
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @param   {number}     x    The x coordinate of the point to check for containment.
             * @param   {number}     y    The y coordinate of the point to check for containment.
             * @return  {boolean}         <pre><code>true</code></pre> if the provided coordinates lie inside this {@link }; <pre><code>false</code></pre> otherwise.
             */
            Contains$4: function (x, y) {
                return ((((this.X <= x) && (x < (((this.X + this.Width) | 0)))) && (this.Y <= y)) && (y < (((this.Y + this.Height) | 0))));
            },
            /**
             * Gets whether or not the provided {@link } lies within the bounds of this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Rectangle
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @param   {Microsoft.Xna.Framework.Point}    value    The coordinates to check for inclusion in this {@link }.
             * @return  {boolean}                                   <pre><code>true</code></pre> if the provided {@link } lies inside this {@link }; <pre><code>false</code></pre> otherwise.
             */
            Contains: function (value) {
                return ((((this.X <= value.X) && (value.X < (((this.X + this.Width) | 0)))) && (this.Y <= value.Y)) && (value.Y < (((this.Y + this.Height) | 0))));
            },
            /**
             * Gets whether or not the provided {@link } lies within the bounds of this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Rectangle
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @param   {Microsoft.Xna.Framework.Point}    value     The coordinates to check for inclusion in this {@link }.
             * @param   {System.Boolean}                   result    <pre><code>true</code></pre> if the provided {@link } lies inside this {@link }; <pre><code>false</code></pre> otherwise. As an output parameter.
             * @return  {void}
             */
            Contains$5: function (value, result) {
                result.v = ((((this.X <= value.v.X) && (value.v.X < (((this.X + this.Width) | 0)))) && (this.Y <= value.v.Y)) && (value.v.Y < (((this.Y + this.Height) | 0))));
            },
            /**
             * Gets whether or not the provided {@link } lies within the bounds of this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Rectangle
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @param   {Microsoft.Xna.Framework.Vector2}    value    The coordinates to check for inclusion in this {@link }.
             * @return  {boolean}                                     <pre><code>true</code></pre> if the provided {@link } lies inside this {@link }; <pre><code>false</code></pre> otherwise.
             */
            Contains$2: function (value) {
                return ((((this.X <= value.X) && (value.X < (((this.X + this.Width) | 0)))) && (this.Y <= value.Y)) && (value.Y < (((this.Y + this.Height) | 0))));
            },
            /**
             * Gets whether or not the provided {@link } lies within the bounds of this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Rectangle
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @param   {Microsoft.Xna.Framework.Vector2}    value     The coordinates to check for inclusion in this {@link }.
             * @param   {System.Boolean}                     result    <pre><code>true</code></pre> if the provided {@link } lies inside this {@link }; <pre><code>false</code></pre> otherwise. As an output parameter.
             * @return  {void}
             */
            Contains$7: function (value, result) {
                result.v = ((((this.X <= value.v.X) && (value.v.X < (((this.X + this.Width) | 0)))) && (this.Y <= value.v.Y)) && (value.v.Y < (((this.Y + this.Height) | 0))));
            },
            /**
             * Gets whether or not the provided {@link } lies within the bounds of this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Rectangle
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @param   {Microsoft.Xna.Framework.Rectangle}    value    The {@link } to check for inclusion in this {@link }.
             * @return  {boolean}                                       <pre><code>true</code></pre> if the provided {@link }'s bounds lie entirely inside this {@link }; <pre><code>false</code></pre> otherwise.
             */
            Contains$1: function (value) {
                return ((((this.X <= value.X) && ((((value.X + value.Width) | 0)) <= (((this.X + this.Width) | 0)))) && (this.Y <= value.Y)) && ((((value.Y + value.Height) | 0)) <= (((this.Y + this.Height) | 0))));
            },
            /**
             * Gets whether or not the provided {@link } lies within the bounds of this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Rectangle
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @param   {Microsoft.Xna.Framework.Rectangle}    value     The {@link } to check for inclusion in this {@link }.
             * @param   {System.Boolean}                       result    <pre><code>true</code></pre> if the provided {@link }'s bounds lie entirely inside this {@link }; <pre><code>false</code></pre> otherwise. As an output parameter.
             * @return  {void}
             */
            Contains$6: function (value, result) {
                result.v = ((((this.X <= value.v.X) && ((((value.v.X + value.v.Width) | 0)) <= (((this.X + this.Width) | 0)))) && (this.Y <= value.v.Y)) && ((((value.v.Y + value.v.Height) | 0)) <= (((this.Y + this.Height) | 0))));
            },
            /**
             * Compares whether current instance is equal to specified {@link }.
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.Rectangle
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @param   {System.Object}    obj    The {@link } to compare.
             * @return  {boolean}                 <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
             */
            equals: function (obj) {
                return (Bridge.is(obj, Microsoft.Xna.Framework.Rectangle)) && Microsoft.Xna.Framework.Rectangle.op_Equality(this, System.Nullable.getValue(Bridge.cast(Bridge.unbox(obj, Microsoft.Xna.Framework.Rectangle), Microsoft.Xna.Framework.Rectangle)));
            },
            /**
             * Compares whether current instance is equal to specified {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Rectangle
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @param   {Microsoft.Xna.Framework.Rectangle}    other    The {@link } to compare.
             * @return  {boolean}                                       <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
             */
            equalsT: function (other) {
                return Microsoft.Xna.Framework.Rectangle.op_Equality(this, other.$clone());
            },
            /**
             * Gets the hash code of this {@link }.
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.Rectangle
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @return  {number}        Hash code of this {@link }.
             */
            getHashCode: function () {
                var hash = 17;
                hash = (Bridge.Int.mul(hash, 23) + Bridge.getHashCode(this.X)) | 0;
                hash = (Bridge.Int.mul(hash, 23) + Bridge.getHashCode(this.Y)) | 0;
                hash = (Bridge.Int.mul(hash, 23) + Bridge.getHashCode(this.Width)) | 0;
                hash = (Bridge.Int.mul(hash, 23) + Bridge.getHashCode(this.Height)) | 0;
                return hash;
            },
            /**
             * Adjusts the edges of this {@link } by specified horizontal and vertical amounts.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Rectangle
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @param   {number}    horizontalAmount    Value to adjust the left and right edges.
             * @param   {number}    verticalAmount      Value to adjust the top and bottom edges.
             * @return  {void}
             */
            Inflate: function (horizontalAmount, verticalAmount) {
                this.X = (this.X - horizontalAmount) | 0;
                this.Y = (this.Y - verticalAmount) | 0;
                this.Width = (this.Width + (Bridge.Int.mul(horizontalAmount, 2))) | 0;
                this.Height = (this.Height + (Bridge.Int.mul(verticalAmount, 2))) | 0;
            },
            /**
             * Adjusts the edges of this {@link } by specified horizontal and vertical amounts.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Rectangle
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @param   {number}    horizontalAmount    Value to adjust the left and right edges.
             * @param   {number}    verticalAmount      Value to adjust the top and bottom edges.
             * @return  {void}
             */
            Inflate$1: function (horizontalAmount, verticalAmount) {
                this.X = (this.X - Bridge.Int.clip32(horizontalAmount)) | 0;
                this.Y = (this.Y - Bridge.Int.clip32(verticalAmount)) | 0;
                this.Width = (this.Width + (Bridge.Int.mul(Bridge.Int.clip32(horizontalAmount), 2))) | 0;
                this.Height = (this.Height + (Bridge.Int.mul(Bridge.Int.clip32(verticalAmount), 2))) | 0;
            },
            /**
             * Gets whether or not the other {@link } intersects with this rectangle.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Rectangle
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @param   {Microsoft.Xna.Framework.Rectangle}    value    The other rectangle for testing.
             * @return  {boolean}                                       <pre><code>true</code></pre> if other {@link } intersects with this rectangle; <pre><code>false</code></pre> otherwise.
             */
            Intersects: function (value) {
                return value.Left < this.Right && this.Left < value.Right && value.Top < this.Bottom && this.Top < value.Bottom;
            },
            /**
             * Gets whether or not the other {@link } intersects with this rectangle.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Rectangle
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @param   {Microsoft.Xna.Framework.Rectangle}    value     The other rectangle for testing.
             * @param   {System.Boolean}                       result    <pre><code>true</code></pre> if other {@link } intersects with this rectangle; <pre><code>false</code></pre> otherwise. As an output parameter.
             * @return  {void}
             */
            Intersects$1: function (value, result) {
                result.v = value.v.Left < this.Right && this.Left < value.v.Right && value.v.Top < this.Bottom && this.Top < value.v.Bottom;
            },
            /**
             * Changes the {@link } of this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Rectangle
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @param   {number}    offsetX    The x coordinate to add to this {@link }.
             * @param   {number}    offsetY    The y coordinate to add to this {@link }.
             * @return  {void}
             */
            Offset$2: function (offsetX, offsetY) {
                this.X = (this.X + offsetX) | 0;
                this.Y = (this.Y + offsetY) | 0;
            },
            /**
             * Changes the {@link } of this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Rectangle
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @param   {number}    offsetX    The x coordinate to add to this {@link }.
             * @param   {number}    offsetY    The y coordinate to add to this {@link }.
             * @return  {void}
             */
            Offset$3: function (offsetX, offsetY) {
                this.X = (this.X + Bridge.Int.clip32(offsetX)) | 0;
                this.Y = (this.Y + Bridge.Int.clip32(offsetY)) | 0;
            },
            /**
             * Changes the {@link } of this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Rectangle
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @param   {Microsoft.Xna.Framework.Point}    amount    The x and y components to add to this {@link }.
             * @return  {void}
             */
            Offset: function (amount) {
                this.X = (this.X + amount.X) | 0;
                this.Y = (this.Y + amount.Y) | 0;
            },
            /**
             * Changes the {@link } of this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Rectangle
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @param   {Microsoft.Xna.Framework.Vector2}    amount    The x and y components to add to this {@link }.
             * @return  {void}
             */
            Offset$1: function (amount) {
                this.X = (this.X + Bridge.Int.clip32(amount.X)) | 0;
                this.Y = (this.Y + Bridge.Int.clip32(amount.Y)) | 0;
            },
            /**
             * Returns a {@link } representation of this {@link } in the format:
             {X:[{@link }] Y:[{@link }] Width:[{@link }] Height:[{@link }]}
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.Rectangle
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @return  {string}        {@link } representation of this {@link }.
             */
            toString: function () {
                return "{X:" + this.X + " Y:" + this.Y + " Width:" + this.Width + " Height:" + this.Height + "}";
            },
            /**
             * Deconstruction method for {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Rectangle
             * @memberof Microsoft.Xna.Framework.Rectangle
             * @param   {System.Int32}    x         
             * @param   {System.Int32}    y         
             * @param   {System.Int32}    width     
             * @param   {System.Int32}    height
             * @return  {void}
             */
            Deconstruct: function (x, y, width, height) {
                x.v = this.X;
                y.v = this.Y;
                width.v = this.Width;
                height.v = this.Height;
            },
            $clone: function (to) {
                var s = to || new Microsoft.Xna.Framework.Rectangle();
                s.X = this.X;
                s.Y = this.Y;
                s.Width = this.Width;
                s.Height = this.Height;
                return s;
            }
        }
    });

    /**
     * Describes a 2D-vector.
     *
     * @public
     * @class Microsoft.Xna.Framework.Vector2
     * @implements  System.IEquatable$1
     */
    Bridge.define("Microsoft.Xna.Framework.Vector2", {
        inherits: function () { return [System.IEquatable$1(Microsoft.Xna.Framework.Vector2)]; },
        $kind: "struct",
        statics: {
            fields: {
                zeroVector: null,
                unitVector: null,
                unitXVector: null,
                unitYVector: null
            },
            props: {
                /**
                 * Returns a {@link } with components 0, 0.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @function Zero
                 * @type Microsoft.Xna.Framework.Vector2
                 */
                Zero: {
                    get: function () {
                        return Microsoft.Xna.Framework.Vector2.zeroVector.$clone();
                    }
                },
                /**
                 * Returns a {@link } with components 1, 1.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @function One
                 * @type Microsoft.Xna.Framework.Vector2
                 */
                One: {
                    get: function () {
                        return Microsoft.Xna.Framework.Vector2.unitVector.$clone();
                    }
                },
                /**
                 * Returns a {@link } with components 1, 0.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @function UnitX
                 * @type Microsoft.Xna.Framework.Vector2
                 */
                UnitX: {
                    get: function () {
                        return Microsoft.Xna.Framework.Vector2.unitXVector.$clone();
                    }
                },
                /**
                 * Returns a {@link } with components 0, 1.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @function UnitY
                 * @type Microsoft.Xna.Framework.Vector2
                 */
                UnitY: {
                    get: function () {
                        return Microsoft.Xna.Framework.Vector2.unitYVector.$clone();
                    }
                }
            },
            ctors: {
                init: function () {
                    this.zeroVector = new Microsoft.Xna.Framework.Vector2();
                    this.unitVector = new Microsoft.Xna.Framework.Vector2();
                    this.unitXVector = new Microsoft.Xna.Framework.Vector2();
                    this.unitYVector = new Microsoft.Xna.Framework.Vector2();
                    this.zeroVector = new Microsoft.Xna.Framework.Vector2.$ctor2(0.0, 0.0);
                    this.unitVector = new Microsoft.Xna.Framework.Vector2.$ctor2(1.0, 1.0);
                    this.unitXVector = new Microsoft.Xna.Framework.Vector2.$ctor2(1.0, 0.0);
                    this.unitYVector = new Microsoft.Xna.Framework.Vector2.$ctor2(0.0, 1.0);
                }
            },
            methods: {
                /**
                 * Performs vector addition on <b /> and <b />.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    The first vector to add.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    The second vector to add.
                 * @return  {Microsoft.Xna.Framework.Vector2}              The result of the vector addition.
                 */
                Add: function (value1, value2) {
                    value1.X += value2.X;
                    value1.Y += value2.Y;
                    return value1.$clone();
                },
                /**
                 * Performs vector addition on <b /> and
                 <b />, storing the result of the
                 addition in <b />.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    The first vector to add.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    The second vector to add.
                 * @param   {Microsoft.Xna.Framework.Vector2}    result    The result of the vector addition.
                 * @return  {void}
                 */
                Add$1: function (value1, value2, result) {
                    result.v.X = value1.v.X + value2.v.X;
                    result.v.Y = value1.v.Y + value2.v.Y;
                },
                /**
                 * Creates a new {@link } that contains the cartesian coordinates of a vector specified in barycentric coordinates and relative to 2d-triangle.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1     The first vector of 2d-triangle.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2     The second vector of 2d-triangle.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value3     The third vector of 2d-triangle.
                 * @param   {number}                             amount1    Barycentric scalar <pre><code>b2</code></pre> which represents a weighting factor towards second vector of 2d-triangle.
                 * @param   {number}                             amount2    Barycentric scalar <pre><code>b3</code></pre> which represents a weighting factor towards third vector of 2d-triangle.
                 * @return  {Microsoft.Xna.Framework.Vector2}               The cartesian translation of barycentric coordinates.
                 */
                Barycentric: function (value1, value2, value3, amount1, amount2) {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(Microsoft.Xna.Framework.MathHelper.Barycentric(value1.X, value2.X, value3.X, amount1, amount2), Microsoft.Xna.Framework.MathHelper.Barycentric(value1.Y, value2.Y, value3.Y, amount1, amount2));
                },
                /**
                 * Creates a new {@link } that contains the cartesian coordinates of a vector specified in barycentric coordinates and relative to 2d-triangle.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1     The first vector of 2d-triangle.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2     The second vector of 2d-triangle.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value3     The third vector of 2d-triangle.
                 * @param   {number}                             amount1    Barycentric scalar <pre><code>b2</code></pre> which represents a weighting factor towards second vector of 2d-triangle.
                 * @param   {number}                             amount2    Barycentric scalar <pre><code>b3</code></pre> which represents a weighting factor towards third vector of 2d-triangle.
                 * @param   {Microsoft.Xna.Framework.Vector2}    result     The cartesian translation of barycentric coordinates as an output parameter.
                 * @return  {void}
                 */
                Barycentric$1: function (value1, value2, value3, amount1, amount2, result) {
                    result.v.X = Microsoft.Xna.Framework.MathHelper.Barycentric(value1.v.X, value2.v.X, value3.v.X, amount1, amount2);
                    result.v.Y = Microsoft.Xna.Framework.MathHelper.Barycentric(value1.v.Y, value2.v.Y, value3.v.Y, amount1, amount2);
                },
                /**
                 * Creates a new {@link } that contains CatmullRom interpolation of the specified vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    The first vector in interpolation.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    The second vector in interpolation.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value3    The third vector in interpolation.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value4    The fourth vector in interpolation.
                 * @param   {number}                             amount    Weighting factor.
                 * @return  {Microsoft.Xna.Framework.Vector2}              The result of CatmullRom interpolation.
                 */
                CatmullRom: function (value1, value2, value3, value4, amount) {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(Microsoft.Xna.Framework.MathHelper.CatmullRom(value1.X, value2.X, value3.X, value4.X, amount), Microsoft.Xna.Framework.MathHelper.CatmullRom(value1.Y, value2.Y, value3.Y, value4.Y, amount));
                },
                /**
                 * Creates a new {@link } that contains CatmullRom interpolation of the specified vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    The first vector in interpolation.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    The second vector in interpolation.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value3    The third vector in interpolation.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value4    The fourth vector in interpolation.
                 * @param   {number}                             amount    Weighting factor.
                 * @param   {Microsoft.Xna.Framework.Vector2}    result    The result of CatmullRom interpolation as an output parameter.
                 * @return  {void}
                 */
                CatmullRom$1: function (value1, value2, value3, value4, amount, result) {
                    result.v.X = Microsoft.Xna.Framework.MathHelper.CatmullRom(value1.v.X, value2.v.X, value3.v.X, value4.v.X, amount);
                    result.v.Y = Microsoft.Xna.Framework.MathHelper.CatmullRom(value1.v.Y, value2.v.Y, value3.v.Y, value4.v.Y, amount);
                },
                /**
                 * Clamps the specified value within a range.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    The value to clamp.
                 * @param   {Microsoft.Xna.Framework.Vector2}    min       The min value.
                 * @param   {Microsoft.Xna.Framework.Vector2}    max       The max value.
                 * @return  {Microsoft.Xna.Framework.Vector2}              The clamped value.
                 */
                Clamp: function (value1, min, max) {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(Microsoft.Xna.Framework.MathHelper.Clamp$1(value1.X, min.X, max.X), Microsoft.Xna.Framework.MathHelper.Clamp$1(value1.Y, min.Y, max.Y));
                },
                /**
                 * Clamps the specified value within a range.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    The value to clamp.
                 * @param   {Microsoft.Xna.Framework.Vector2}    min       The min value.
                 * @param   {Microsoft.Xna.Framework.Vector2}    max       The max value.
                 * @param   {Microsoft.Xna.Framework.Vector2}    result    The clamped value as an output parameter.
                 * @return  {void}
                 */
                Clamp$1: function (value1, min, max, result) {
                    result.v.X = Microsoft.Xna.Framework.MathHelper.Clamp$1(value1.v.X, min.v.X, max.v.X);
                    result.v.Y = Microsoft.Xna.Framework.MathHelper.Clamp$1(value1.v.Y, min.v.Y, max.v.Y);
                },
                /**
                 * Returns the distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    The second vector.
                 * @return  {number}                                       The distance between two vectors.
                 */
                Distance: function (value1, value2) {
                    var v1 = value1.X - value2.X, v2 = value1.Y - value2.Y;
                    return Math.sqrt((v1 * v1) + (v2 * v2));
                },
                /**
                 * Returns the distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    The second vector.
                 * @param   {System.Single}                      result    The distance between two vectors as an output parameter.
                 * @return  {void}
                 */
                Distance$1: function (value1, value2, result) {
                    var v1 = value1.v.X - value2.v.X, v2 = value1.v.Y - value2.v.Y;
                    result.v = Math.sqrt((v1 * v1) + (v2 * v2));
                },
                /**
                 * Returns the squared distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    The second vector.
                 * @return  {number}                                       The squared distance between two vectors.
                 */
                DistanceSquared: function (value1, value2) {
                    var v1 = value1.X - value2.X, v2 = value1.Y - value2.Y;
                    return (v1 * v1) + (v2 * v2);
                },
                /**
                 * Returns the squared distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    The second vector.
                 * @param   {System.Single}                      result    The squared distance between two vectors as an output parameter.
                 * @return  {void}
                 */
                DistanceSquared$1: function (value1, value2, result) {
                    var v1 = value1.v.X - value2.v.X, v2 = value1.v.Y - value2.v.Y;
                    result.v = (v1 * v1) + (v2 * v2);
                },
                /**
                 * Divides the components of a {@link } by the components of another {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    Divisor {@link }.
                 * @return  {Microsoft.Xna.Framework.Vector2}              The result of dividing the vectors.
                 */
                Divide: function (value1, value2) {
                    value1.X /= value2.X;
                    value1.Y /= value2.Y;
                    return value1.$clone();
                },
                /**
                 * Divides the components of a {@link } by the components of another {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    Divisor {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector2}    result    The result of dividing the vectors as an output parameter.
                 * @return  {void}
                 */
                Divide$2: function (value1, value2, result) {
                    result.v.X = value1.v.X / value2.v.X;
                    result.v.Y = value1.v.Y / value2.v.Y;
                },
                /**
                 * Divides the components of a {@link } by a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1     Source {@link }.
                 * @param   {number}                             divider    Divisor scalar.
                 * @return  {Microsoft.Xna.Framework.Vector2}               The result of dividing a vector by a scalar.
                 */
                Divide$1: function (value1, divider) {
                    var factor = 1 / divider;
                    value1.X *= factor;
                    value1.Y *= factor;
                    return value1.$clone();
                },
                /**
                 * Divides the components of a {@link } by a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1     Source {@link }.
                 * @param   {number}                             divider    Divisor scalar.
                 * @param   {Microsoft.Xna.Framework.Vector2}    result     The result of dividing a vector by a scalar as an output parameter.
                 * @return  {void}
                 */
                Divide$3: function (value1, divider, result) {
                    var factor = 1 / divider;
                    result.v.X = value1.v.X * factor;
                    result.v.Y = value1.v.Y * factor;
                },
                /**
                 * Returns a dot product of two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    The second vector.
                 * @return  {number}                                       The dot product of two vectors.
                 */
                Dot: function (value1, value2) {
                    return (value1.X * value2.X) + (value1.Y * value2.Y);
                },
                /**
                 * Returns a dot product of two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    The second vector.
                 * @param   {System.Single}                      result    The dot product of two vectors as an output parameter.
                 * @return  {void}
                 */
                Dot$1: function (value1, value2, result) {
                    result.v = (value1.v.X * value2.v.X) + (value1.v.Y * value2.v.Y);
                },
                /**
                 * Creates a new {@link } that contains hermite spline interpolation.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1      The first position vector.
                 * @param   {Microsoft.Xna.Framework.Vector2}    tangent1    The first tangent vector.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2      The second position vector.
                 * @param   {Microsoft.Xna.Framework.Vector2}    tangent2    The second tangent vector.
                 * @param   {number}                             amount      Weighting factor.
                 * @return  {Microsoft.Xna.Framework.Vector2}                The hermite spline interpolation vector.
                 */
                Hermite: function (value1, tangent1, value2, tangent2, amount) {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(Microsoft.Xna.Framework.MathHelper.Hermite(value1.X, tangent1.X, value2.X, tangent2.X, amount), Microsoft.Xna.Framework.MathHelper.Hermite(value1.Y, tangent1.Y, value2.Y, tangent2.Y, amount));
                },
                /**
                 * Creates a new {@link } that contains hermite spline interpolation.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1      The first position vector.
                 * @param   {Microsoft.Xna.Framework.Vector2}    tangent1    The first tangent vector.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2      The second position vector.
                 * @param   {Microsoft.Xna.Framework.Vector2}    tangent2    The second tangent vector.
                 * @param   {number}                             amount      Weighting factor.
                 * @param   {Microsoft.Xna.Framework.Vector2}    result      The hermite spline interpolation vector as an output parameter.
                 * @return  {void}
                 */
                Hermite$1: function (value1, tangent1, value2, tangent2, amount, result) {
                    result.v.X = Microsoft.Xna.Framework.MathHelper.Hermite(value1.v.X, tangent1.v.X, value2.v.X, tangent2.v.X, amount);
                    result.v.Y = Microsoft.Xna.Framework.MathHelper.Hermite(value1.v.Y, tangent1.v.Y, value2.v.Y, tangent2.v.Y, amount);
                },
                /**
                 * Creates a new {@link } that contains linear interpolation of the specified vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    The second vector.
                 * @param   {number}                             amount    Weighting value(between 0.0 and 1.0).
                 * @return  {Microsoft.Xna.Framework.Vector2}              The result of linear interpolation of the specified vectors.
                 */
                Lerp: function (value1, value2, amount) {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(Microsoft.Xna.Framework.MathHelper.Lerp(value1.X, value2.X, amount), Microsoft.Xna.Framework.MathHelper.Lerp(value1.Y, value2.Y, amount));
                },
                /**
                 * Creates a new {@link } that contains linear interpolation of the specified vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    The second vector.
                 * @param   {number}                             amount    Weighting value(between 0.0 and 1.0).
                 * @param   {Microsoft.Xna.Framework.Vector2}    result    The result of linear interpolation of the specified vectors as an output parameter.
                 * @return  {void}
                 */
                Lerp$1: function (value1, value2, amount, result) {
                    result.v.X = Microsoft.Xna.Framework.MathHelper.Lerp(value1.v.X, value2.v.X, amount);
                    result.v.Y = Microsoft.Xna.Framework.MathHelper.Lerp(value1.v.Y, value2.v.Y, amount);
                },
                /**
                 * Creates a new {@link } that contains linear interpolation of the specified vectors.
                 Uses {@link } on MathHelper for the interpolation.
                 Less efficient but more precise compared to {@link }.
                 See remarks section of {@link } on MathHelper for more info.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    The second vector.
                 * @param   {number}                             amount    Weighting value(between 0.0 and 1.0).
                 * @return  {Microsoft.Xna.Framework.Vector2}              The result of linear interpolation of the specified vectors.
                 */
                LerpPrecise: function (value1, value2, amount) {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(Microsoft.Xna.Framework.MathHelper.LerpPrecise(value1.X, value2.X, amount), Microsoft.Xna.Framework.MathHelper.LerpPrecise(value1.Y, value2.Y, amount));
                },
                /**
                 * Creates a new {@link } that contains linear interpolation of the specified vectors.
                 Uses {@link } on MathHelper for the interpolation.
                 Less efficient but more precise compared to {@link }.
                 See remarks section of {@link } on MathHelper for more info.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    The second vector.
                 * @param   {number}                             amount    Weighting value(between 0.0 and 1.0).
                 * @param   {Microsoft.Xna.Framework.Vector2}    result    The result of linear interpolation of the specified vectors as an output parameter.
                 * @return  {void}
                 */
                LerpPrecise$1: function (value1, value2, amount, result) {
                    result.v.X = Microsoft.Xna.Framework.MathHelper.LerpPrecise(value1.v.X, value2.v.X, amount);
                    result.v.Y = Microsoft.Xna.Framework.MathHelper.LerpPrecise(value1.v.Y, value2.v.Y, amount);
                },
                /**
                 * Creates a new {@link } that contains a maximal values from the two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    The second vector.
                 * @return  {Microsoft.Xna.Framework.Vector2}              The {@link } with maximal values from the two vectors.
                 */
                Max: function (value1, value2) {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(value1.X > value2.X ? value1.X : value2.X, value1.Y > value2.Y ? value1.Y : value2.Y);
                },
                /**
                 * Creates a new {@link } that contains a maximal values from the two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    The second vector.
                 * @param   {Microsoft.Xna.Framework.Vector2}    result    The {@link } with maximal values from the two vectors as an output parameter.
                 * @return  {void}
                 */
                Max$1: function (value1, value2, result) {
                    result.v.X = value1.v.X > value2.v.X ? value1.v.X : value2.v.X;
                    result.v.Y = value1.v.Y > value2.v.Y ? value1.v.Y : value2.v.Y;
                },
                /**
                 * Creates a new {@link } that contains a minimal values from the two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    The second vector.
                 * @return  {Microsoft.Xna.Framework.Vector2}              The {@link } with minimal values from the two vectors.
                 */
                Min: function (value1, value2) {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(value1.X < value2.X ? value1.X : value2.X, value1.Y < value2.Y ? value1.Y : value2.Y);
                },
                /**
                 * Creates a new {@link } that contains a minimal values from the two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    The second vector.
                 * @param   {Microsoft.Xna.Framework.Vector2}    result    The {@link } with minimal values from the two vectors as an output parameter.
                 * @return  {void}
                 */
                Min$1: function (value1, value2, result) {
                    result.v.X = value1.v.X < value2.v.X ? value1.v.X : value2.v.X;
                    result.v.Y = value1.v.Y < value2.v.Y ? value1.v.Y : value2.v.Y;
                },
                /**
                 * Creates a new {@link } that contains a multiplication of two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    Source {@link }.
                 * @return  {Microsoft.Xna.Framework.Vector2}              The result of the vector multiplication.
                 */
                Multiply: function (value1, value2) {
                    value1.X *= value2.X;
                    value1.Y *= value2.Y;
                    return value1.$clone();
                },
                /**
                 * Creates a new {@link } that contains a multiplication of two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector2}    result    The result of the vector multiplication as an output parameter.
                 * @return  {void}
                 */
                Multiply$2: function (value1, value2, result) {
                    result.v.X = value1.v.X * value2.v.X;
                    result.v.Y = value1.v.Y * value2.v.Y;
                },
                /**
                 * Creates a new {@link } that contains a multiplication of {@link } and a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1         Source {@link }.
                 * @param   {number}                             scaleFactor    Scalar value.
                 * @return  {Microsoft.Xna.Framework.Vector2}                   The result of the vector multiplication with a scalar.
                 */
                Multiply$1: function (value1, scaleFactor) {
                    value1.X *= scaleFactor;
                    value1.Y *= scaleFactor;
                    return value1.$clone();
                },
                /**
                 * Creates a new {@link } that contains a multiplication of {@link } and a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1         Source {@link }.
                 * @param   {number}                             scaleFactor    Scalar value.
                 * @param   {Microsoft.Xna.Framework.Vector2}    result         The result of the multiplication with a scalar as an output parameter.
                 * @return  {void}
                 */
                Multiply$3: function (value1, scaleFactor, result) {
                    result.v.X = value1.v.X * scaleFactor;
                    result.v.Y = value1.v.Y * scaleFactor;
                },
                /**
                 * Creates a new {@link } that contains the specified vector inversion.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value    Source {@link }.
                 * @return  {Microsoft.Xna.Framework.Vector2}             The result of the vector inversion.
                 */
                Negate: function (value) {
                    value.X = -value.X;
                    value.Y = -value.Y;
                    return value.$clone();
                },
                /**
                 * Creates a new {@link } that contains the specified vector inversion.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value     Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector2}    result    The result of the vector inversion as an output parameter.
                 * @return  {void}
                 */
                Negate$1: function (value, result) {
                    result.v.X = -value.v.X;
                    result.v.Y = -value.v.Y;
                },
                /**
                 * Creates a new {@link } that contains a normalized values from another vector.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value    Source {@link }.
                 * @return  {Microsoft.Xna.Framework.Vector2}             Unit vector.
                 */
                Normalize: function (value) {
                    var val = 1.0 / Math.sqrt((value.X * value.X) + (value.Y * value.Y));
                    value.X *= val;
                    value.Y *= val;
                    return value.$clone();
                },
                /**
                 * Creates a new {@link } that contains a normalized values from another vector.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value     Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector2}    result    Unit vector as an output parameter.
                 * @return  {void}
                 */
                Normalize$1: function (value, result) {
                    var val = 1.0 / Math.sqrt((value.v.X * value.v.X) + (value.v.Y * value.v.Y));
                    result.v.X = value.v.X * val;
                    result.v.Y = value.v.Y * val;
                },
                /**
                 * Creates a new {@link } that contains reflect vector of the given vector and normal.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    vector    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector2}    normal    Reflection normal.
                 * @return  {Microsoft.Xna.Framework.Vector2}              Reflected vector.
                 */
                Reflect: function (vector, normal) {
                    var result = new Microsoft.Xna.Framework.Vector2();
                    var val = 2.0 * ((vector.X * normal.X) + (vector.Y * normal.Y));
                    result.X = vector.X - (normal.X * val);
                    result.Y = vector.Y - (normal.Y * val);
                    return result.$clone();
                },
                /**
                 * Creates a new {@link } that contains reflect vector of the given vector and normal.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    vector    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector2}    normal    Reflection normal.
                 * @param   {Microsoft.Xna.Framework.Vector2}    result    Reflected vector as an output parameter.
                 * @return  {void}
                 */
                Reflect$1: function (vector, normal, result) {
                    var val = 2.0 * ((vector.v.X * normal.v.X) + (vector.v.Y * normal.v.Y));
                    result.v.X = vector.v.X - (normal.v.X * val);
                    result.v.Y = vector.v.Y - (normal.v.Y * val);
                },
                /**
                 * Creates a new {@link } that contains cubic interpolation of the specified vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    Source {@link }.
                 * @param   {number}                             amount    Weighting value.
                 * @return  {Microsoft.Xna.Framework.Vector2}              Cubic interpolation of the specified vectors.
                 */
                SmoothStep: function (value1, value2, amount) {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(Microsoft.Xna.Framework.MathHelper.SmoothStep(value1.X, value2.X, amount), Microsoft.Xna.Framework.MathHelper.SmoothStep(value1.Y, value2.Y, amount));
                },
                /**
                 * Creates a new {@link } that contains cubic interpolation of the specified vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    Source {@link }.
                 * @param   {number}                             amount    Weighting value.
                 * @param   {Microsoft.Xna.Framework.Vector2}    result    Cubic interpolation of the specified vectors as an output parameter.
                 * @return  {void}
                 */
                SmoothStep$1: function (value1, value2, amount, result) {
                    result.v.X = Microsoft.Xna.Framework.MathHelper.SmoothStep(value1.v.X, value2.v.X, amount);
                    result.v.Y = Microsoft.Xna.Framework.MathHelper.SmoothStep(value1.v.Y, value2.v.Y, amount);
                },
                /**
                 * Creates a new {@link } that contains subtraction of on {@link } from a another.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    Source {@link }.
                 * @return  {Microsoft.Xna.Framework.Vector2}              The result of the vector subtraction.
                 */
                Subtract: function (value1, value2) {
                    value1.X -= value2.X;
                    value1.Y -= value2.Y;
                    return value1.$clone();
                },
                /**
                 * Creates a new {@link } that contains subtraction of on {@link } from a another.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector2}    result    The result of the vector subtraction as an output parameter.
                 * @return  {void}
                 */
                Subtract$1: function (value1, value2, result) {
                    result.v.X = value1.v.X - value2.v.X;
                    result.v.Y = value1.v.Y - value2.v.Y;
                },
                /**
                 * Creates a new {@link } that contains a transformation of 2d-vector by the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    position    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Matrix}     matrix      The transformation {@link }.
                 * @return  {Microsoft.Xna.Framework.Vector2}                Transformed {@link }.
                 */
                Transform: function (position, matrix) {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2((position.X * matrix.M11) + (position.Y * matrix.M21) + matrix.M41, (position.X * matrix.M12) + (position.Y * matrix.M22) + matrix.M42);
                },
                /**
                 * Creates a new {@link } that contains a transformation of 2d-vector by the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    position    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Matrix}     matrix      The transformation {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector2}    result      Transformed {@link } as an output parameter.
                 * @return  {void}
                 */
                Transform$2: function (position, matrix, result) {
                    var x = (position.v.X * matrix.v.M11) + (position.v.Y * matrix.v.M21) + matrix.v.M41;
                    var y = (position.v.X * matrix.v.M12) + (position.v.Y * matrix.v.M22) + matrix.v.M42;
                    result.v.X = x;
                    result.v.Y = y;
                },
                /**
                 * Creates a new {@link } that contains a transformation of 2d-vector by the specified {@link }, representing the rotation.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}       value       Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    rotation    The {@link } which contains rotation transformation.
                 * @return  {Microsoft.Xna.Framework.Vector2}                   Transformed {@link }.
                 */
                Transform$1: function (value, rotation) {
                    value = {v:value};
                    rotation = {v:rotation};
                    Microsoft.Xna.Framework.Vector2.Transform$3(value, rotation, value);
                    return value.v.$clone();
                },
                /**
                 * Creates a new {@link } that contains a transformation of 2d-vector by the specified {@link }, representing the rotation.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}       value       Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    rotation    The {@link } which contains rotation transformation.
                 * @param   {Microsoft.Xna.Framework.Vector2}       result      Transformed {@link } as an output parameter.
                 * @return  {void}
                 */
                Transform$3: function (value, rotation, result) {
                    var rot1 = new Microsoft.Xna.Framework.Vector3.$ctor3(rotation.v.X + rotation.v.X, rotation.v.Y + rotation.v.Y, rotation.v.Z + rotation.v.Z);
                    var rot2 = new Microsoft.Xna.Framework.Vector3.$ctor3(rotation.v.X, rotation.v.X, rotation.v.W);
                    var rot3 = new Microsoft.Xna.Framework.Vector3.$ctor3(1, rotation.v.Y, rotation.v.Z);
                    var rot4 = Microsoft.Xna.Framework.Vector3.op_Multiply(rot1.$clone(), rot2.$clone());
                    var rot5 = Microsoft.Xna.Framework.Vector3.op_Multiply(rot1.$clone(), rot3.$clone());

                    var v = new Microsoft.Xna.Framework.Vector2.ctor();
                    v.X = value.v.X * (1.0 - rot5.Y - rot5.Z) + value.v.Y * (rot4.Y - rot4.Z);
                    v.Y = value.v.X * (rot4.Y + rot4.Z) + value.v.Y * (1.0 - rot4.X - rot5.Z);
                    result.v.X = v.X;
                    result.v.Y = v.Y;
                },
                /**
                 * Apply transformation on vectors within array of {@link } by the specified {@link } and places the results in an another array.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Array.<Microsoft.Xna.Framework.Vector2>}    sourceArray         Source array.
                 * @param   {number}                                     sourceIndex         The starting index of transformation in the source array.
                 * @param   {Microsoft.Xna.Framework.Matrix}             matrix              The transformation {@link }.
                 * @param   {Array.<Microsoft.Xna.Framework.Vector2>}    destinationArray    Destination array.
                 * @param   {number}                                     destinationIndex    The starting index in the destination array, where the first {@link } should be written.
                 * @param   {number}                                     length              The number of vectors to be transformed.
                 * @return  {void}
                 */
                Transform$6: function (sourceArray, sourceIndex, matrix, destinationArray, destinationIndex, length) {
                    if (sourceArray == null) {
                        throw new System.ArgumentNullException.$ctor1("sourceArray");
                    }
                    if (destinationArray == null) {
                        throw new System.ArgumentNullException.$ctor1("destinationArray");
                    }
                    if (sourceArray.length < ((sourceIndex + length) | 0)) {
                        throw new System.ArgumentException.$ctor1("Source array length is lesser than sourceIndex + length");
                    }
                    if (destinationArray.length < ((destinationIndex + length) | 0)) {
                        throw new System.ArgumentException.$ctor1("Destination array length is lesser than destinationIndex + length");
                    }

                    for (var x = 0; x < length; x = (x + 1) | 0) {
                        var position = sourceArray[System.Array.index(((sourceIndex + x) | 0), sourceArray)].$clone();
                        var destination = destinationArray[System.Array.index(((destinationIndex + x) | 0), destinationArray)].$clone();
                        destination.X = (position.X * matrix.v.M11) + (position.Y * matrix.v.M21) + matrix.v.M41;
                        destination.Y = (position.X * matrix.v.M12) + (position.Y * matrix.v.M22) + matrix.v.M42;
                        destinationArray[System.Array.index(((destinationIndex + x) | 0), destinationArray)] = destination.$clone();
                    }
                },
                /**
                 * Apply transformation on vectors within array of {@link } by the specified {@link } and places the results in an another array.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Array.<Microsoft.Xna.Framework.Vector2>}    sourceArray         Source array.
                 * @param   {number}                                     sourceIndex         The starting index of transformation in the source array.
                 * @param   {Microsoft.Xna.Framework.Quaternion}         rotation            The {@link } which contains rotation transformation.
                 * @param   {Array.<Microsoft.Xna.Framework.Vector2>}    destinationArray    Destination array.
                 * @param   {number}                                     destinationIndex    The starting index in the destination array, where the first {@link } should be written.
                 * @param   {number}                                     length              The number of vectors to be transformed.
                 * @return  {void}
                 */
                Transform$7: function (sourceArray, sourceIndex, rotation, destinationArray, destinationIndex, length) {
                    if (sourceArray == null) {
                        throw new System.ArgumentNullException.$ctor1("sourceArray");
                    }
                    if (destinationArray == null) {
                        throw new System.ArgumentNullException.$ctor1("destinationArray");
                    }
                    if (sourceArray.length < ((sourceIndex + length) | 0)) {
                        throw new System.ArgumentException.$ctor1("Source array length is lesser than sourceIndex + length");
                    }
                    if (destinationArray.length < ((destinationIndex + length) | 0)) {
                        throw new System.ArgumentException.$ctor1("Destination array length is lesser than destinationIndex + length");
                    }

                    for (var x = 0; x < length; x = (x + 1) | 0) {
                        var position = { v : sourceArray[System.Array.index(((sourceIndex + x) | 0), sourceArray)].$clone() };
                        var destination = destinationArray[System.Array.index(((destinationIndex + x) | 0), destinationArray)].$clone();

                        var v = { v : new Microsoft.Xna.Framework.Vector2() };
                        Microsoft.Xna.Framework.Vector2.Transform$3(position, rotation, v);

                        destination.X = v.v.X;
                        destination.Y = v.v.Y;

                        destinationArray[System.Array.index(((destinationIndex + x) | 0), destinationArray)] = destination.$clone();
                    }
                },
                /**
                 * Apply transformation on all vectors within array of {@link } by the specified {@link } and places the results in an another array.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Array.<Microsoft.Xna.Framework.Vector2>}    sourceArray         Source array.
                 * @param   {Microsoft.Xna.Framework.Matrix}             matrix              The transformation {@link }.
                 * @param   {Array.<Microsoft.Xna.Framework.Vector2>}    destinationArray    Destination array.
                 * @return  {void}
                 */
                Transform$4: function (sourceArray, matrix, destinationArray) {
                    Microsoft.Xna.Framework.Vector2.Transform$6(sourceArray, 0, matrix, destinationArray, 0, sourceArray.length);
                },
                /**
                 * Apply transformation on all vectors within array of {@link } by the specified {@link } and places the results in an another array.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Array.<Microsoft.Xna.Framework.Vector2>}    sourceArray         Source array.
                 * @param   {Microsoft.Xna.Framework.Quaternion}         rotation            The {@link } which contains rotation transformation.
                 * @param   {Array.<Microsoft.Xna.Framework.Vector2>}    destinationArray    Destination array.
                 * @return  {void}
                 */
                Transform$5: function (sourceArray, rotation, destinationArray) {
                    Microsoft.Xna.Framework.Vector2.Transform$7(sourceArray, 0, rotation, destinationArray, 0, sourceArray.length);
                },
                /**
                 * Creates a new {@link } that contains a transformation of the specified normal by the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    normal    Source {@link } which represents a normal vector.
                 * @param   {Microsoft.Xna.Framework.Matrix}     matrix    The transformation {@link }.
                 * @return  {Microsoft.Xna.Framework.Vector2}              Transformed normal.
                 */
                TransformNormal: function (normal, matrix) {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2((normal.X * matrix.M11) + (normal.Y * matrix.M21), (normal.X * matrix.M12) + (normal.Y * matrix.M22));
                },
                /**
                 * Creates a new {@link } that contains a transformation of the specified normal by the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    normal    Source {@link } which represents a normal vector.
                 * @param   {Microsoft.Xna.Framework.Matrix}     matrix    The transformation {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector2}    result    Transformed normal as an output parameter.
                 * @return  {void}
                 */
                TransformNormal$1: function (normal, matrix, result) {
                    var x = (normal.v.X * matrix.v.M11) + (normal.v.Y * matrix.v.M21);
                    var y = (normal.v.X * matrix.v.M12) + (normal.v.Y * matrix.v.M22);
                    result.v.X = x;
                    result.v.Y = y;
                },
                /**
                 * Apply transformation on normals within array of {@link } by the specified {@link } and places the results in an another array.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Array.<Microsoft.Xna.Framework.Vector2>}    sourceArray         Source array.
                 * @param   {number}                                     sourceIndex         The starting index of transformation in the source array.
                 * @param   {Microsoft.Xna.Framework.Matrix}             matrix              The transformation {@link }.
                 * @param   {Array.<Microsoft.Xna.Framework.Vector2>}    destinationArray    Destination array.
                 * @param   {number}                                     destinationIndex    The starting index in the destination array, where the first {@link } should be written.
                 * @param   {number}                                     length              The number of normals to be transformed.
                 * @return  {void}
                 */
                TransformNormal$3: function (sourceArray, sourceIndex, matrix, destinationArray, destinationIndex, length) {
                    if (sourceArray == null) {
                        throw new System.ArgumentNullException.$ctor1("sourceArray");
                    }
                    if (destinationArray == null) {
                        throw new System.ArgumentNullException.$ctor1("destinationArray");
                    }
                    if (sourceArray.length < ((sourceIndex + length) | 0)) {
                        throw new System.ArgumentException.$ctor1("Source array length is lesser than sourceIndex + length");
                    }
                    if (destinationArray.length < ((destinationIndex + length) | 0)) {
                        throw new System.ArgumentException.$ctor1("Destination array length is lesser than destinationIndex + length");
                    }

                    for (var i = 0; i < length; i = (i + 1) | 0) {
                        var normal = sourceArray[System.Array.index(((sourceIndex + i) | 0), sourceArray)].$clone();

                        destinationArray[System.Array.index(((destinationIndex + i) | 0), destinationArray)] = new Microsoft.Xna.Framework.Vector2.$ctor2((normal.X * matrix.v.M11) + (normal.Y * matrix.v.M21), (normal.X * matrix.v.M12) + (normal.Y * matrix.v.M22));
                    }
                },
                /**
                 * Apply transformation on all normals within array of {@link } by the specified {@link } and places the results in an another array.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Array.<Microsoft.Xna.Framework.Vector2>}    sourceArray         Source array.
                 * @param   {Microsoft.Xna.Framework.Matrix}             matrix              The transformation {@link }.
                 * @param   {Array.<Microsoft.Xna.Framework.Vector2>}    destinationArray    Destination array.
                 * @return  {void}
                 */
                TransformNormal$2: function (sourceArray, matrix, destinationArray) {
                    if (sourceArray == null) {
                        throw new System.ArgumentNullException.$ctor1("sourceArray");
                    }
                    if (destinationArray == null) {
                        throw new System.ArgumentNullException.$ctor1("destinationArray");
                    }
                    if (destinationArray.length < sourceArray.length) {
                        throw new System.ArgumentException.$ctor1("Destination array length is lesser than source array length");
                    }

                    for (var i = 0; i < sourceArray.length; i = (i + 1) | 0) {
                        var normal = sourceArray[System.Array.index(i, sourceArray)].$clone();

                        destinationArray[System.Array.index(i, destinationArray)] = new Microsoft.Xna.Framework.Vector2.$ctor2((normal.X * matrix.v.M11) + (normal.Y * matrix.v.M21), (normal.X * matrix.v.M12) + (normal.Y * matrix.v.M22));
                    }
                }/**
                 * Inverts values in the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value    Source {@link } on the right of the sub sign.
                 * @return  {Microsoft.Xna.Framework.Vector2}             Result of the inversion.
                 */
                ,
                op_UnaryNegation: function (value) {
                    value.X = -value.X;
                    value.Y = -value.Y;
                    return value.$clone();
                }/**
                 * Adds two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    Source {@link } on the left of the add sign.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    Source {@link } on the right of the add sign.
                 * @return  {Microsoft.Xna.Framework.Vector2}              Sum of the vectors.
                 */
                ,
                op_Addition: function (value1, value2) {
                    value1.X += value2.X;
                    value1.Y += value2.Y;
                    return value1.$clone();
                }/**
                 * Subtracts a {@link } from a {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    Source {@link } on the left of the sub sign.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    Source {@link } on the right of the sub sign.
                 * @return  {Microsoft.Xna.Framework.Vector2}              Result of the vector subtraction.
                 */
                ,
                op_Subtraction: function (value1, value2) {
                    value1.X -= value2.X;
                    value1.Y -= value2.Y;
                    return value1.$clone();
                }/**
                 * Multiplies the components of two vectors by each other.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    Source {@link } on the left of the mul sign.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    Source {@link } on the right of the mul sign.
                 * @return  {Microsoft.Xna.Framework.Vector2}              Result of the vector multiplication.
                 */
                ,
                op_Multiply: function (value1, value2) {
                    value1.X *= value2.X;
                    value1.Y *= value2.Y;
                    return value1.$clone();
                }/**
                 * Multiplies the components of vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value          Source {@link } on the left of the mul sign.
                 * @param   {number}                             scaleFactor    Scalar value on the right of the mul sign.
                 * @return  {Microsoft.Xna.Framework.Vector2}                   Result of the vector multiplication with a scalar.
                 */
                ,
                op_Multiply$1: function (value, scaleFactor) {
                    value.X *= scaleFactor;
                    value.Y *= scaleFactor;
                    return value.$clone();
                }/**
                 * Multiplies the components of vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {number}                             scaleFactor    Scalar value on the left of the mul sign.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value          Source {@link } on the right of the mul sign.
                 * @return  {Microsoft.Xna.Framework.Vector2}                   Result of the vector multiplication with a scalar.
                 */
                ,
                op_Multiply$2: function (scaleFactor, value) {
                    value.X *= scaleFactor;
                    value.Y *= scaleFactor;
                    return value.$clone();
                }/**
                 * Divides the components of a {@link } by the components of another {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    Source {@link } on the left of the div sign.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    Divisor {@link } on the right of the div sign.
                 * @return  {Microsoft.Xna.Framework.Vector2}              The result of dividing the vectors.
                 */
                ,
                op_Division: function (value1, value2) {
                    value1.X /= value2.X;
                    value1.Y /= value2.Y;
                    return value1.$clone();
                }/**
                 * Divides the components of a {@link } by a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1     Source {@link } on the left of the div sign.
                 * @param   {number}                             divider    Divisor scalar on the right of the div sign.
                 * @return  {Microsoft.Xna.Framework.Vector2}               The result of dividing a vector by a scalar.
                 */
                ,
                op_Division$1: function (value1, divider) {
                    var factor = 1 / divider;
                    value1.X *= factor;
                    value1.Y *= factor;
                    return value1.$clone();
                }/**
                 * Compares whether two {@link } instances are equal.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    {@link } instance on the left of the equal sign.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    {@link } instance on the right of the equal sign.
                 * @return  {boolean}                                      <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
                 */
                ,
                op_Equality: function (value1, value2) {
                    return value1.X === value2.X && value1.Y === value2.Y;
                }/**
                 * Compares whether two {@link } instances are not equal.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector2
                 * @memberof Microsoft.Xna.Framework.Vector2
                 * @param   {Microsoft.Xna.Framework.Vector2}    value1    {@link } instance on the left of the not equal sign.
                 * @param   {Microsoft.Xna.Framework.Vector2}    value2    {@link } instance on the right of the not equal sign.
                 * @return  {boolean}                                      <pre><code>true</code></pre> if the instances are not equal; <pre><code>false</code></pre> otherwise.
                 */
                ,
                op_Inequality: function (value1, value2) {
                    return value1.X !== value2.X || value1.Y !== value2.Y;
                },
                getDefaultValue: function () { return new Microsoft.Xna.Framework.Vector2(); }
            }
        },
        fields: {
            /**
             * The x coordinate of this {@link }.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Vector2
             * @type number
             */
            X: 0,
            /**
             * The y coordinate of this {@link }.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Vector2
             * @type number
             */
            Y: 0
        },
        props: {
            DebugDisplayString: {
                get: function () {
                    return System.String.concat(System.Single.format(this.X), "  ", System.Single.format(this.Y));
                }
            }
        },
        alias: ["equalsT", "System$IEquatable$1$Microsoft$Xna$Framework$Vector2$equalsT"],
        ctors: {
            /**
             * Constructs a 2d vector with X and Y from two values.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Vector2
             * @memberof Microsoft.Xna.Framework.Vector2
             * @param   {number}    x    The x coordinate in 2d-space.
             * @param   {number}    y    The y coordinate in 2d-space.
             * @return  {void}
             */
            $ctor2: function (x, y) {
                this.$initialize();
                this.X = x;
                this.Y = y;
            },
            /**
             * Constructs a 2d vector with X and Y set to the same value.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Vector2
             * @memberof Microsoft.Xna.Framework.Vector2
             * @param   {number}    value    The x and y coordinates in 2d-space.
             * @return  {void}
             */
            $ctor1: function (value) {
                this.$initialize();
                this.X = value;
                this.Y = value;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Compares whether current instance is equal to specified {@link }.
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.Vector2
             * @memberof Microsoft.Xna.Framework.Vector2
             * @param   {System.Object}    obj    The {@link } to compare.
             * @return  {boolean}                 <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
             */
            equals: function (obj) {
                if (Bridge.is(obj, Microsoft.Xna.Framework.Vector2)) {
                    return this.equalsT(System.Nullable.getValue(Bridge.cast(Bridge.unbox(obj, Microsoft.Xna.Framework.Vector2), Microsoft.Xna.Framework.Vector2)));
                }

                return false;
            },
            /**
             * Compares whether current instance is equal to specified {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Vector2
             * @memberof Microsoft.Xna.Framework.Vector2
             * @param   {Microsoft.Xna.Framework.Vector2}    other    The {@link } to compare.
             * @return  {boolean}                                     <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
             */
            equalsT: function (other) {
                return (this.X === other.X) && (this.Y === other.Y);
            },
            /**
             * Gets the hash code of this {@link }.
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.Vector2
             * @memberof Microsoft.Xna.Framework.Vector2
             * @return  {number}        Hash code of this {@link }.
             */
            getHashCode: function () {
                return (Bridge.Int.mul(System.Single.getHashCode(this.X), 397)) ^ System.Single.getHashCode(this.Y);
            },
            /**
             * Returns the length of this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Vector2
             * @memberof Microsoft.Xna.Framework.Vector2
             * @return  {number}        The length of this {@link }.
             */
            Length: function () {
                return Math.sqrt((this.X * this.X) + (this.Y * this.Y));
            },
            /**
             * Returns the squared length of this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Vector2
             * @memberof Microsoft.Xna.Framework.Vector2
             * @return  {number}        The squared length of this {@link }.
             */
            LengthSquared: function () {
                return (this.X * this.X) + (this.Y * this.Y);
            },
            /**
             * Turns this {@link } to a unit vector with the same direction.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Vector2
             * @memberof Microsoft.Xna.Framework.Vector2
             * @return  {void}
             */
            Normalize: function () {
                var val = 1.0 / Math.sqrt((this.X * this.X) + (this.Y * this.Y));
                this.X *= val;
                this.Y *= val;
            },
            /**
             * Returns a {@link } representation of this {@link } in the format:
             {X:[{@link }] Y:[{@link }]}
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.Vector2
             * @memberof Microsoft.Xna.Framework.Vector2
             * @return  {string}        A {@link } representation of this {@link }.
             */
            toString: function () {
                return "{X:" + System.Single.format(this.X) + " Y:" + System.Single.format(this.Y) + "}";
            },
            /**
             * Gets a {@link } representation for this object.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Vector2
             * @memberof Microsoft.Xna.Framework.Vector2
             * @return  {Microsoft.Xna.Framework.Point}        A {@link } representation for this object.
             */
            ToPoint: function () {
                return new Microsoft.Xna.Framework.Point.$ctor2(Bridge.Int.clip32(this.X), Bridge.Int.clip32(this.Y));
            },
            /**
             * Deconstruction method for {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Vector2
             * @memberof Microsoft.Xna.Framework.Vector2
             * @param   {System.Single}    x    
             * @param   {System.Single}    y
             * @return  {void}
             */
            Deconstruct: function (x, y) {
                x.v = this.X;
                y.v = this.Y;
            },
            $clone: function (to) {
                var s = to || new Microsoft.Xna.Framework.Vector2();
                s.X = this.X;
                s.Y = this.Y;
                return s;
            }
        }
    });

    /**
     * Describes a 3D-vector.
     *
     * @public
     * @class Microsoft.Xna.Framework.Vector3
     * @implements  System.IEquatable$1
     */
    Bridge.define("Microsoft.Xna.Framework.Vector3", {
        inherits: function () { return [System.IEquatable$1(Microsoft.Xna.Framework.Vector3)]; },
        $kind: "struct",
        statics: {
            fields: {
                zero: null,
                one: null,
                unitX: null,
                unitY: null,
                unitZ: null,
                up: null,
                down: null,
                right: null,
                left: null,
                forward: null,
                backward: null
            },
            props: {
                /**
                 * Returns a {@link } with components 0, 0, 0.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @function Zero
                 * @type Microsoft.Xna.Framework.Vector3
                 */
                Zero: {
                    get: function () {
                        return Microsoft.Xna.Framework.Vector3.zero.$clone();
                    }
                },
                /**
                 * Returns a {@link } with components 1, 1, 1.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @function One
                 * @type Microsoft.Xna.Framework.Vector3
                 */
                One: {
                    get: function () {
                        return Microsoft.Xna.Framework.Vector3.one.$clone();
                    }
                },
                /**
                 * Returns a {@link } with components 1, 0, 0.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @function UnitX
                 * @type Microsoft.Xna.Framework.Vector3
                 */
                UnitX: {
                    get: function () {
                        return Microsoft.Xna.Framework.Vector3.unitX.$clone();
                    }
                },
                /**
                 * Returns a {@link } with components 0, 1, 0.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @function UnitY
                 * @type Microsoft.Xna.Framework.Vector3
                 */
                UnitY: {
                    get: function () {
                        return Microsoft.Xna.Framework.Vector3.unitY.$clone();
                    }
                },
                /**
                 * Returns a {@link } with components 0, 0, 1.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @function UnitZ
                 * @type Microsoft.Xna.Framework.Vector3
                 */
                UnitZ: {
                    get: function () {
                        return Microsoft.Xna.Framework.Vector3.unitZ.$clone();
                    }
                },
                /**
                 * Returns a {@link } with components 0, 1, 0.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @function Up
                 * @type Microsoft.Xna.Framework.Vector3
                 */
                Up: {
                    get: function () {
                        return Microsoft.Xna.Framework.Vector3.up.$clone();
                    }
                },
                /**
                 * Returns a {@link } with components 0, -1, 0.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @function Down
                 * @type Microsoft.Xna.Framework.Vector3
                 */
                Down: {
                    get: function () {
                        return Microsoft.Xna.Framework.Vector3.down.$clone();
                    }
                },
                /**
                 * Returns a {@link } with components 1, 0, 0.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @function Right
                 * @type Microsoft.Xna.Framework.Vector3
                 */
                Right: {
                    get: function () {
                        return Microsoft.Xna.Framework.Vector3.right.$clone();
                    }
                },
                /**
                 * Returns a {@link } with components -1, 0, 0.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @function Left
                 * @type Microsoft.Xna.Framework.Vector3
                 */
                Left: {
                    get: function () {
                        return Microsoft.Xna.Framework.Vector3.left.$clone();
                    }
                },
                /**
                 * Returns a {@link } with components 0, 0, -1.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @function Forward
                 * @type Microsoft.Xna.Framework.Vector3
                 */
                Forward: {
                    get: function () {
                        return Microsoft.Xna.Framework.Vector3.forward.$clone();
                    }
                },
                /**
                 * Returns a {@link } with components 0, 0, 1.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @function Backward
                 * @type Microsoft.Xna.Framework.Vector3
                 */
                Backward: {
                    get: function () {
                        return Microsoft.Xna.Framework.Vector3.backward.$clone();
                    }
                }
            },
            ctors: {
                init: function () {
                    this.zero = new Microsoft.Xna.Framework.Vector3();
                    this.one = new Microsoft.Xna.Framework.Vector3();
                    this.unitX = new Microsoft.Xna.Framework.Vector3();
                    this.unitY = new Microsoft.Xna.Framework.Vector3();
                    this.unitZ = new Microsoft.Xna.Framework.Vector3();
                    this.up = new Microsoft.Xna.Framework.Vector3();
                    this.down = new Microsoft.Xna.Framework.Vector3();
                    this.right = new Microsoft.Xna.Framework.Vector3();
                    this.left = new Microsoft.Xna.Framework.Vector3();
                    this.forward = new Microsoft.Xna.Framework.Vector3();
                    this.backward = new Microsoft.Xna.Framework.Vector3();
                    this.zero = new Microsoft.Xna.Framework.Vector3.$ctor3(0.0, 0.0, 0.0);
                    this.one = new Microsoft.Xna.Framework.Vector3.$ctor3(1.0, 1.0, 1.0);
                    this.unitX = new Microsoft.Xna.Framework.Vector3.$ctor3(1.0, 0.0, 0.0);
                    this.unitY = new Microsoft.Xna.Framework.Vector3.$ctor3(0.0, 1.0, 0.0);
                    this.unitZ = new Microsoft.Xna.Framework.Vector3.$ctor3(0.0, 0.0, 1.0);
                    this.up = new Microsoft.Xna.Framework.Vector3.$ctor3(0.0, 1.0, 0.0);
                    this.down = new Microsoft.Xna.Framework.Vector3.$ctor3(0.0, -1.0, 0.0);
                    this.right = new Microsoft.Xna.Framework.Vector3.$ctor3(1.0, 0.0, 0.0);
                    this.left = new Microsoft.Xna.Framework.Vector3.$ctor3(-1.0, 0.0, 0.0);
                    this.forward = new Microsoft.Xna.Framework.Vector3.$ctor3(0.0, 0.0, -1.0);
                    this.backward = new Microsoft.Xna.Framework.Vector3.$ctor3(0.0, 0.0, 1.0);
                }
            },
            methods: {
                /**
                 * Performs vector addition on <b /> and <b />.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    The first vector to add.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    The second vector to add.
                 * @return  {Microsoft.Xna.Framework.Vector3}              The result of the vector addition.
                 */
                Add: function (value1, value2) {
                    value1.X += value2.X;
                    value1.Y += value2.Y;
                    value1.Z += value2.Z;
                    return value1.$clone();
                },
                /**
                 * Performs vector addition on <b /> and
                 <b />, storing the result of the
                 addition in <b />.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    The first vector to add.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    The second vector to add.
                 * @param   {Microsoft.Xna.Framework.Vector3}    result    The result of the vector addition.
                 * @return  {void}
                 */
                Add$1: function (value1, value2, result) {
                    result.v.X = value1.v.X + value2.v.X;
                    result.v.Y = value1.v.Y + value2.v.Y;
                    result.v.Z = value1.v.Z + value2.v.Z;
                },
                /**
                 * Creates a new {@link } that contains the cartesian coordinates of a vector specified in barycentric coordinates and relative to 3d-triangle.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1     The first vector of 3d-triangle.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2     The second vector of 3d-triangle.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value3     The third vector of 3d-triangle.
                 * @param   {number}                             amount1    Barycentric scalar <pre><code>b2</code></pre> which represents a weighting factor towards second vector of 3d-triangle.
                 * @param   {number}                             amount2    Barycentric scalar <pre><code>b3</code></pre> which represents a weighting factor towards third vector of 3d-triangle.
                 * @return  {Microsoft.Xna.Framework.Vector3}               The cartesian translation of barycentric coordinates.
                 */
                Barycentric: function (value1, value2, value3, amount1, amount2) {
                    return new Microsoft.Xna.Framework.Vector3.$ctor3(Microsoft.Xna.Framework.MathHelper.Barycentric(value1.X, value2.X, value3.X, amount1, amount2), Microsoft.Xna.Framework.MathHelper.Barycentric(value1.Y, value2.Y, value3.Y, amount1, amount2), Microsoft.Xna.Framework.MathHelper.Barycentric(value1.Z, value2.Z, value3.Z, amount1, amount2));
                },
                /**
                 * Creates a new {@link } that contains the cartesian coordinates of a vector specified in barycentric coordinates and relative to 3d-triangle.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1     The first vector of 3d-triangle.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2     The second vector of 3d-triangle.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value3     The third vector of 3d-triangle.
                 * @param   {number}                             amount1    Barycentric scalar <pre><code>b2</code></pre> which represents a weighting factor towards second vector of 3d-triangle.
                 * @param   {number}                             amount2    Barycentric scalar <pre><code>b3</code></pre> which represents a weighting factor towards third vector of 3d-triangle.
                 * @param   {Microsoft.Xna.Framework.Vector3}    result     The cartesian translation of barycentric coordinates as an output parameter.
                 * @return  {void}
                 */
                Barycentric$1: function (value1, value2, value3, amount1, amount2, result) {
                    result.v.X = Microsoft.Xna.Framework.MathHelper.Barycentric(value1.v.X, value2.v.X, value3.v.X, amount1, amount2);
                    result.v.Y = Microsoft.Xna.Framework.MathHelper.Barycentric(value1.v.Y, value2.v.Y, value3.v.Y, amount1, amount2);
                    result.v.Z = Microsoft.Xna.Framework.MathHelper.Barycentric(value1.v.Z, value2.v.Z, value3.v.Z, amount1, amount2);
                },
                /**
                 * Creates a new {@link } that contains CatmullRom interpolation of the specified vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    The first vector in interpolation.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    The second vector in interpolation.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value3    The third vector in interpolation.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value4    The fourth vector in interpolation.
                 * @param   {number}                             amount    Weighting factor.
                 * @return  {Microsoft.Xna.Framework.Vector3}              The result of CatmullRom interpolation.
                 */
                CatmullRom: function (value1, value2, value3, value4, amount) {
                    return new Microsoft.Xna.Framework.Vector3.$ctor3(Microsoft.Xna.Framework.MathHelper.CatmullRom(value1.X, value2.X, value3.X, value4.X, amount), Microsoft.Xna.Framework.MathHelper.CatmullRom(value1.Y, value2.Y, value3.Y, value4.Y, amount), Microsoft.Xna.Framework.MathHelper.CatmullRom(value1.Z, value2.Z, value3.Z, value4.Z, amount));
                },
                /**
                 * Creates a new {@link } that contains CatmullRom interpolation of the specified vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    The first vector in interpolation.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    The second vector in interpolation.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value3    The third vector in interpolation.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value4    The fourth vector in interpolation.
                 * @param   {number}                             amount    Weighting factor.
                 * @param   {Microsoft.Xna.Framework.Vector3}    result    The result of CatmullRom interpolation as an output parameter.
                 * @return  {void}
                 */
                CatmullRom$1: function (value1, value2, value3, value4, amount, result) {
                    result.v.X = Microsoft.Xna.Framework.MathHelper.CatmullRom(value1.v.X, value2.v.X, value3.v.X, value4.v.X, amount);
                    result.v.Y = Microsoft.Xna.Framework.MathHelper.CatmullRom(value1.v.Y, value2.v.Y, value3.v.Y, value4.v.Y, amount);
                    result.v.Z = Microsoft.Xna.Framework.MathHelper.CatmullRom(value1.v.Z, value2.v.Z, value3.v.Z, value4.v.Z, amount);
                },
                /**
                 * Clamps the specified value within a range.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    The value to clamp.
                 * @param   {Microsoft.Xna.Framework.Vector3}    min       The min value.
                 * @param   {Microsoft.Xna.Framework.Vector3}    max       The max value.
                 * @return  {Microsoft.Xna.Framework.Vector3}              The clamped value.
                 */
                Clamp: function (value1, min, max) {
                    return new Microsoft.Xna.Framework.Vector3.$ctor3(Microsoft.Xna.Framework.MathHelper.Clamp$1(value1.X, min.X, max.X), Microsoft.Xna.Framework.MathHelper.Clamp$1(value1.Y, min.Y, max.Y), Microsoft.Xna.Framework.MathHelper.Clamp$1(value1.Z, min.Z, max.Z));
                },
                /**
                 * Clamps the specified value within a range.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    The value to clamp.
                 * @param   {Microsoft.Xna.Framework.Vector3}    min       The min value.
                 * @param   {Microsoft.Xna.Framework.Vector3}    max       The max value.
                 * @param   {Microsoft.Xna.Framework.Vector3}    result    The clamped value as an output parameter.
                 * @return  {void}
                 */
                Clamp$1: function (value1, min, max, result) {
                    result.v.X = Microsoft.Xna.Framework.MathHelper.Clamp$1(value1.v.X, min.v.X, max.v.X);
                    result.v.Y = Microsoft.Xna.Framework.MathHelper.Clamp$1(value1.v.Y, min.v.Y, max.v.Y);
                    result.v.Z = Microsoft.Xna.Framework.MathHelper.Clamp$1(value1.v.Z, min.v.Z, max.v.Z);
                },
                /**
                 * Computes the cross product of two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    vector1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    vector2    The second vector.
                 * @return  {Microsoft.Xna.Framework.Vector3}               The cross product of two vectors.
                 */
                Cross: function (vector1, vector2) {
                    vector1 = {v:vector1};
                    vector2 = {v:vector2};
                    Microsoft.Xna.Framework.Vector3.Cross$1(vector1, vector2, vector1);
                    return vector1.v.$clone();
                },
                /**
                 * Computes the cross product of two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    vector1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    vector2    The second vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    result     The cross product of two vectors as an output parameter.
                 * @return  {void}
                 */
                Cross$1: function (vector1, vector2, result) {
                    var x = vector1.v.Y * vector2.v.Z - vector2.v.Y * vector1.v.Z;
                    var y = -(vector1.v.X * vector2.v.Z - vector2.v.X * vector1.v.Z);
                    var z = vector1.v.X * vector2.v.Y - vector2.v.X * vector1.v.Y;
                    result.v.X = x;
                    result.v.Y = y;
                    result.v.Z = z;
                },
                /**
                 * Returns the distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    The second vector.
                 * @return  {number}                                       The distance between two vectors.
                 */
                Distance: function (value1, value2) {
                    value1 = {v:value1};
                    value2 = {v:value2};
                    var result = { };
                    Microsoft.Xna.Framework.Vector3.DistanceSquared$1(value1, value2, result);
                    return Math.sqrt(result.v);
                },
                /**
                 * Returns the distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    The second vector.
                 * @param   {System.Single}                      result    The distance between two vectors as an output parameter.
                 * @return  {void}
                 */
                Distance$1: function (value1, value2, result) {
                    Microsoft.Xna.Framework.Vector3.DistanceSquared$1(value1, value2, result);
                    result.v = Math.sqrt(result.v);
                },
                /**
                 * Returns the squared distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    The second vector.
                 * @return  {number}                                       The squared distance between two vectors.
                 */
                DistanceSquared: function (value1, value2) {
                    return (value1.X - value2.X) * (value1.X - value2.X) + (value1.Y - value2.Y) * (value1.Y - value2.Y) + (value1.Z - value2.Z) * (value1.Z - value2.Z);
                },
                /**
                 * Returns the squared distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    The second vector.
                 * @param   {System.Single}                      result    The squared distance between two vectors as an output parameter.
                 * @return  {void}
                 */
                DistanceSquared$1: function (value1, value2, result) {
                    result.v = (value1.v.X - value2.v.X) * (value1.v.X - value2.v.X) + (value1.v.Y - value2.v.Y) * (value1.v.Y - value2.v.Y) + (value1.v.Z - value2.v.Z) * (value1.v.Z - value2.v.Z);
                },
                /**
                 * Divides the components of a {@link } by the components of another {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    Divisor {@link }.
                 * @return  {Microsoft.Xna.Framework.Vector3}              The result of dividing the vectors.
                 */
                Divide: function (value1, value2) {
                    value1.X /= value2.X;
                    value1.Y /= value2.Y;
                    value1.Z /= value2.Z;
                    return value1.$clone();
                },
                /**
                 * Divides the components of a {@link } by a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1     Source {@link }.
                 * @param   {number}                             divider    Divisor scalar.
                 * @return  {Microsoft.Xna.Framework.Vector3}               The result of dividing a vector by a scalar.
                 */
                Divide$1: function (value1, divider) {
                    var factor = 1 / divider;
                    value1.X *= factor;
                    value1.Y *= factor;
                    value1.Z *= factor;
                    return value1.$clone();
                },
                /**
                 * Divides the components of a {@link } by a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1     Source {@link }.
                 * @param   {number}                             divider    Divisor scalar.
                 * @param   {Microsoft.Xna.Framework.Vector3}    result     The result of dividing a vector by a scalar as an output parameter.
                 * @return  {void}
                 */
                Divide$3: function (value1, divider, result) {
                    var factor = 1 / divider;
                    result.v.X = value1.v.X * factor;
                    result.v.Y = value1.v.Y * factor;
                    result.v.Z = value1.v.Z * factor;
                },
                /**
                 * Divides the components of a {@link } by the components of another {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    Divisor {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector3}    result    The result of dividing the vectors as an output parameter.
                 * @return  {void}
                 */
                Divide$2: function (value1, value2, result) {
                    result.v.X = value1.v.X / value2.v.X;
                    result.v.Y = value1.v.Y / value2.v.Y;
                    result.v.Z = value1.v.Z / value2.v.Z;
                },
                /**
                 * Returns a dot product of two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    The second vector.
                 * @return  {number}                                       The dot product of two vectors.
                 */
                Dot: function (value1, value2) {
                    return value1.X * value2.X + value1.Y * value2.Y + value1.Z * value2.Z;
                },
                /**
                 * Returns a dot product of two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    The second vector.
                 * @param   {System.Single}                      result    The dot product of two vectors as an output parameter.
                 * @return  {void}
                 */
                Dot$1: function (value1, value2, result) {
                    result.v = value1.v.X * value2.v.X + value1.v.Y * value2.v.Y + value1.v.Z * value2.v.Z;
                },
                /**
                 * Creates a new {@link } that contains hermite spline interpolation.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1      The first position vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    tangent1    The first tangent vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2      The second position vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    tangent2    The second tangent vector.
                 * @param   {number}                             amount      Weighting factor.
                 * @return  {Microsoft.Xna.Framework.Vector3}                The hermite spline interpolation vector.
                 */
                Hermite: function (value1, tangent1, value2, tangent2, amount) {
                    return new Microsoft.Xna.Framework.Vector3.$ctor3(Microsoft.Xna.Framework.MathHelper.Hermite(value1.X, tangent1.X, value2.X, tangent2.X, amount), Microsoft.Xna.Framework.MathHelper.Hermite(value1.Y, tangent1.Y, value2.Y, tangent2.Y, amount), Microsoft.Xna.Framework.MathHelper.Hermite(value1.Z, tangent1.Z, value2.Z, tangent2.Z, amount));
                },
                /**
                 * Creates a new {@link } that contains hermite spline interpolation.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1      The first position vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    tangent1    The first tangent vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2      The second position vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    tangent2    The second tangent vector.
                 * @param   {number}                             amount      Weighting factor.
                 * @param   {Microsoft.Xna.Framework.Vector3}    result      The hermite spline interpolation vector as an output parameter.
                 * @return  {void}
                 */
                Hermite$1: function (value1, tangent1, value2, tangent2, amount, result) {
                    result.v.X = Microsoft.Xna.Framework.MathHelper.Hermite(value1.v.X, tangent1.v.X, value2.v.X, tangent2.v.X, amount);
                    result.v.Y = Microsoft.Xna.Framework.MathHelper.Hermite(value1.v.Y, tangent1.v.Y, value2.v.Y, tangent2.v.Y, amount);
                    result.v.Z = Microsoft.Xna.Framework.MathHelper.Hermite(value1.v.Z, tangent1.v.Z, value2.v.Z, tangent2.v.Z, amount);
                },
                /**
                 * Creates a new {@link } that contains linear interpolation of the specified vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    The second vector.
                 * @param   {number}                             amount    Weighting value(between 0.0 and 1.0).
                 * @return  {Microsoft.Xna.Framework.Vector3}              The result of linear interpolation of the specified vectors.
                 */
                Lerp: function (value1, value2, amount) {
                    return new Microsoft.Xna.Framework.Vector3.$ctor3(Microsoft.Xna.Framework.MathHelper.Lerp(value1.X, value2.X, amount), Microsoft.Xna.Framework.MathHelper.Lerp(value1.Y, value2.Y, amount), Microsoft.Xna.Framework.MathHelper.Lerp(value1.Z, value2.Z, amount));
                },
                /**
                 * Creates a new {@link } that contains linear interpolation of the specified vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    The second vector.
                 * @param   {number}                             amount    Weighting value(between 0.0 and 1.0).
                 * @param   {Microsoft.Xna.Framework.Vector3}    result    The result of linear interpolation of the specified vectors as an output parameter.
                 * @return  {void}
                 */
                Lerp$1: function (value1, value2, amount, result) {
                    result.v.X = Microsoft.Xna.Framework.MathHelper.Lerp(value1.v.X, value2.v.X, amount);
                    result.v.Y = Microsoft.Xna.Framework.MathHelper.Lerp(value1.v.Y, value2.v.Y, amount);
                    result.v.Z = Microsoft.Xna.Framework.MathHelper.Lerp(value1.v.Z, value2.v.Z, amount);
                },
                /**
                 * Creates a new {@link } that contains linear interpolation of the specified vectors.
                 Uses {@link } on MathHelper for the interpolation.
                 Less efficient but more precise compared to {@link }.
                 See remarks section of {@link } on MathHelper for more info.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    The second vector.
                 * @param   {number}                             amount    Weighting value(between 0.0 and 1.0).
                 * @return  {Microsoft.Xna.Framework.Vector3}              The result of linear interpolation of the specified vectors.
                 */
                LerpPrecise: function (value1, value2, amount) {
                    return new Microsoft.Xna.Framework.Vector3.$ctor3(Microsoft.Xna.Framework.MathHelper.LerpPrecise(value1.X, value2.X, amount), Microsoft.Xna.Framework.MathHelper.LerpPrecise(value1.Y, value2.Y, amount), Microsoft.Xna.Framework.MathHelper.LerpPrecise(value1.Z, value2.Z, amount));
                },
                /**
                 * Creates a new {@link } that contains linear interpolation of the specified vectors.
                 Uses {@link } on MathHelper for the interpolation.
                 Less efficient but more precise compared to {@link }.
                 See remarks section of {@link } on MathHelper for more info.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    The second vector.
                 * @param   {number}                             amount    Weighting value(between 0.0 and 1.0).
                 * @param   {Microsoft.Xna.Framework.Vector3}    result    The result of linear interpolation of the specified vectors as an output parameter.
                 * @return  {void}
                 */
                LerpPrecise$1: function (value1, value2, amount, result) {
                    result.v.X = Microsoft.Xna.Framework.MathHelper.LerpPrecise(value1.v.X, value2.v.X, amount);
                    result.v.Y = Microsoft.Xna.Framework.MathHelper.LerpPrecise(value1.v.Y, value2.v.Y, amount);
                    result.v.Z = Microsoft.Xna.Framework.MathHelper.LerpPrecise(value1.v.Z, value2.v.Z, amount);
                },
                /**
                 * Creates a new {@link } that contains a maximal values from the two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    The second vector.
                 * @return  {Microsoft.Xna.Framework.Vector3}              The {@link } with maximal values from the two vectors.
                 */
                Max: function (value1, value2) {
                    return new Microsoft.Xna.Framework.Vector3.$ctor3(Microsoft.Xna.Framework.MathHelper.Max$1(value1.X, value2.X), Microsoft.Xna.Framework.MathHelper.Max$1(value1.Y, value2.Y), Microsoft.Xna.Framework.MathHelper.Max$1(value1.Z, value2.Z));
                },
                /**
                 * Creates a new {@link } that contains a maximal values from the two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    The second vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    result    The {@link } with maximal values from the two vectors as an output parameter.
                 * @return  {void}
                 */
                Max$1: function (value1, value2, result) {
                    result.v.X = Microsoft.Xna.Framework.MathHelper.Max$1(value1.v.X, value2.v.X);
                    result.v.Y = Microsoft.Xna.Framework.MathHelper.Max$1(value1.v.Y, value2.v.Y);
                    result.v.Z = Microsoft.Xna.Framework.MathHelper.Max$1(value1.v.Z, value2.v.Z);
                },
                /**
                 * Creates a new {@link } that contains a minimal values from the two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    The second vector.
                 * @return  {Microsoft.Xna.Framework.Vector3}              The {@link } with minimal values from the two vectors.
                 */
                Min: function (value1, value2) {
                    return new Microsoft.Xna.Framework.Vector3.$ctor3(Microsoft.Xna.Framework.MathHelper.Min$1(value1.X, value2.X), Microsoft.Xna.Framework.MathHelper.Min$1(value1.Y, value2.Y), Microsoft.Xna.Framework.MathHelper.Min$1(value1.Z, value2.Z));
                },
                /**
                 * Creates a new {@link } that contains a minimal values from the two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    The second vector.
                 * @param   {Microsoft.Xna.Framework.Vector3}    result    The {@link } with minimal values from the two vectors as an output parameter.
                 * @return  {void}
                 */
                Min$1: function (value1, value2, result) {
                    result.v.X = Microsoft.Xna.Framework.MathHelper.Min$1(value1.v.X, value2.v.X);
                    result.v.Y = Microsoft.Xna.Framework.MathHelper.Min$1(value1.v.Y, value2.v.Y);
                    result.v.Z = Microsoft.Xna.Framework.MathHelper.Min$1(value1.v.Z, value2.v.Z);
                },
                /**
                 * Creates a new {@link } that contains a multiplication of two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    Source {@link }.
                 * @return  {Microsoft.Xna.Framework.Vector3}              The result of the vector multiplication.
                 */
                Multiply: function (value1, value2) {
                    value1.X *= value2.X;
                    value1.Y *= value2.Y;
                    value1.Z *= value2.Z;
                    return value1.$clone();
                },
                /**
                 * Creates a new {@link } that contains a multiplication of {@link } and a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1         Source {@link }.
                 * @param   {number}                             scaleFactor    Scalar value.
                 * @return  {Microsoft.Xna.Framework.Vector3}                   The result of the vector multiplication with a scalar.
                 */
                Multiply$1: function (value1, scaleFactor) {
                    value1.X *= scaleFactor;
                    value1.Y *= scaleFactor;
                    value1.Z *= scaleFactor;
                    return value1.$clone();
                },
                /**
                 * Creates a new {@link } that contains a multiplication of {@link } and a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1         Source {@link }.
                 * @param   {number}                             scaleFactor    Scalar value.
                 * @param   {Microsoft.Xna.Framework.Vector3}    result         The result of the multiplication with a scalar as an output parameter.
                 * @return  {void}
                 */
                Multiply$3: function (value1, scaleFactor, result) {
                    result.v.X = value1.v.X * scaleFactor;
                    result.v.Y = value1.v.Y * scaleFactor;
                    result.v.Z = value1.v.Z * scaleFactor;
                },
                /**
                 * Creates a new {@link } that contains a multiplication of two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector3}    result    The result of the vector multiplication as an output parameter.
                 * @return  {void}
                 */
                Multiply$2: function (value1, value2, result) {
                    result.v.X = value1.v.X * value2.v.X;
                    result.v.Y = value1.v.Y * value2.v.Y;
                    result.v.Z = value1.v.Z * value2.v.Z;
                },
                /**
                 * Creates a new {@link } that contains the specified vector inversion.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value    Source {@link }.
                 * @return  {Microsoft.Xna.Framework.Vector3}             The result of the vector inversion.
                 */
                Negate: function (value) {
                    value = new Microsoft.Xna.Framework.Vector3.$ctor3(-value.X, -value.Y, -value.Z);
                    return value.$clone();
                },
                /**
                 * Creates a new {@link } that contains the specified vector inversion.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value     Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector3}    result    The result of the vector inversion as an output parameter.
                 * @return  {void}
                 */
                Negate$1: function (value, result) {
                    result.v.X = -value.v.X;
                    result.v.Y = -value.v.Y;
                    result.v.Z = -value.v.Z;
                },
                /**
                 * Creates a new {@link } that contains a normalized values from another vector.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value    Source {@link }.
                 * @return  {Microsoft.Xna.Framework.Vector3}             Unit vector.
                 */
                Normalize: function (value) {
                    var factor = Math.sqrt((value.X * value.X) + (value.Y * value.Y) + (value.Z * value.Z));
                    factor = 1.0 / factor;
                    return new Microsoft.Xna.Framework.Vector3.$ctor3(value.X * factor, value.Y * factor, value.Z * factor);
                },
                /**
                 * Creates a new {@link } that contains a normalized values from another vector.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value     Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector3}    result    Unit vector as an output parameter.
                 * @return  {void}
                 */
                Normalize$1: function (value, result) {
                    var factor = Math.sqrt((value.v.X * value.v.X) + (value.v.Y * value.v.Y) + (value.v.Z * value.v.Z));
                    factor = 1.0 / factor;
                    result.v.X = value.v.X * factor;
                    result.v.Y = value.v.Y * factor;
                    result.v.Z = value.v.Z * factor;
                },
                /**
                 * Creates a new {@link } that contains reflect vector of the given vector and normal.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    vector    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector3}    normal    Reflection normal.
                 * @return  {Microsoft.Xna.Framework.Vector3}              Reflected vector.
                 */
                Reflect: function (vector, normal) {
                    var reflectedVector = new Microsoft.Xna.Framework.Vector3();
                    var dotProduct = ((vector.X * normal.X) + (vector.Y * normal.Y)) + (vector.Z * normal.Z);
                    reflectedVector.X = vector.X - (2.0 * normal.X) * dotProduct;
                    reflectedVector.Y = vector.Y - (2.0 * normal.Y) * dotProduct;
                    reflectedVector.Z = vector.Z - (2.0 * normal.Z) * dotProduct;

                    return reflectedVector.$clone();
                },
                /**
                 * Creates a new {@link } that contains reflect vector of the given vector and normal.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    vector    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector3}    normal    Reflection normal.
                 * @param   {Microsoft.Xna.Framework.Vector3}    result    Reflected vector as an output parameter.
                 * @return  {void}
                 */
                Reflect$1: function (vector, normal, result) {

                    var dotProduct = ((vector.v.X * normal.v.X) + (vector.v.Y * normal.v.Y)) + (vector.v.Z * normal.v.Z);
                    result.v.X = vector.v.X - (2.0 * normal.v.X) * dotProduct;
                    result.v.Y = vector.v.Y - (2.0 * normal.v.Y) * dotProduct;
                    result.v.Z = vector.v.Z - (2.0 * normal.v.Z) * dotProduct;
                },
                /**
                 * Creates a new {@link } that contains cubic interpolation of the specified vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    Source {@link }.
                 * @param   {number}                             amount    Weighting value.
                 * @return  {Microsoft.Xna.Framework.Vector3}              Cubic interpolation of the specified vectors.
                 */
                SmoothStep: function (value1, value2, amount) {
                    return new Microsoft.Xna.Framework.Vector3.$ctor3(Microsoft.Xna.Framework.MathHelper.SmoothStep(value1.X, value2.X, amount), Microsoft.Xna.Framework.MathHelper.SmoothStep(value1.Y, value2.Y, amount), Microsoft.Xna.Framework.MathHelper.SmoothStep(value1.Z, value2.Z, amount));
                },
                /**
                 * Creates a new {@link } that contains cubic interpolation of the specified vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    Source {@link }.
                 * @param   {number}                             amount    Weighting value.
                 * @param   {Microsoft.Xna.Framework.Vector3}    result    Cubic interpolation of the specified vectors as an output parameter.
                 * @return  {void}
                 */
                SmoothStep$1: function (value1, value2, amount, result) {
                    result.v.X = Microsoft.Xna.Framework.MathHelper.SmoothStep(value1.v.X, value2.v.X, amount);
                    result.v.Y = Microsoft.Xna.Framework.MathHelper.SmoothStep(value1.v.Y, value2.v.Y, amount);
                    result.v.Z = Microsoft.Xna.Framework.MathHelper.SmoothStep(value1.v.Z, value2.v.Z, amount);
                },
                /**
                 * Creates a new {@link } that contains subtraction of on {@link } from a another.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    Source {@link }.
                 * @return  {Microsoft.Xna.Framework.Vector3}              The result of the vector subtraction.
                 */
                Subtract: function (value1, value2) {
                    value1.X -= value2.X;
                    value1.Y -= value2.Y;
                    value1.Z -= value2.Z;
                    return value1.$clone();
                },
                /**
                 * Creates a new {@link } that contains subtraction of on {@link } from a another.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector3}    result    The result of the vector subtraction as an output parameter.
                 * @return  {void}
                 */
                Subtract$1: function (value1, value2, result) {
                    result.v.X = value1.v.X - value2.v.X;
                    result.v.Y = value1.v.Y - value2.v.Y;
                    result.v.Z = value1.v.Z - value2.v.Z;
                },
                /**
                 * Creates a new {@link } that contains a transformation of 3d-vector by the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    position    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Matrix}     matrix      The transformation {@link }.
                 * @return  {Microsoft.Xna.Framework.Vector3}                Transformed {@link }.
                 */
                Transform: function (position, matrix) {
                    position = {v:position};
                    matrix = {v:matrix};
                    Microsoft.Xna.Framework.Vector3.Transform$2(position, matrix, position);
                    return position.v.$clone();
                },
                /**
                 * Creates a new {@link } that contains a transformation of 3d-vector by the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    position    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Matrix}     matrix      The transformation {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector3}    result      Transformed {@link } as an output parameter.
                 * @return  {void}
                 */
                Transform$2: function (position, matrix, result) {
                    var x = (position.v.X * matrix.v.M11) + (position.v.Y * matrix.v.M21) + (position.v.Z * matrix.v.M31) + matrix.v.M41;
                    var y = (position.v.X * matrix.v.M12) + (position.v.Y * matrix.v.M22) + (position.v.Z * matrix.v.M32) + matrix.v.M42;
                    var z = (position.v.X * matrix.v.M13) + (position.v.Y * matrix.v.M23) + (position.v.Z * matrix.v.M33) + matrix.v.M43;
                    result.v.X = x;
                    result.v.Y = y;
                    result.v.Z = z;
                },
                /**
                 * Creates a new {@link } that contains a transformation of 3d-vector by the specified {@link }, representing the rotation.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}       value       Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    rotation    The {@link } which contains rotation transformation.
                 * @return  {Microsoft.Xna.Framework.Vector3}                   Transformed {@link }.
                 */
                Transform$1: function (value, rotation) {
                    value = {v:value};
                    rotation = {v:rotation};
                    var result = { v : new Microsoft.Xna.Framework.Vector3() };
                    Microsoft.Xna.Framework.Vector3.Transform$3(value, rotation, result);
                    return result.v.$clone();
                },
                /**
                 * Creates a new {@link } that contains a transformation of 3d-vector by the specified {@link }, representing the rotation.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}       value       Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    rotation    The {@link } which contains rotation transformation.
                 * @param   {Microsoft.Xna.Framework.Vector3}       result      Transformed {@link } as an output parameter.
                 * @return  {void}
                 */
                Transform$3: function (value, rotation, result) {
                    var x = 2 * (rotation.v.Y * value.v.Z - rotation.v.Z * value.v.Y);
                    var y = 2 * (rotation.v.Z * value.v.X - rotation.v.X * value.v.Z);
                    var z = 2 * (rotation.v.X * value.v.Y - rotation.v.Y * value.v.X);

                    result.v.X = value.v.X + x * rotation.v.W + (rotation.v.Y * z - rotation.v.Z * y);
                    result.v.Y = value.v.Y + y * rotation.v.W + (rotation.v.Z * x - rotation.v.X * z);
                    result.v.Z = value.v.Z + z * rotation.v.W + (rotation.v.X * y - rotation.v.Y * x);
                },
                /**
                 * Apply transformation on vectors within array of {@link } by the specified {@link } and places the results in an another array.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Array.<Microsoft.Xna.Framework.Vector3>}    sourceArray         Source array.
                 * @param   {number}                                     sourceIndex         The starting index of transformation in the source array.
                 * @param   {Microsoft.Xna.Framework.Matrix}             matrix              The transformation {@link }.
                 * @param   {Array.<Microsoft.Xna.Framework.Vector3>}    destinationArray    Destination array.
                 * @param   {number}                                     destinationIndex    The starting index in the destination array, where the first {@link } should be written.
                 * @param   {number}                                     length              The number of vectors to be transformed.
                 * @return  {void}
                 */
                Transform$6: function (sourceArray, sourceIndex, matrix, destinationArray, destinationIndex, length) {
                    if (sourceArray == null) {
                        throw new System.ArgumentNullException.$ctor1("sourceArray");
                    }
                    if (destinationArray == null) {
                        throw new System.ArgumentNullException.$ctor1("destinationArray");
                    }
                    if (sourceArray.length < ((sourceIndex + length) | 0)) {
                        throw new System.ArgumentException.$ctor1("Source array length is lesser than sourceIndex + length");
                    }
                    if (destinationArray.length < ((destinationIndex + length) | 0)) {
                        throw new System.ArgumentException.$ctor1("Destination array length is lesser than destinationIndex + length");
                    }


                    for (var i = 0; i < length; i = (i + 1) | 0) {
                        var position = sourceArray[System.Array.index(((sourceIndex + i) | 0), sourceArray)].$clone();
                        destinationArray[System.Array.index(((destinationIndex + i) | 0), destinationArray)] = new Microsoft.Xna.Framework.Vector3.$ctor3((position.X * matrix.v.M11) + (position.Y * matrix.v.M21) + (position.Z * matrix.v.M31) + matrix.v.M41, (position.X * matrix.v.M12) + (position.Y * matrix.v.M22) + (position.Z * matrix.v.M32) + matrix.v.M42, (position.X * matrix.v.M13) + (position.Y * matrix.v.M23) + (position.Z * matrix.v.M33) + matrix.v.M43);
                    }
                },
                /**
                 * Apply transformation on vectors within array of {@link } by the specified {@link } and places the results in an another array.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Array.<Microsoft.Xna.Framework.Vector3>}    sourceArray         Source array.
                 * @param   {number}                                     sourceIndex         The starting index of transformation in the source array.
                 * @param   {Microsoft.Xna.Framework.Quaternion}         rotation            The {@link } which contains rotation transformation.
                 * @param   {Array.<Microsoft.Xna.Framework.Vector3>}    destinationArray    Destination array.
                 * @param   {number}                                     destinationIndex    The starting index in the destination array, where the first {@link } should be written.
                 * @param   {number}                                     length              The number of vectors to be transformed.
                 * @return  {void}
                 */
                Transform$7: function (sourceArray, sourceIndex, rotation, destinationArray, destinationIndex, length) {
                    if (sourceArray == null) {
                        throw new System.ArgumentNullException.$ctor1("sourceArray");
                    }
                    if (destinationArray == null) {
                        throw new System.ArgumentNullException.$ctor1("destinationArray");
                    }
                    if (sourceArray.length < ((sourceIndex + length) | 0)) {
                        throw new System.ArgumentException.$ctor1("Source array length is lesser than sourceIndex + length");
                    }
                    if (destinationArray.length < ((destinationIndex + length) | 0)) {
                        throw new System.ArgumentException.$ctor1("Destination array length is lesser than destinationIndex + length");
                    }


                    for (var i = 0; i < length; i = (i + 1) | 0) {
                        var position = sourceArray[System.Array.index(((sourceIndex + i) | 0), sourceArray)].$clone();

                        var x = 2 * (rotation.v.Y * position.Z - rotation.v.Z * position.Y);
                        var y = 2 * (rotation.v.Z * position.X - rotation.v.X * position.Z);
                        var z = 2 * (rotation.v.X * position.Y - rotation.v.Y * position.X);

                        destinationArray[System.Array.index(((destinationIndex + i) | 0), destinationArray)] = new Microsoft.Xna.Framework.Vector3.$ctor3(position.X + x * rotation.v.W + (rotation.v.Y * z - rotation.v.Z * y), position.Y + y * rotation.v.W + (rotation.v.Z * x - rotation.v.X * z), position.Z + z * rotation.v.W + (rotation.v.X * y - rotation.v.Y * x));
                    }
                },
                /**
                 * Apply transformation on all vectors within array of {@link } by the specified {@link } and places the results in an another array.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Array.<Microsoft.Xna.Framework.Vector3>}    sourceArray         Source array.
                 * @param   {Microsoft.Xna.Framework.Matrix}             matrix              The transformation {@link }.
                 * @param   {Array.<Microsoft.Xna.Framework.Vector3>}    destinationArray    Destination array.
                 * @return  {void}
                 */
                Transform$4: function (sourceArray, matrix, destinationArray) {
                    if (sourceArray == null) {
                        throw new System.ArgumentNullException.$ctor1("sourceArray");
                    }
                    if (destinationArray == null) {
                        throw new System.ArgumentNullException.$ctor1("destinationArray");
                    }
                    if (destinationArray.length < sourceArray.length) {
                        throw new System.ArgumentException.$ctor1("Destination array length is lesser than source array length");
                    }


                    for (var i = 0; i < sourceArray.length; i = (i + 1) | 0) {
                        var position = sourceArray[System.Array.index(i, sourceArray)].$clone();
                        destinationArray[System.Array.index(i, destinationArray)] = new Microsoft.Xna.Framework.Vector3.$ctor3((position.X * matrix.v.M11) + (position.Y * matrix.v.M21) + (position.Z * matrix.v.M31) + matrix.v.M41, (position.X * matrix.v.M12) + (position.Y * matrix.v.M22) + (position.Z * matrix.v.M32) + matrix.v.M42, (position.X * matrix.v.M13) + (position.Y * matrix.v.M23) + (position.Z * matrix.v.M33) + matrix.v.M43);
                    }
                },
                /**
                 * Apply transformation on all vectors within array of {@link } by the specified {@link } and places the results in an another array.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Array.<Microsoft.Xna.Framework.Vector3>}    sourceArray         Source array.
                 * @param   {Microsoft.Xna.Framework.Quaternion}         rotation            The {@link } which contains rotation transformation.
                 * @param   {Array.<Microsoft.Xna.Framework.Vector3>}    destinationArray    Destination array.
                 * @return  {void}
                 */
                Transform$5: function (sourceArray, rotation, destinationArray) {
                    if (sourceArray == null) {
                        throw new System.ArgumentNullException.$ctor1("sourceArray");
                    }
                    if (destinationArray == null) {
                        throw new System.ArgumentNullException.$ctor1("destinationArray");
                    }
                    if (destinationArray.length < sourceArray.length) {
                        throw new System.ArgumentException.$ctor1("Destination array length is lesser than source array length");
                    }


                    for (var i = 0; i < sourceArray.length; i = (i + 1) | 0) {
                        var position = sourceArray[System.Array.index(i, sourceArray)].$clone();

                        var x = 2 * (rotation.v.Y * position.Z - rotation.v.Z * position.Y);
                        var y = 2 * (rotation.v.Z * position.X - rotation.v.X * position.Z);
                        var z = 2 * (rotation.v.X * position.Y - rotation.v.Y * position.X);

                        destinationArray[System.Array.index(i, destinationArray)] = new Microsoft.Xna.Framework.Vector3.$ctor3(position.X + x * rotation.v.W + (rotation.v.Y * z - rotation.v.Z * y), position.Y + y * rotation.v.W + (rotation.v.Z * x - rotation.v.X * z), position.Z + z * rotation.v.W + (rotation.v.X * y - rotation.v.Y * x));
                    }
                },
                /**
                 * Creates a new {@link } that contains a transformation of the specified normal by the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    normal    Source {@link } which represents a normal vector.
                 * @param   {Microsoft.Xna.Framework.Matrix}     matrix    The transformation {@link }.
                 * @return  {Microsoft.Xna.Framework.Vector3}              Transformed normal.
                 */
                TransformNormal: function (normal, matrix) {
                    normal = {v:normal};
                    matrix = {v:matrix};
                    Microsoft.Xna.Framework.Vector3.TransformNormal$1(normal, matrix, normal);
                    return normal.v.$clone();
                },
                /**
                 * Creates a new {@link } that contains a transformation of the specified normal by the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    normal    Source {@link } which represents a normal vector.
                 * @param   {Microsoft.Xna.Framework.Matrix}     matrix    The transformation {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector3}    result    Transformed normal as an output parameter.
                 * @return  {void}
                 */
                TransformNormal$1: function (normal, matrix, result) {
                    var x = (normal.v.X * matrix.v.M11) + (normal.v.Y * matrix.v.M21) + (normal.v.Z * matrix.v.M31);
                    var y = (normal.v.X * matrix.v.M12) + (normal.v.Y * matrix.v.M22) + (normal.v.Z * matrix.v.M32);
                    var z = (normal.v.X * matrix.v.M13) + (normal.v.Y * matrix.v.M23) + (normal.v.Z * matrix.v.M33);
                    result.v.X = x;
                    result.v.Y = y;
                    result.v.Z = z;
                },
                /**
                 * Apply transformation on normals within array of {@link } by the specified {@link } and places the results in an another array.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Array.<Microsoft.Xna.Framework.Vector3>}    sourceArray         Source array.
                 * @param   {number}                                     sourceIndex         The starting index of transformation in the source array.
                 * @param   {Microsoft.Xna.Framework.Matrix}             matrix              The transformation {@link }.
                 * @param   {Array.<Microsoft.Xna.Framework.Vector3>}    destinationArray    Destination array.
                 * @param   {number}                                     destinationIndex    The starting index in the destination array, where the first {@link } should be written.
                 * @param   {number}                                     length              The number of normals to be transformed.
                 * @return  {void}
                 */
                TransformNormal$3: function (sourceArray, sourceIndex, matrix, destinationArray, destinationIndex, length) {
                    if (sourceArray == null) {
                        throw new System.ArgumentNullException.$ctor1("sourceArray");
                    }
                    if (destinationArray == null) {
                        throw new System.ArgumentNullException.$ctor1("destinationArray");
                    }
                    if (sourceArray.length < ((sourceIndex + length) | 0)) {
                        throw new System.ArgumentException.$ctor1("Source array length is lesser than sourceIndex + length");
                    }
                    if (destinationArray.length < ((destinationIndex + length) | 0)) {
                        throw new System.ArgumentException.$ctor1("Destination array length is lesser than destinationIndex + length");
                    }

                    for (var x = 0; x < length; x = (x + 1) | 0) {
                        var normal = sourceArray[System.Array.index(((sourceIndex + x) | 0), sourceArray)].$clone();

                        destinationArray[System.Array.index(((destinationIndex + x) | 0), destinationArray)] = new Microsoft.Xna.Framework.Vector3.$ctor3((normal.X * matrix.v.M11) + (normal.Y * matrix.v.M21) + (normal.Z * matrix.v.M31), (normal.X * matrix.v.M12) + (normal.Y * matrix.v.M22) + (normal.Z * matrix.v.M32), (normal.X * matrix.v.M13) + (normal.Y * matrix.v.M23) + (normal.Z * matrix.v.M33));
                    }
                },
                /**
                 * Apply transformation on all normals within array of {@link } by the specified {@link } and places the results in an another array.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Array.<Microsoft.Xna.Framework.Vector3>}    sourceArray         Source array.
                 * @param   {Microsoft.Xna.Framework.Matrix}             matrix              The transformation {@link }.
                 * @param   {Array.<Microsoft.Xna.Framework.Vector3>}    destinationArray    Destination array.
                 * @return  {void}
                 */
                TransformNormal$2: function (sourceArray, matrix, destinationArray) {
                    if (sourceArray == null) {
                        throw new System.ArgumentNullException.$ctor1("sourceArray");
                    }
                    if (destinationArray == null) {
                        throw new System.ArgumentNullException.$ctor1("destinationArray");
                    }
                    if (destinationArray.length < sourceArray.length) {
                        throw new System.ArgumentException.$ctor1("Destination array length is lesser than source array length");
                    }

                    for (var i = 0; i < sourceArray.length; i = (i + 1) | 0) {
                        var normal = sourceArray[System.Array.index(i, sourceArray)].$clone();

                        destinationArray[System.Array.index(i, destinationArray)] = new Microsoft.Xna.Framework.Vector3.$ctor3((normal.X * matrix.v.M11) + (normal.Y * matrix.v.M21) + (normal.Z * matrix.v.M31), (normal.X * matrix.v.M12) + (normal.Y * matrix.v.M22) + (normal.Z * matrix.v.M32), (normal.X * matrix.v.M13) + (normal.Y * matrix.v.M23) + (normal.Z * matrix.v.M33));
                    }
                }/**
                 * Compares whether two {@link } instances are equal.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    {@link } instance on the left of the equal sign.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    {@link } instance on the right of the equal sign.
                 * @return  {boolean}                                      <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
                 */
                ,
                op_Equality: function (value1, value2) {
                    return value1.X === value2.X && value1.Y === value2.Y && value1.Z === value2.Z;
                }/**
                 * Compares whether two {@link } instances are not equal.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    {@link } instance on the left of the not equal sign.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    {@link } instance on the right of the not equal sign.
                 * @return  {boolean}                                      <pre><code>true</code></pre> if the instances are not equal; <pre><code>false</code></pre> otherwise.
                 */
                ,
                op_Inequality: function (value1, value2) {
                    return !(Microsoft.Xna.Framework.Vector3.op_Equality(value1.$clone(), value2.$clone()));
                }/**
                 * Adds two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    Source {@link } on the left of the add sign.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    Source {@link } on the right of the add sign.
                 * @return  {Microsoft.Xna.Framework.Vector3}              Sum of the vectors.
                 */
                ,
                op_Addition: function (value1, value2) {
                    value1.X += value2.X;
                    value1.Y += value2.Y;
                    value1.Z += value2.Z;
                    return value1.$clone();
                }/**
                 * Inverts values in the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value    Source {@link } on the right of the sub sign.
                 * @return  {Microsoft.Xna.Framework.Vector3}             Result of the inversion.
                 */
                ,
                op_UnaryNegation: function (value) {
                    value = new Microsoft.Xna.Framework.Vector3.$ctor3(-value.X, -value.Y, -value.Z);
                    return value.$clone();
                }/**
                 * Subtracts a {@link } from a {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    Source {@link } on the left of the sub sign.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    Source {@link } on the right of the sub sign.
                 * @return  {Microsoft.Xna.Framework.Vector3}              Result of the vector subtraction.
                 */
                ,
                op_Subtraction: function (value1, value2) {
                    value1.X -= value2.X;
                    value1.Y -= value2.Y;
                    value1.Z -= value2.Z;
                    return value1.$clone();
                }/**
                 * Multiplies the components of two vectors by each other.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    Source {@link } on the left of the mul sign.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    Source {@link } on the right of the mul sign.
                 * @return  {Microsoft.Xna.Framework.Vector3}              Result of the vector multiplication.
                 */
                ,
                op_Multiply: function (value1, value2) {
                    value1.X *= value2.X;
                    value1.Y *= value2.Y;
                    value1.Z *= value2.Z;
                    return value1.$clone();
                }/**
                 * Multiplies the components of vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value          Source {@link } on the left of the mul sign.
                 * @param   {number}                             scaleFactor    Scalar value on the right of the mul sign.
                 * @return  {Microsoft.Xna.Framework.Vector3}                   Result of the vector multiplication with a scalar.
                 */
                ,
                op_Multiply$1: function (value, scaleFactor) {
                    value.X *= scaleFactor;
                    value.Y *= scaleFactor;
                    value.Z *= scaleFactor;
                    return value.$clone();
                }/**
                 * Multiplies the components of vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {number}                             scaleFactor    Scalar value on the left of the mul sign.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value          Source {@link } on the right of the mul sign.
                 * @return  {Microsoft.Xna.Framework.Vector3}                   Result of the vector multiplication with a scalar.
                 */
                ,
                op_Multiply$2: function (scaleFactor, value) {
                    value.X *= scaleFactor;
                    value.Y *= scaleFactor;
                    value.Z *= scaleFactor;
                    return value.$clone();
                }/**
                 * Divides the components of a {@link } by the components of another {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1    Source {@link } on the left of the div sign.
                 * @param   {Microsoft.Xna.Framework.Vector3}    value2    Divisor {@link } on the right of the div sign.
                 * @return  {Microsoft.Xna.Framework.Vector3}              The result of dividing the vectors.
                 */
                ,
                op_Division: function (value1, value2) {
                    value1.X /= value2.X;
                    value1.Y /= value2.Y;
                    value1.Z /= value2.Z;
                    return value1.$clone();
                }/**
                 * Divides the components of a {@link } by a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector3
                 * @memberof Microsoft.Xna.Framework.Vector3
                 * @param   {Microsoft.Xna.Framework.Vector3}    value1     Source {@link } on the left of the div sign.
                 * @param   {number}                             divider    Divisor scalar on the right of the div sign.
                 * @return  {Microsoft.Xna.Framework.Vector3}               The result of dividing a vector by a scalar.
                 */
                ,
                op_Division$1: function (value1, divider) {
                    var factor = 1 / divider;
                    value1.X *= factor;
                    value1.Y *= factor;
                    value1.Z *= factor;
                    return value1.$clone();
                },
                getDefaultValue: function () { return new Microsoft.Xna.Framework.Vector3(); }
            }
        },
        fields: {
            /**
             * The x coordinate of this {@link }.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Vector3
             * @type number
             */
            X: 0,
            /**
             * The y coordinate of this {@link }.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Vector3
             * @type number
             */
            Y: 0,
            /**
             * The z coordinate of this {@link }.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Vector3
             * @type number
             */
            Z: 0
        },
        props: {
            DebugDisplayString: {
                get: function () {
                    return System.String.concat([System.Single.format(this.X), "  ", System.Single.format(this.Y), "  ", System.Single.format(this.Z)]);
                }
            }
        },
        alias: ["equalsT", "System$IEquatable$1$Microsoft$Xna$Framework$Vector3$equalsT"],
        ctors: {
            /**
             * Constructs a 3d vector with X, Y and Z from three values.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Vector3
             * @memberof Microsoft.Xna.Framework.Vector3
             * @param   {number}    x    The x coordinate in 3d-space.
             * @param   {number}    y    The y coordinate in 3d-space.
             * @param   {number}    z    The z coordinate in 3d-space.
             * @return  {void}
             */
            $ctor3: function (x, y, z) {
                this.$initialize();
                this.X = x;
                this.Y = y;
                this.Z = z;
            },
            /**
             * Constructs a 3d vector with X, Y and Z set to the same value.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Vector3
             * @memberof Microsoft.Xna.Framework.Vector3
             * @param   {number}    value    The x, y and z coordinates in 3d-space.
             * @return  {void}
             */
            $ctor2: function (value) {
                this.$initialize();
                this.X = value;
                this.Y = value;
                this.Z = value;
            },
            /**
             * Constructs a 3d vector with X, Y from {@link } and Z from a scalar.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Vector3
             * @memberof Microsoft.Xna.Framework.Vector3
             * @param   {Microsoft.Xna.Framework.Vector2}    value    The x and y coordinates in 3d-space.
             * @param   {number}                             z        The z coordinate in 3d-space.
             * @return  {void}
             */
            $ctor1: function (value, z) {
                this.$initialize();
                this.X = value.X;
                this.Y = value.Y;
                this.Z = z;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Compares whether current instance is equal to specified {@link }.
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.Vector3
             * @memberof Microsoft.Xna.Framework.Vector3
             * @param   {System.Object}    obj    The {@link } to compare.
             * @return  {boolean}                 <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
             */
            equals: function (obj) {
                if (!(Bridge.is(obj, Microsoft.Xna.Framework.Vector3))) {
                    return false;
                }

                var other = System.Nullable.getValue(Bridge.cast(Bridge.unbox(obj, Microsoft.Xna.Framework.Vector3), Microsoft.Xna.Framework.Vector3));
                return this.X === other.X && this.Y === other.Y && this.Z === other.Z;
            },
            /**
             * Compares whether current instance is equal to specified {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Vector3
             * @memberof Microsoft.Xna.Framework.Vector3
             * @param   {Microsoft.Xna.Framework.Vector3}    other    The {@link } to compare.
             * @return  {boolean}                                     <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
             */
            equalsT: function (other) {
                return this.X === other.X && this.Y === other.Y && this.Z === other.Z;
            },
            /**
             * Gets the hash code of this {@link }.
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.Vector3
             * @memberof Microsoft.Xna.Framework.Vector3
             * @return  {number}        Hash code of this {@link }.
             */
            getHashCode: function () {
                var hashCode = System.Single.getHashCode(this.X);
                hashCode = (Bridge.Int.mul(hashCode, 397)) ^ System.Single.getHashCode(this.Y);
                hashCode = (Bridge.Int.mul(hashCode, 397)) ^ System.Single.getHashCode(this.Z);
                return hashCode;
            },
            /**
             * Returns the length of this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Vector3
             * @memberof Microsoft.Xna.Framework.Vector3
             * @return  {number}        The length of this {@link }.
             */
            Length: function () {
                return Math.sqrt((this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z));
            },
            /**
             * Returns the squared length of this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Vector3
             * @memberof Microsoft.Xna.Framework.Vector3
             * @return  {number}        The squared length of this {@link }.
             */
            LengthSquared: function () {
                return (this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z);
            },
            /**
             * Turns this {@link } to a unit vector with the same direction.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Vector3
             * @memberof Microsoft.Xna.Framework.Vector3
             * @return  {void}
             */
            Normalize: function () {
                var factor = Math.sqrt((this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z));
                factor = 1.0 / factor;
                this.X *= factor;
                this.Y *= factor;
                this.Z *= factor;
            },
            /**
             * Returns a {@link } representation of this {@link } in the format:
             {X:[{@link }] Y:[{@link }] Z:[{@link }]}
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.Vector3
             * @memberof Microsoft.Xna.Framework.Vector3
             * @return  {string}        A {@link } representation of this {@link }.
             */
            toString: function () {
                var sb = new System.Text.StringBuilder("", 32);
                sb.append("{X:");
                sb.append(this.X);
                sb.append(" Y:");
                sb.append(this.Y);
                sb.append(" Z:");
                sb.append(this.Z);
                sb.append("}");
                return sb.toString();
            },
            /**
             * Deconstruction method for {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Vector3
             * @memberof Microsoft.Xna.Framework.Vector3
             * @param   {System.Single}    x    
             * @param   {System.Single}    y    
             * @param   {System.Single}    z
             * @return  {void}
             */
            Deconstruct: function (x, y, z) {
                x.v = this.X;
                y.v = this.Y;
                z.v = this.Z;
            },
            $clone: function (to) {
                var s = to || new Microsoft.Xna.Framework.Vector3();
                s.X = this.X;
                s.Y = this.Y;
                s.Z = this.Z;
                return s;
            }
        }
    });

    /**
     * Describes a 4D-vector.
     *
     * @public
     * @class Microsoft.Xna.Framework.Vector4
     * @implements  System.IEquatable$1
     */
    Bridge.define("Microsoft.Xna.Framework.Vector4", {
        inherits: function () { return [System.IEquatable$1(Microsoft.Xna.Framework.Vector4)]; },
        $kind: "struct",
        statics: {
            fields: {
                zero: null,
                one: null,
                unitX: null,
                unitY: null,
                unitZ: null,
                unitW: null
            },
            props: {
                /**
                 * Returns a {@link } with components 0, 0, 0, 0.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @function Zero
                 * @type Microsoft.Xna.Framework.Vector4
                 */
                Zero: {
                    get: function () {
                        return Microsoft.Xna.Framework.Vector4.zero.$clone();
                    }
                },
                /**
                 * Returns a {@link } with components 1, 1, 1, 1.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @function One
                 * @type Microsoft.Xna.Framework.Vector4
                 */
                One: {
                    get: function () {
                        return Microsoft.Xna.Framework.Vector4.one.$clone();
                    }
                },
                /**
                 * Returns a {@link } with components 1, 0, 0, 0.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @function UnitX
                 * @type Microsoft.Xna.Framework.Vector4
                 */
                UnitX: {
                    get: function () {
                        return Microsoft.Xna.Framework.Vector4.unitX.$clone();
                    }
                },
                /**
                 * Returns a {@link } with components 0, 1, 0, 0.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @function UnitY
                 * @type Microsoft.Xna.Framework.Vector4
                 */
                UnitY: {
                    get: function () {
                        return Microsoft.Xna.Framework.Vector4.unitY.$clone();
                    }
                },
                /**
                 * Returns a {@link } with components 0, 0, 1, 0.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @function UnitZ
                 * @type Microsoft.Xna.Framework.Vector4
                 */
                UnitZ: {
                    get: function () {
                        return Microsoft.Xna.Framework.Vector4.unitZ.$clone();
                    }
                },
                /**
                 * Returns a {@link } with components 0, 0, 0, 1.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @function UnitW
                 * @type Microsoft.Xna.Framework.Vector4
                 */
                UnitW: {
                    get: function () {
                        return Microsoft.Xna.Framework.Vector4.unitW.$clone();
                    }
                }
            },
            ctors: {
                init: function () {
                    this.zero = new Microsoft.Xna.Framework.Vector4();
                    this.one = new Microsoft.Xna.Framework.Vector4();
                    this.unitX = new Microsoft.Xna.Framework.Vector4();
                    this.unitY = new Microsoft.Xna.Framework.Vector4();
                    this.unitZ = new Microsoft.Xna.Framework.Vector4();
                    this.unitW = new Microsoft.Xna.Framework.Vector4();
                    this.one = new Microsoft.Xna.Framework.Vector4.$ctor4(1.0, 1.0, 1.0, 1.0);
                    this.unitX = new Microsoft.Xna.Framework.Vector4.$ctor4(1.0, 0.0, 0.0, 0.0);
                    this.unitY = new Microsoft.Xna.Framework.Vector4.$ctor4(0.0, 1.0, 0.0, 0.0);
                    this.unitZ = new Microsoft.Xna.Framework.Vector4.$ctor4(0.0, 0.0, 1.0, 0.0);
                    this.unitW = new Microsoft.Xna.Framework.Vector4.$ctor4(0.0, 0.0, 0.0, 1.0);
                }
            },
            methods: {
                /**
                 * Performs vector addition on <b /> and <b />.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    The first vector to add.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    The second vector to add.
                 * @return  {Microsoft.Xna.Framework.Vector4}              The result of the vector addition.
                 */
                Add: function (value1, value2) {
                    value1.X += value2.X;
                    value1.Y += value2.Y;
                    value1.Z += value2.Z;
                    value1.W += value2.W;
                    return value1.$clone();
                },
                /**
                 * Performs vector addition on <b /> and
                 <b />, storing the result of the
                 addition in <b />.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    The first vector to add.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    The second vector to add.
                 * @param   {Microsoft.Xna.Framework.Vector4}    result    The result of the vector addition.
                 * @return  {void}
                 */
                Add$1: function (value1, value2, result) {
                    result.v.X = value1.v.X + value2.v.X;
                    result.v.Y = value1.v.Y + value2.v.Y;
                    result.v.Z = value1.v.Z + value2.v.Z;
                    result.v.W = value1.v.W + value2.v.W;
                },
                /**
                 * Creates a new {@link } that contains the cartesian coordinates of a vector specified in barycentric coordinates and relative to 4d-triangle.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1     The first vector of 4d-triangle.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2     The second vector of 4d-triangle.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value3     The third vector of 4d-triangle.
                 * @param   {number}                             amount1    Barycentric scalar <pre><code>b2</code></pre> which represents a weighting factor towards second vector of 4d-triangle.
                 * @param   {number}                             amount2    Barycentric scalar <pre><code>b3</code></pre> which represents a weighting factor towards third vector of 4d-triangle.
                 * @return  {Microsoft.Xna.Framework.Vector4}               The cartesian translation of barycentric coordinates.
                 */
                Barycentric: function (value1, value2, value3, amount1, amount2) {
                    return new Microsoft.Xna.Framework.Vector4.$ctor4(Microsoft.Xna.Framework.MathHelper.Barycentric(value1.X, value2.X, value3.X, amount1, amount2), Microsoft.Xna.Framework.MathHelper.Barycentric(value1.Y, value2.Y, value3.Y, amount1, amount2), Microsoft.Xna.Framework.MathHelper.Barycentric(value1.Z, value2.Z, value3.Z, amount1, amount2), Microsoft.Xna.Framework.MathHelper.Barycentric(value1.W, value2.W, value3.W, amount1, amount2));
                },
                /**
                 * Creates a new {@link } that contains the cartesian coordinates of a vector specified in barycentric coordinates and relative to 4d-triangle.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1     The first vector of 4d-triangle.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2     The second vector of 4d-triangle.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value3     The third vector of 4d-triangle.
                 * @param   {number}                             amount1    Barycentric scalar <pre><code>b2</code></pre> which represents a weighting factor towards second vector of 4d-triangle.
                 * @param   {number}                             amount2    Barycentric scalar <pre><code>b3</code></pre> which represents a weighting factor towards third vector of 4d-triangle.
                 * @param   {Microsoft.Xna.Framework.Vector4}    result     The cartesian translation of barycentric coordinates as an output parameter.
                 * @return  {void}
                 */
                Barycentric$1: function (value1, value2, value3, amount1, amount2, result) {
                    result.v.X = Microsoft.Xna.Framework.MathHelper.Barycentric(value1.v.X, value2.v.X, value3.v.X, amount1, amount2);
                    result.v.Y = Microsoft.Xna.Framework.MathHelper.Barycentric(value1.v.Y, value2.v.Y, value3.v.Y, amount1, amount2);
                    result.v.Z = Microsoft.Xna.Framework.MathHelper.Barycentric(value1.v.Z, value2.v.Z, value3.v.Z, amount1, amount2);
                    result.v.W = Microsoft.Xna.Framework.MathHelper.Barycentric(value1.v.W, value2.v.W, value3.v.W, amount1, amount2);
                },
                /**
                 * Creates a new {@link } that contains CatmullRom interpolation of the specified vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    The first vector in interpolation.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    The second vector in interpolation.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value3    The third vector in interpolation.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value4    The fourth vector in interpolation.
                 * @param   {number}                             amount    Weighting factor.
                 * @return  {Microsoft.Xna.Framework.Vector4}              The result of CatmullRom interpolation.
                 */
                CatmullRom: function (value1, value2, value3, value4, amount) {
                    return new Microsoft.Xna.Framework.Vector4.$ctor4(Microsoft.Xna.Framework.MathHelper.CatmullRom(value1.X, value2.X, value3.X, value4.X, amount), Microsoft.Xna.Framework.MathHelper.CatmullRom(value1.Y, value2.Y, value3.Y, value4.Y, amount), Microsoft.Xna.Framework.MathHelper.CatmullRom(value1.Z, value2.Z, value3.Z, value4.Z, amount), Microsoft.Xna.Framework.MathHelper.CatmullRom(value1.W, value2.W, value3.W, value4.W, amount));
                },
                /**
                 * Creates a new {@link } that contains CatmullRom interpolation of the specified vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    The first vector in interpolation.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    The second vector in interpolation.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value3    The third vector in interpolation.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value4    The fourth vector in interpolation.
                 * @param   {number}                             amount    Weighting factor.
                 * @param   {Microsoft.Xna.Framework.Vector4}    result    The result of CatmullRom interpolation as an output parameter.
                 * @return  {void}
                 */
                CatmullRom$1: function (value1, value2, value3, value4, amount, result) {
                    result.v.X = Microsoft.Xna.Framework.MathHelper.CatmullRom(value1.v.X, value2.v.X, value3.v.X, value4.v.X, amount);
                    result.v.Y = Microsoft.Xna.Framework.MathHelper.CatmullRom(value1.v.Y, value2.v.Y, value3.v.Y, value4.v.Y, amount);
                    result.v.Z = Microsoft.Xna.Framework.MathHelper.CatmullRom(value1.v.Z, value2.v.Z, value3.v.Z, value4.v.Z, amount);
                    result.v.W = Microsoft.Xna.Framework.MathHelper.CatmullRom(value1.v.W, value2.v.W, value3.v.W, value4.v.W, amount);
                },
                /**
                 * Clamps the specified value within a range.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    The value to clamp.
                 * @param   {Microsoft.Xna.Framework.Vector4}    min       The min value.
                 * @param   {Microsoft.Xna.Framework.Vector4}    max       The max value.
                 * @return  {Microsoft.Xna.Framework.Vector4}              The clamped value.
                 */
                Clamp: function (value1, min, max) {
                    return new Microsoft.Xna.Framework.Vector4.$ctor4(Microsoft.Xna.Framework.MathHelper.Clamp$1(value1.X, min.X, max.X), Microsoft.Xna.Framework.MathHelper.Clamp$1(value1.Y, min.Y, max.Y), Microsoft.Xna.Framework.MathHelper.Clamp$1(value1.Z, min.Z, max.Z), Microsoft.Xna.Framework.MathHelper.Clamp$1(value1.W, min.W, max.W));
                },
                /**
                 * Clamps the specified value within a range.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    The value to clamp.
                 * @param   {Microsoft.Xna.Framework.Vector4}    min       The min value.
                 * @param   {Microsoft.Xna.Framework.Vector4}    max       The max value.
                 * @param   {Microsoft.Xna.Framework.Vector4}    result    The clamped value as an output parameter.
                 * @return  {void}
                 */
                Clamp$1: function (value1, min, max, result) {
                    result.v.X = Microsoft.Xna.Framework.MathHelper.Clamp$1(value1.v.X, min.v.X, max.v.X);
                    result.v.Y = Microsoft.Xna.Framework.MathHelper.Clamp$1(value1.v.Y, min.v.Y, max.v.Y);
                    result.v.Z = Microsoft.Xna.Framework.MathHelper.Clamp$1(value1.v.Z, min.v.Z, max.v.Z);
                    result.v.W = Microsoft.Xna.Framework.MathHelper.Clamp$1(value1.v.W, min.v.W, max.v.W);
                },
                /**
                 * Returns the distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    The second vector.
                 * @return  {number}                                       The distance between two vectors.
                 */
                Distance: function (value1, value2) {
                    return Math.sqrt(Microsoft.Xna.Framework.Vector4.DistanceSquared(value1.$clone(), value2.$clone()));
                },
                /**
                 * Returns the distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    The second vector.
                 * @param   {System.Single}                      result    The distance between two vectors as an output parameter.
                 * @return  {void}
                 */
                Distance$1: function (value1, value2, result) {
                    result.v = Math.sqrt(Microsoft.Xna.Framework.Vector4.DistanceSquared(value1.v.$clone(), value2.v.$clone()));
                },
                /**
                 * Returns the squared distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    The second vector.
                 * @return  {number}                                       The squared distance between two vectors.
                 */
                DistanceSquared: function (value1, value2) {
                    return (value1.W - value2.W) * (value1.W - value2.W) + (value1.X - value2.X) * (value1.X - value2.X) + (value1.Y - value2.Y) * (value1.Y - value2.Y) + (value1.Z - value2.Z) * (value1.Z - value2.Z);
                },
                /**
                 * Returns the squared distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    The second vector.
                 * @param   {System.Single}                      result    The squared distance between two vectors as an output parameter.
                 * @return  {void}
                 */
                DistanceSquared$1: function (value1, value2, result) {
                    result.v = (value1.v.W - value2.v.W) * (value1.v.W - value2.v.W) + (value1.v.X - value2.v.X) * (value1.v.X - value2.v.X) + (value1.v.Y - value2.v.Y) * (value1.v.Y - value2.v.Y) + (value1.v.Z - value2.v.Z) * (value1.v.Z - value2.v.Z);
                },
                /**
                 * Divides the components of a {@link } by the components of another {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    Divisor {@link }.
                 * @return  {Microsoft.Xna.Framework.Vector4}              The result of dividing the vectors.
                 */
                Divide: function (value1, value2) {
                    value1.W /= value2.W;
                    value1.X /= value2.X;
                    value1.Y /= value2.Y;
                    value1.Z /= value2.Z;
                    return value1.$clone();
                },
                /**
                 * Divides the components of a {@link } by a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1     Source {@link }.
                 * @param   {number}                             divider    Divisor scalar.
                 * @return  {Microsoft.Xna.Framework.Vector4}               The result of dividing a vector by a scalar.
                 */
                Divide$1: function (value1, divider) {
                    var factor = 1.0 / divider;
                    value1.W *= factor;
                    value1.X *= factor;
                    value1.Y *= factor;
                    value1.Z *= factor;
                    return value1.$clone();
                },
                /**
                 * Divides the components of a {@link } by a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1     Source {@link }.
                 * @param   {number}                             divider    Divisor scalar.
                 * @param   {Microsoft.Xna.Framework.Vector4}    result     The result of dividing a vector by a scalar as an output parameter.
                 * @return  {void}
                 */
                Divide$3: function (value1, divider, result) {
                    var factor = 1.0 / divider;
                    result.v.W = value1.v.W * factor;
                    result.v.X = value1.v.X * factor;
                    result.v.Y = value1.v.Y * factor;
                    result.v.Z = value1.v.Z * factor;
                },
                /**
                 * Divides the components of a {@link } by the components of another {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    Divisor {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector4}    result    The result of dividing the vectors as an output parameter.
                 * @return  {void}
                 */
                Divide$2: function (value1, value2, result) {
                    result.v.W = value1.v.W / value2.v.W;
                    result.v.X = value1.v.X / value2.v.X;
                    result.v.Y = value1.v.Y / value2.v.Y;
                    result.v.Z = value1.v.Z / value2.v.Z;
                },
                /**
                 * Returns a dot product of two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    The second vector.
                 * @return  {number}                                       The dot product of two vectors.
                 */
                Dot: function (value1, value2) {
                    return value1.X * value2.X + value1.Y * value2.Y + value1.Z * value2.Z + value1.W * value2.W;
                },
                /**
                 * Returns a dot product of two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    The second vector.
                 * @param   {System.Single}                      result    The dot product of two vectors as an output parameter.
                 * @return  {void}
                 */
                Dot$1: function (value1, value2, result) {
                    result.v = value1.v.X * value2.v.X + value1.v.Y * value2.v.Y + value1.v.Z * value2.v.Z + value1.v.W * value2.v.W;
                },
                /**
                 * Creates a new {@link } that contains hermite spline interpolation.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1      The first position vector.
                 * @param   {Microsoft.Xna.Framework.Vector4}    tangent1    The first tangent vector.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2      The second position vector.
                 * @param   {Microsoft.Xna.Framework.Vector4}    tangent2    The second tangent vector.
                 * @param   {number}                             amount      Weighting factor.
                 * @return  {Microsoft.Xna.Framework.Vector4}                The hermite spline interpolation vector.
                 */
                Hermite: function (value1, tangent1, value2, tangent2, amount) {
                    return new Microsoft.Xna.Framework.Vector4.$ctor4(Microsoft.Xna.Framework.MathHelper.Hermite(value1.X, tangent1.X, value2.X, tangent2.X, amount), Microsoft.Xna.Framework.MathHelper.Hermite(value1.Y, tangent1.Y, value2.Y, tangent2.Y, amount), Microsoft.Xna.Framework.MathHelper.Hermite(value1.Z, tangent1.Z, value2.Z, tangent2.Z, amount), Microsoft.Xna.Framework.MathHelper.Hermite(value1.W, tangent1.W, value2.W, tangent2.W, amount));
                },
                /**
                 * Creates a new {@link } that contains hermite spline interpolation.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1      The first position vector.
                 * @param   {Microsoft.Xna.Framework.Vector4}    tangent1    The first tangent vector.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2      The second position vector.
                 * @param   {Microsoft.Xna.Framework.Vector4}    tangent2    The second tangent vector.
                 * @param   {number}                             amount      Weighting factor.
                 * @param   {Microsoft.Xna.Framework.Vector4}    result      The hermite spline interpolation vector as an output parameter.
                 * @return  {void}
                 */
                Hermite$1: function (value1, tangent1, value2, tangent2, amount, result) {
                    result.v.W = Microsoft.Xna.Framework.MathHelper.Hermite(value1.v.W, tangent1.v.W, value2.v.W, tangent2.v.W, amount);
                    result.v.X = Microsoft.Xna.Framework.MathHelper.Hermite(value1.v.X, tangent1.v.X, value2.v.X, tangent2.v.X, amount);
                    result.v.Y = Microsoft.Xna.Framework.MathHelper.Hermite(value1.v.Y, tangent1.v.Y, value2.v.Y, tangent2.v.Y, amount);
                    result.v.Z = Microsoft.Xna.Framework.MathHelper.Hermite(value1.v.Z, tangent1.v.Z, value2.v.Z, tangent2.v.Z, amount);
                },
                /**
                 * Creates a new {@link } that contains linear interpolation of the specified vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    The second vector.
                 * @param   {number}                             amount    Weighting value(between 0.0 and 1.0).
                 * @return  {Microsoft.Xna.Framework.Vector4}              The result of linear interpolation of the specified vectors.
                 */
                Lerp: function (value1, value2, amount) {
                    return new Microsoft.Xna.Framework.Vector4.$ctor4(Microsoft.Xna.Framework.MathHelper.Lerp(value1.X, value2.X, amount), Microsoft.Xna.Framework.MathHelper.Lerp(value1.Y, value2.Y, amount), Microsoft.Xna.Framework.MathHelper.Lerp(value1.Z, value2.Z, amount), Microsoft.Xna.Framework.MathHelper.Lerp(value1.W, value2.W, amount));
                },
                /**
                 * Creates a new {@link } that contains linear interpolation of the specified vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    The second vector.
                 * @param   {number}                             amount    Weighting value(between 0.0 and 1.0).
                 * @param   {Microsoft.Xna.Framework.Vector4}    result    The result of linear interpolation of the specified vectors as an output parameter.
                 * @return  {void}
                 */
                Lerp$1: function (value1, value2, amount, result) {
                    result.v.X = Microsoft.Xna.Framework.MathHelper.Lerp(value1.v.X, value2.v.X, amount);
                    result.v.Y = Microsoft.Xna.Framework.MathHelper.Lerp(value1.v.Y, value2.v.Y, amount);
                    result.v.Z = Microsoft.Xna.Framework.MathHelper.Lerp(value1.v.Z, value2.v.Z, amount);
                    result.v.W = Microsoft.Xna.Framework.MathHelper.Lerp(value1.v.W, value2.v.W, amount);
                },
                /**
                 * Creates a new {@link } that contains linear interpolation of the specified vectors.
                 Uses {@link } on MathHelper for the interpolation.
                 Less efficient but more precise compared to {@link }.
                 See remarks section of {@link } on MathHelper for more info.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    The second vector.
                 * @param   {number}                             amount    Weighting value(between 0.0 and 1.0).
                 * @return  {Microsoft.Xna.Framework.Vector4}              The result of linear interpolation of the specified vectors.
                 */
                LerpPrecise: function (value1, value2, amount) {
                    return new Microsoft.Xna.Framework.Vector4.$ctor4(Microsoft.Xna.Framework.MathHelper.LerpPrecise(value1.X, value2.X, amount), Microsoft.Xna.Framework.MathHelper.LerpPrecise(value1.Y, value2.Y, amount), Microsoft.Xna.Framework.MathHelper.LerpPrecise(value1.Z, value2.Z, amount), Microsoft.Xna.Framework.MathHelper.LerpPrecise(value1.W, value2.W, amount));
                },
                /**
                 * Creates a new {@link } that contains linear interpolation of the specified vectors.
                 Uses {@link } on MathHelper for the interpolation.
                 Less efficient but more precise compared to {@link }.
                 See remarks section of {@link } on MathHelper for more info.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    The second vector.
                 * @param   {number}                             amount    Weighting value(between 0.0 and 1.0).
                 * @param   {Microsoft.Xna.Framework.Vector4}    result    The result of linear interpolation of the specified vectors as an output parameter.
                 * @return  {void}
                 */
                LerpPrecise$1: function (value1, value2, amount, result) {
                    result.v.X = Microsoft.Xna.Framework.MathHelper.LerpPrecise(value1.v.X, value2.v.X, amount);
                    result.v.Y = Microsoft.Xna.Framework.MathHelper.LerpPrecise(value1.v.Y, value2.v.Y, amount);
                    result.v.Z = Microsoft.Xna.Framework.MathHelper.LerpPrecise(value1.v.Z, value2.v.Z, amount);
                    result.v.W = Microsoft.Xna.Framework.MathHelper.LerpPrecise(value1.v.W, value2.v.W, amount);
                },
                /**
                 * Creates a new {@link } that contains a maximal values from the two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    The second vector.
                 * @return  {Microsoft.Xna.Framework.Vector4}              The {@link } with maximal values from the two vectors.
                 */
                Max: function (value1, value2) {
                    return new Microsoft.Xna.Framework.Vector4.$ctor4(Microsoft.Xna.Framework.MathHelper.Max$1(value1.X, value2.X), Microsoft.Xna.Framework.MathHelper.Max$1(value1.Y, value2.Y), Microsoft.Xna.Framework.MathHelper.Max$1(value1.Z, value2.Z), Microsoft.Xna.Framework.MathHelper.Max$1(value1.W, value2.W));
                },
                /**
                 * Creates a new {@link } that contains a maximal values from the two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    The second vector.
                 * @param   {Microsoft.Xna.Framework.Vector4}    result    The {@link } with maximal values from the two vectors as an output parameter.
                 * @return  {void}
                 */
                Max$1: function (value1, value2, result) {
                    result.v.X = Microsoft.Xna.Framework.MathHelper.Max$1(value1.v.X, value2.v.X);
                    result.v.Y = Microsoft.Xna.Framework.MathHelper.Max$1(value1.v.Y, value2.v.Y);
                    result.v.Z = Microsoft.Xna.Framework.MathHelper.Max$1(value1.v.Z, value2.v.Z);
                    result.v.W = Microsoft.Xna.Framework.MathHelper.Max$1(value1.v.W, value2.v.W);
                },
                /**
                 * Creates a new {@link } that contains a minimal values from the two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    The second vector.
                 * @return  {Microsoft.Xna.Framework.Vector4}              The {@link } with minimal values from the two vectors.
                 */
                Min: function (value1, value2) {
                    return new Microsoft.Xna.Framework.Vector4.$ctor4(Microsoft.Xna.Framework.MathHelper.Min$1(value1.X, value2.X), Microsoft.Xna.Framework.MathHelper.Min$1(value1.Y, value2.Y), Microsoft.Xna.Framework.MathHelper.Min$1(value1.Z, value2.Z), Microsoft.Xna.Framework.MathHelper.Min$1(value1.W, value2.W));
                },
                /**
                 * Creates a new {@link } that contains a minimal values from the two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    The first vector.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    The second vector.
                 * @param   {Microsoft.Xna.Framework.Vector4}    result    The {@link } with minimal values from the two vectors as an output parameter.
                 * @return  {void}
                 */
                Min$1: function (value1, value2, result) {
                    result.v.X = Microsoft.Xna.Framework.MathHelper.Min$1(value1.v.X, value2.v.X);
                    result.v.Y = Microsoft.Xna.Framework.MathHelper.Min$1(value1.v.Y, value2.v.Y);
                    result.v.Z = Microsoft.Xna.Framework.MathHelper.Min$1(value1.v.Z, value2.v.Z);
                    result.v.W = Microsoft.Xna.Framework.MathHelper.Min$1(value1.v.W, value2.v.W);
                },
                /**
                 * Creates a new {@link } that contains a multiplication of two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    Source {@link }.
                 * @return  {Microsoft.Xna.Framework.Vector4}              The result of the vector multiplication.
                 */
                Multiply: function (value1, value2) {
                    value1.W *= value2.W;
                    value1.X *= value2.X;
                    value1.Y *= value2.Y;
                    value1.Z *= value2.Z;
                    return value1.$clone();
                },
                /**
                 * Creates a new {@link } that contains a multiplication of {@link } and a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1         Source {@link }.
                 * @param   {number}                             scaleFactor    Scalar value.
                 * @return  {Microsoft.Xna.Framework.Vector4}                   The result of the vector multiplication with a scalar.
                 */
                Multiply$1: function (value1, scaleFactor) {
                    value1.W *= scaleFactor;
                    value1.X *= scaleFactor;
                    value1.Y *= scaleFactor;
                    value1.Z *= scaleFactor;
                    return value1.$clone();
                },
                /**
                 * Creates a new {@link } that contains a multiplication of {@link } and a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1         Source {@link }.
                 * @param   {number}                             scaleFactor    Scalar value.
                 * @param   {Microsoft.Xna.Framework.Vector4}    result         The result of the multiplication with a scalar as an output parameter.
                 * @return  {void}
                 */
                Multiply$3: function (value1, scaleFactor, result) {
                    result.v.W = value1.v.W * scaleFactor;
                    result.v.X = value1.v.X * scaleFactor;
                    result.v.Y = value1.v.Y * scaleFactor;
                    result.v.Z = value1.v.Z * scaleFactor;
                },
                /**
                 * Creates a new {@link } that contains a multiplication of two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector4}    result    The result of the vector multiplication as an output parameter.
                 * @return  {void}
                 */
                Multiply$2: function (value1, value2, result) {
                    result.v.W = value1.v.W * value2.v.W;
                    result.v.X = value1.v.X * value2.v.X;
                    result.v.Y = value1.v.Y * value2.v.Y;
                    result.v.Z = value1.v.Z * value2.v.Z;
                },
                /**
                 * Creates a new {@link } that contains the specified vector inversion.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value    Source {@link }.
                 * @return  {Microsoft.Xna.Framework.Vector4}             The result of the vector inversion.
                 */
                Negate: function (value) {
                    value = new Microsoft.Xna.Framework.Vector4.$ctor4(-value.X, -value.Y, -value.Z, -value.W);
                    return value.$clone();
                },
                /**
                 * Creates a new {@link } that contains the specified vector inversion.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value     Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector4}    result    The result of the vector inversion as an output parameter.
                 * @return  {void}
                 */
                Negate$1: function (value, result) {
                    result.v.X = -value.v.X;
                    result.v.Y = -value.v.Y;
                    result.v.Z = -value.v.Z;
                    result.v.W = -value.v.W;
                },
                /**
                 * Creates a new {@link } that contains a normalized values from another vector.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value    Source {@link }.
                 * @return  {Microsoft.Xna.Framework.Vector4}             Unit vector.
                 */
                Normalize: function (value) {
                    var factor = Math.sqrt((value.X * value.X) + (value.Y * value.Y) + (value.Z * value.Z) + (value.W * value.W));
                    factor = 1.0 / factor;
                    return new Microsoft.Xna.Framework.Vector4.$ctor4(value.X * factor, value.Y * factor, value.Z * factor, value.W * factor);
                },
                /**
                 * Creates a new {@link } that contains a normalized values from another vector.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value     Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector4}    result    Unit vector as an output parameter.
                 * @return  {void}
                 */
                Normalize$1: function (value, result) {
                    var factor = Math.sqrt((value.v.X * value.v.X) + (value.v.Y * value.v.Y) + (value.v.Z * value.v.Z) + (value.v.W * value.v.W));
                    factor = 1.0 / factor;
                    result.v.W = value.v.W * factor;
                    result.v.X = value.v.X * factor;
                    result.v.Y = value.v.Y * factor;
                    result.v.Z = value.v.Z * factor;
                },
                /**
                 * Creates a new {@link } that contains cubic interpolation of the specified vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    Source {@link }.
                 * @param   {number}                             amount    Weighting value.
                 * @return  {Microsoft.Xna.Framework.Vector4}              Cubic interpolation of the specified vectors.
                 */
                SmoothStep: function (value1, value2, amount) {
                    return new Microsoft.Xna.Framework.Vector4.$ctor4(Microsoft.Xna.Framework.MathHelper.SmoothStep(value1.X, value2.X, amount), Microsoft.Xna.Framework.MathHelper.SmoothStep(value1.Y, value2.Y, amount), Microsoft.Xna.Framework.MathHelper.SmoothStep(value1.Z, value2.Z, amount), Microsoft.Xna.Framework.MathHelper.SmoothStep(value1.W, value2.W, amount));
                },
                /**
                 * Creates a new {@link } that contains cubic interpolation of the specified vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    Source {@link }.
                 * @param   {number}                             amount    Weighting value.
                 * @param   {Microsoft.Xna.Framework.Vector4}    result    Cubic interpolation of the specified vectors as an output parameter.
                 * @return  {void}
                 */
                SmoothStep$1: function (value1, value2, amount, result) {
                    result.v.X = Microsoft.Xna.Framework.MathHelper.SmoothStep(value1.v.X, value2.v.X, amount);
                    result.v.Y = Microsoft.Xna.Framework.MathHelper.SmoothStep(value1.v.Y, value2.v.Y, amount);
                    result.v.Z = Microsoft.Xna.Framework.MathHelper.SmoothStep(value1.v.Z, value2.v.Z, amount);
                    result.v.W = Microsoft.Xna.Framework.MathHelper.SmoothStep(value1.v.W, value2.v.W, amount);
                },
                /**
                 * Creates a new {@link } that contains subtraction of on {@link } from a another.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    Source {@link }.
                 * @return  {Microsoft.Xna.Framework.Vector4}              The result of the vector subtraction.
                 */
                Subtract: function (value1, value2) {
                    value1.W -= value2.W;
                    value1.X -= value2.X;
                    value1.Y -= value2.Y;
                    value1.Z -= value2.Z;
                    return value1.$clone();
                },
                /**
                 * Creates a new {@link } that contains subtraction of on {@link } from a another.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector4}    result    The result of the vector subtraction as an output parameter.
                 * @return  {void}
                 */
                Subtract$1: function (value1, value2, result) {
                    result.v.W = value1.v.W - value2.v.W;
                    result.v.X = value1.v.X - value2.v.X;
                    result.v.Y = value1.v.Y - value2.v.Y;
                    result.v.Z = value1.v.Z - value2.v.Z;
                },
                /**
                 * Creates a new {@link } that contains a transformation of 2d-vector by the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector2}    value     Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Matrix}     matrix    The transformation {@link }.
                 * @return  {Microsoft.Xna.Framework.Vector4}              Transformed {@link }.
                 */
                Transform: function (value, matrix) {
                    value = {v:value};
                    matrix = {v:matrix};
                    var result = { v : new Microsoft.Xna.Framework.Vector4() };
                    Microsoft.Xna.Framework.Vector4.Transform$6(value, matrix, result);
                    return result.v.$clone();
                },
                /**
                 * Creates a new {@link } that contains a transformation of 2d-vector by the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector2}       value       Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    rotation    The {@link } which contains rotation transformation.
                 * @return  {Microsoft.Xna.Framework.Vector4}                   Transformed {@link }.
                 */
                Transform$1: function (value, rotation) {
                    value = {v:value};
                    rotation = {v:rotation};
                    var result = { v : new Microsoft.Xna.Framework.Vector4() };
                    Microsoft.Xna.Framework.Vector4.Transform$7(value, rotation, result);
                    return result.v.$clone();
                },
                /**
                 * Creates a new {@link } that contains a transformation of 3d-vector by the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector3}    value     Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Matrix}     matrix    The transformation {@link }.
                 * @return  {Microsoft.Xna.Framework.Vector4}              Transformed {@link }.
                 */
                Transform$2: function (value, matrix) {
                    value = {v:value};
                    matrix = {v:matrix};
                    var result = { v : new Microsoft.Xna.Framework.Vector4() };
                    Microsoft.Xna.Framework.Vector4.Transform$8(value, matrix, result);
                    return result.v.$clone();
                },
                /**
                 * Creates a new {@link } that contains a transformation of 3d-vector by the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector3}       value       Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    rotation    The {@link } which contains rotation transformation.
                 * @return  {Microsoft.Xna.Framework.Vector4}                   Transformed {@link }.
                 */
                Transform$3: function (value, rotation) {
                    value = {v:value};
                    rotation = {v:rotation};
                    var result = { v : new Microsoft.Xna.Framework.Vector4() };
                    Microsoft.Xna.Framework.Vector4.Transform$9(value, rotation, result);
                    return result.v.$clone();
                },
                /**
                 * Creates a new {@link } that contains a transformation of 4d-vector by the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value     Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Matrix}     matrix    The transformation {@link }.
                 * @return  {Microsoft.Xna.Framework.Vector4}              Transformed {@link }.
                 */
                Transform$4: function (value, matrix) {
                    value = {v:value};
                    matrix = {v:matrix};
                    Microsoft.Xna.Framework.Vector4.Transform$10(value, matrix, value);
                    return value.v.$clone();
                },
                /**
                 * Creates a new {@link } that contains a transformation of 4d-vector by the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}       value       Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    rotation    The {@link } which contains rotation transformation.
                 * @return  {Microsoft.Xna.Framework.Vector4}                   Transformed {@link }.
                 */
                Transform$5: function (value, rotation) {
                    value = {v:value};
                    rotation = {v:rotation};
                    var result = { v : new Microsoft.Xna.Framework.Vector4() };
                    Microsoft.Xna.Framework.Vector4.Transform$11(value, rotation, result);
                    return result.v.$clone();
                },
                /**
                 * Creates a new {@link } that contains a transformation of 2d-vector by the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector2}    value     Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Matrix}     matrix    The transformation {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector4}    result    Transformed {@link } as an output parameter.
                 * @return  {void}
                 */
                Transform$6: function (value, matrix, result) {
                    result.v.X = (value.v.X * matrix.v.M11) + (value.v.Y * matrix.v.M21) + matrix.v.M41;
                    result.v.Y = (value.v.X * matrix.v.M12) + (value.v.Y * matrix.v.M22) + matrix.v.M42;
                    result.v.Z = (value.v.X * matrix.v.M13) + (value.v.Y * matrix.v.M23) + matrix.v.M43;
                    result.v.W = (value.v.X * matrix.v.M14) + (value.v.Y * matrix.v.M24) + matrix.v.M44;
                },
                /**
                 * Creates a new {@link } that contains a transformation of 2d-vector by the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector2}       value       Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    rotation    The {@link } which contains rotation transformation.
                 * @param   {Microsoft.Xna.Framework.Vector4}       result      Transformed {@link } as an output parameter.
                 * @return  {void}
                 */
                Transform$7: function (value, rotation, result) {
                    throw new System.NotImplementedException.ctor();
                },
                /**
                 * Creates a new {@link } that contains a transformation of 3d-vector by the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector3}    value     Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Matrix}     matrix    The transformation {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector4}    result    Transformed {@link } as an output parameter.
                 * @return  {void}
                 */
                Transform$8: function (value, matrix, result) {
                    result.v.X = (value.v.X * matrix.v.M11) + (value.v.Y * matrix.v.M21) + (value.v.Z * matrix.v.M31) + matrix.v.M41;
                    result.v.Y = (value.v.X * matrix.v.M12) + (value.v.Y * matrix.v.M22) + (value.v.Z * matrix.v.M32) + matrix.v.M42;
                    result.v.Z = (value.v.X * matrix.v.M13) + (value.v.Y * matrix.v.M23) + (value.v.Z * matrix.v.M33) + matrix.v.M43;
                    result.v.W = (value.v.X * matrix.v.M14) + (value.v.Y * matrix.v.M24) + (value.v.Z * matrix.v.M34) + matrix.v.M44;
                },
                /**
                 * Creates a new {@link } that contains a transformation of 3d-vector by the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector3}       value       Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    rotation    The {@link } which contains rotation transformation.
                 * @param   {Microsoft.Xna.Framework.Vector4}       result      Transformed {@link } as an output parameter.
                 * @return  {void}
                 */
                Transform$9: function (value, rotation, result) {
                    throw new System.NotImplementedException.ctor();
                },
                /**
                 * Creates a new {@link } that contains a transformation of 4d-vector by the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value     Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Matrix}     matrix    The transformation {@link }.
                 * @param   {Microsoft.Xna.Framework.Vector4}    result    Transformed {@link } as an output parameter.
                 * @return  {void}
                 */
                Transform$10: function (value, matrix, result) {
                    var x = (value.v.X * matrix.v.M11) + (value.v.Y * matrix.v.M21) + (value.v.Z * matrix.v.M31) + (value.v.W * matrix.v.M41);
                    var y = (value.v.X * matrix.v.M12) + (value.v.Y * matrix.v.M22) + (value.v.Z * matrix.v.M32) + (value.v.W * matrix.v.M42);
                    var z = (value.v.X * matrix.v.M13) + (value.v.Y * matrix.v.M23) + (value.v.Z * matrix.v.M33) + (value.v.W * matrix.v.M43);
                    var w = (value.v.X * matrix.v.M14) + (value.v.Y * matrix.v.M24) + (value.v.Z * matrix.v.M34) + (value.v.W * matrix.v.M44);
                    result.v.X = x;
                    result.v.Y = y;
                    result.v.Z = z;
                    result.v.W = w;
                },
                /**
                 * Creates a new {@link } that contains a transformation of 4d-vector by the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}       value       Source {@link }.
                 * @param   {Microsoft.Xna.Framework.Quaternion}    rotation    The {@link } which contains rotation transformation.
                 * @param   {Microsoft.Xna.Framework.Vector4}       result      Transformed {@link } as an output parameter.
                 * @return  {void}
                 */
                Transform$11: function (value, rotation, result) {
                    throw new System.NotImplementedException.ctor();
                },
                /**
                 * Apply transformation on vectors within array of {@link } by the specified {@link } and places the results in an another array.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Array.<Microsoft.Xna.Framework.Vector4>}    sourceArray         Source array.
                 * @param   {number}                                     sourceIndex         The starting index of transformation in the source array.
                 * @param   {Microsoft.Xna.Framework.Matrix}             matrix              The transformation {@link }.
                 * @param   {Array.<Microsoft.Xna.Framework.Vector4>}    destinationArray    Destination array.
                 * @param   {number}                                     destinationIndex    The starting index in the destination array, where the first {@link } should be written.
                 * @param   {number}                                     length              The number of vectors to be transformed.
                 * @return  {void}
                 */
                Transform$14: function (sourceArray, sourceIndex, matrix, destinationArray, destinationIndex, length) {
                    if (sourceArray == null) {
                        throw new System.ArgumentNullException.$ctor1("sourceArray");
                    }
                    if (destinationArray == null) {
                        throw new System.ArgumentNullException.$ctor1("destinationArray");
                    }
                    if (sourceArray.length < ((sourceIndex + length) | 0)) {
                        throw new System.ArgumentException.$ctor1("Source array length is lesser than sourceIndex + length");
                    }
                    if (destinationArray.length < ((destinationIndex + length) | 0)) {
                        throw new System.ArgumentException.$ctor1("Destination array length is lesser than destinationIndex + length");
                    }

                    for (var i = 0; i < length; i = (i + 1) | 0) {
                        var value = sourceArray[System.Array.index(((sourceIndex + i) | 0), sourceArray)].$clone();
                        destinationArray[System.Array.index(((destinationIndex + i) | 0), destinationArray)] = Microsoft.Xna.Framework.Vector4.Transform$4(value.$clone(), matrix.v.$clone());
                    }
                },
                /**
                 * Apply transformation on vectors within array of {@link } by the specified {@link } and places the results in an another array.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Array.<Microsoft.Xna.Framework.Vector4>}    sourceArray         Source array.
                 * @param   {number}                                     sourceIndex         The starting index of transformation in the source array.
                 * @param   {Microsoft.Xna.Framework.Quaternion}         rotation            The {@link } which contains rotation transformation.
                 * @param   {Array.<Microsoft.Xna.Framework.Vector4>}    destinationArray    Destination array.
                 * @param   {number}                                     destinationIndex    The starting index in the destination array, where the first {@link } should be written.
                 * @param   {number}                                     length              The number of vectors to be transformed.
                 * @return  {void}
                 */
                Transform$15: function (sourceArray, sourceIndex, rotation, destinationArray, destinationIndex, length) {
                    if (sourceArray == null) {
                        throw new System.ArgumentNullException.$ctor1("sourceArray");
                    }
                    if (destinationArray == null) {
                        throw new System.ArgumentNullException.$ctor1("destinationArray");
                    }
                    if (sourceArray.length < ((sourceIndex + length) | 0)) {
                        throw new System.ArgumentException.$ctor1("Source array length is lesser than sourceIndex + length");
                    }
                    if (destinationArray.length < ((destinationIndex + length) | 0)) {
                        throw new System.ArgumentException.$ctor1("Destination array length is lesser than destinationIndex + length");
                    }

                    for (var i = 0; i < length; i = (i + 1) | 0) {
                        var value = sourceArray[System.Array.index(((sourceIndex + i) | 0), sourceArray)].$clone();
                        destinationArray[System.Array.index(((destinationIndex + i) | 0), destinationArray)] = Microsoft.Xna.Framework.Vector4.Transform$5(value.$clone(), rotation.v.$clone());
                    }
                },
                /**
                 * Apply transformation on all vectors within array of {@link } by the specified {@link } and places the results in an another array.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Array.<Microsoft.Xna.Framework.Vector4>}    sourceArray         Source array.
                 * @param   {Microsoft.Xna.Framework.Matrix}             matrix              The transformation {@link }.
                 * @param   {Array.<Microsoft.Xna.Framework.Vector4>}    destinationArray    Destination array.
                 * @return  {void}
                 */
                Transform$12: function (sourceArray, matrix, destinationArray) {
                    if (sourceArray == null) {
                        throw new System.ArgumentNullException.$ctor1("sourceArray");
                    }
                    if (destinationArray == null) {
                        throw new System.ArgumentNullException.$ctor1("destinationArray");
                    }
                    if (destinationArray.length < sourceArray.length) {
                        throw new System.ArgumentException.$ctor1("Destination array length is lesser than source array length");
                    }

                    for (var i = 0; i < sourceArray.length; i = (i + 1) | 0) {
                        var value = sourceArray[System.Array.index(i, sourceArray)].$clone();
                        destinationArray[System.Array.index(i, destinationArray)] = Microsoft.Xna.Framework.Vector4.Transform$4(value.$clone(), matrix.v.$clone());
                    }
                },
                /**
                 * Apply transformation on all vectors within array of {@link } by the specified {@link } and places the results in an another array.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Array.<Microsoft.Xna.Framework.Vector4>}    sourceArray         Source array.
                 * @param   {Microsoft.Xna.Framework.Quaternion}         rotation            The {@link } which contains rotation transformation.
                 * @param   {Array.<Microsoft.Xna.Framework.Vector4>}    destinationArray    Destination array.
                 * @return  {void}
                 */
                Transform$13: function (sourceArray, rotation, destinationArray) {
                    if (sourceArray == null) {
                        throw new System.ArgumentNullException.$ctor1("sourceArray");
                    }
                    if (destinationArray == null) {
                        throw new System.ArgumentNullException.$ctor1("destinationArray");
                    }
                    if (destinationArray.length < sourceArray.length) {
                        throw new System.ArgumentException.$ctor1("Destination array length is lesser than source array length");
                    }

                    for (var i = 0; i < sourceArray.length; i = (i + 1) | 0) {
                        var value = sourceArray[System.Array.index(i, sourceArray)].$clone();
                        destinationArray[System.Array.index(i, destinationArray)] = Microsoft.Xna.Framework.Vector4.Transform$5(value.$clone(), rotation.v.$clone());
                    }
                }/**
                 * Inverts values in the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value    Source {@link } on the right of the sub sign.
                 * @return  {Microsoft.Xna.Framework.Vector4}             Result of the inversion.
                 */
                ,
                op_UnaryNegation: function (value) {
                    return new Microsoft.Xna.Framework.Vector4.$ctor4(-value.X, -value.Y, -value.Z, -value.W);
                }/**
                 * Compares whether two {@link } instances are equal.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    {@link } instance on the left of the equal sign.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    {@link } instance on the right of the equal sign.
                 * @return  {boolean}                                      <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
                 */
                ,
                op_Equality: function (value1, value2) {
                    return value1.W === value2.W && value1.X === value2.X && value1.Y === value2.Y && value1.Z === value2.Z;
                }/**
                 * Compares whether two {@link } instances are not equal.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    {@link } instance on the left of the not equal sign.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    {@link } instance on the right of the not equal sign.
                 * @return  {boolean}                                      <pre><code>true</code></pre> if the instances are not equal; <pre><code>false</code></pre> otherwise.
                 */
                ,
                op_Inequality: function (value1, value2) {
                    return !(Microsoft.Xna.Framework.Vector4.op_Equality(value1.$clone(), value2.$clone()));
                }/**
                 * Adds two vectors.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    Source {@link } on the left of the add sign.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    Source {@link } on the right of the add sign.
                 * @return  {Microsoft.Xna.Framework.Vector4}              Sum of the vectors.
                 */
                ,
                op_Addition: function (value1, value2) {
                    value1.W += value2.W;
                    value1.X += value2.X;
                    value1.Y += value2.Y;
                    value1.Z += value2.Z;
                    return value1.$clone();
                }/**
                 * Subtracts a {@link } from a {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    Source {@link } on the left of the sub sign.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    Source {@link } on the right of the sub sign.
                 * @return  {Microsoft.Xna.Framework.Vector4}              Result of the vector subtraction.
                 */
                ,
                op_Subtraction: function (value1, value2) {
                    value1.W -= value2.W;
                    value1.X -= value2.X;
                    value1.Y -= value2.Y;
                    value1.Z -= value2.Z;
                    return value1.$clone();
                }/**
                 * Multiplies the components of two vectors by each other.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    Source {@link } on the left of the mul sign.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    Source {@link } on the right of the mul sign.
                 * @return  {Microsoft.Xna.Framework.Vector4}              Result of the vector multiplication.
                 */
                ,
                op_Multiply: function (value1, value2) {
                    value1.W *= value2.W;
                    value1.X *= value2.X;
                    value1.Y *= value2.Y;
                    value1.Z *= value2.Z;
                    return value1.$clone();
                }/**
                 * Multiplies the components of vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value          Source {@link } on the left of the mul sign.
                 * @param   {number}                             scaleFactor    Scalar value on the right of the mul sign.
                 * @return  {Microsoft.Xna.Framework.Vector4}                   Result of the vector multiplication with a scalar.
                 */
                ,
                op_Multiply$1: function (value, scaleFactor) {
                    value.W *= scaleFactor;
                    value.X *= scaleFactor;
                    value.Y *= scaleFactor;
                    value.Z *= scaleFactor;
                    return value.$clone();
                }/**
                 * Multiplies the components of vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {number}                             scaleFactor    Scalar value on the left of the mul sign.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value          Source {@link } on the right of the mul sign.
                 * @return  {Microsoft.Xna.Framework.Vector4}                   Result of the vector multiplication with a scalar.
                 */
                ,
                op_Multiply$2: function (scaleFactor, value) {
                    value.W *= scaleFactor;
                    value.X *= scaleFactor;
                    value.Y *= scaleFactor;
                    value.Z *= scaleFactor;
                    return value.$clone();
                }/**
                 * Divides the components of a {@link } by the components of another {@link }.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1    Source {@link } on the left of the div sign.
                 * @param   {Microsoft.Xna.Framework.Vector4}    value2    Divisor {@link } on the right of the div sign.
                 * @return  {Microsoft.Xna.Framework.Vector4}              The result of dividing the vectors.
                 */
                ,
                op_Division: function (value1, value2) {
                    value1.W /= value2.W;
                    value1.X /= value2.X;
                    value1.Y /= value2.Y;
                    value1.Z /= value2.Z;
                    return value1.$clone();
                }/**
                 * Divides the components of a {@link } by a scalar.
                 *
                 * @static
                 * @public
                 * @this Microsoft.Xna.Framework.Vector4
                 * @memberof Microsoft.Xna.Framework.Vector4
                 * @param   {Microsoft.Xna.Framework.Vector4}    value1     Source {@link } on the left of the div sign.
                 * @param   {number}                             divider    Divisor scalar on the right of the div sign.
                 * @return  {Microsoft.Xna.Framework.Vector4}               The result of dividing a vector by a scalar.
                 */
                ,
                op_Division$1: function (value1, divider) {
                    var factor = 1.0 / divider;
                    value1.W *= factor;
                    value1.X *= factor;
                    value1.Y *= factor;
                    value1.Z *= factor;
                    return value1.$clone();
                },
                getDefaultValue: function () { return new Microsoft.Xna.Framework.Vector4(); }
            }
        },
        fields: {
            /**
             * The x coordinate of this {@link }.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Vector4
             * @type number
             */
            X: 0,
            /**
             * The y coordinate of this {@link }.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Vector4
             * @type number
             */
            Y: 0,
            /**
             * The z coordinate of this {@link }.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Vector4
             * @type number
             */
            Z: 0,
            /**
             * The w coordinate of this {@link }.
             *
             * @instance
             * @public
             * @memberof Microsoft.Xna.Framework.Vector4
             * @type number
             */
            W: 0
        },
        props: {
            DebugDisplayString: {
                get: function () {
                    return System.String.concat([System.Single.format(this.X), "  ", System.Single.format(this.Y), "  ", System.Single.format(this.Z), "  ", System.Single.format(this.W)]);
                }
            }
        },
        alias: ["equalsT", "System$IEquatable$1$Microsoft$Xna$Framework$Vector4$equalsT"],
        ctors: {
            /**
             * Constructs a 3d vector with X, Y, Z and W from four values.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Vector4
             * @memberof Microsoft.Xna.Framework.Vector4
             * @param   {number}    x    The x coordinate in 4d-space.
             * @param   {number}    y    The y coordinate in 4d-space.
             * @param   {number}    z    The z coordinate in 4d-space.
             * @param   {number}    w    The w coordinate in 4d-space.
             * @return  {void}
             */
            $ctor4: function (x, y, z, w) {
                this.$initialize();
                this.X = x;
                this.Y = y;
                this.Z = z;
                this.W = w;
            },
            /**
             * Constructs a 3d vector with X and Z from {@link } and Z and W from the scalars.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Vector4
             * @memberof Microsoft.Xna.Framework.Vector4
             * @param   {Microsoft.Xna.Framework.Vector2}    value    The x and y coordinates in 4d-space.
             * @param   {number}                             z        The z coordinate in 4d-space.
             * @param   {number}                             w        The w coordinate in 4d-space.
             * @return  {void}
             */
            $ctor1: function (value, z, w) {
                this.$initialize();
                this.X = value.X;
                this.Y = value.Y;
                this.Z = z;
                this.W = w;
            },
            /**
             * Constructs a 3d vector with X, Y, Z from {@link } and W from a scalar.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Vector4
             * @memberof Microsoft.Xna.Framework.Vector4
             * @param   {Microsoft.Xna.Framework.Vector3}    value    The x, y and z coordinates in 4d-space.
             * @param   {number}                             w        The w coordinate in 4d-space.
             * @return  {void}
             */
            $ctor2: function (value, w) {
                this.$initialize();
                this.X = value.X;
                this.Y = value.Y;
                this.Z = value.Z;
                this.W = w;
            },
            /**
             * Constructs a 4d vector with X, Y, Z and W set to the same value.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Vector4
             * @memberof Microsoft.Xna.Framework.Vector4
             * @param   {number}    value    The x, y, z and w coordinates in 4d-space.
             * @return  {void}
             */
            $ctor3: function (value) {
                this.$initialize();
                this.X = value;
                this.Y = value;
                this.Z = value;
                this.W = value;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Compares whether current instance is equal to specified {@link }.
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.Vector4
             * @memberof Microsoft.Xna.Framework.Vector4
             * @param   {System.Object}    obj    The {@link } to compare.
             * @return  {boolean}                 <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
             */
            equals: function (obj) {
                return (Bridge.is(obj, Microsoft.Xna.Framework.Vector4)) ? Microsoft.Xna.Framework.Vector4.op_Equality(this, System.Nullable.getValue(Bridge.cast(Bridge.unbox(obj, Microsoft.Xna.Framework.Vector4), Microsoft.Xna.Framework.Vector4))) : false;
            },
            /**
             * Compares whether current instance is equal to specified {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Vector4
             * @memberof Microsoft.Xna.Framework.Vector4
             * @param   {Microsoft.Xna.Framework.Vector4}    other    The {@link } to compare.
             * @return  {boolean}                                     <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
             */
            equalsT: function (other) {
                return this.W === other.W && this.X === other.X && this.Y === other.Y && this.Z === other.Z;
            },
            /**
             * Gets the hash code of this {@link }.
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.Vector4
             * @memberof Microsoft.Xna.Framework.Vector4
             * @return  {number}        Hash code of this {@link }.
             */
            getHashCode: function () {
                var hashCode = System.Single.getHashCode(this.W);
                hashCode = (Bridge.Int.mul(hashCode, 397)) ^ System.Single.getHashCode(this.X);
                hashCode = (Bridge.Int.mul(hashCode, 397)) ^ System.Single.getHashCode(this.Y);
                hashCode = (Bridge.Int.mul(hashCode, 397)) ^ System.Single.getHashCode(this.Z);
                return hashCode;
            },
            /**
             * Returns the length of this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Vector4
             * @memberof Microsoft.Xna.Framework.Vector4
             * @return  {number}        The length of this {@link }.
             */
            Length: function () {
                return Math.sqrt((this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z) + (this.W * this.W));
            },
            /**
             * Returns the squared length of this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Vector4
             * @memberof Microsoft.Xna.Framework.Vector4
             * @return  {number}        The squared length of this {@link }.
             */
            LengthSquared: function () {
                return (this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z) + (this.W * this.W);
            },
            /**
             * Turns this {@link } to a unit vector with the same direction.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Vector4
             * @memberof Microsoft.Xna.Framework.Vector4
             * @return  {void}
             */
            Normalize: function () {
                var factor = Math.sqrt((this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z) + (this.W * this.W));
                factor = 1.0 / factor;
                this.X *= factor;
                this.Y *= factor;
                this.Z *= factor;
                this.W *= factor;
            },
            /**
             * Returns a {@link } representation of this {@link } in the format:
             {X:[{@link }] Y:[{@link }] Z:[{@link }] W:[{@link }]}
             *
             * @instance
             * @public
             * @override
             * @this Microsoft.Xna.Framework.Vector4
             * @memberof Microsoft.Xna.Framework.Vector4
             * @return  {string}        A {@link } representation of this {@link }.
             */
            toString: function () {
                return "{X:" + System.Single.format(this.X) + " Y:" + System.Single.format(this.Y) + " Z:" + System.Single.format(this.Z) + " W:" + System.Single.format(this.W) + "}";
            },
            /**
             * Deconstruction method for {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Vector4
             * @memberof Microsoft.Xna.Framework.Vector4
             * @param   {System.Single}    x    
             * @param   {System.Single}    y    
             * @param   {System.Single}    z    
             * @param   {System.Single}    w
             * @return  {void}
             */
            Deconstruct: function (x, y, z, w) {
                x.v = this.X;
                y.v = this.Y;
                z.v = this.Z;
                w.v = this.W;
            },
            $clone: function (to) {
                var s = to || new Microsoft.Xna.Framework.Vector4();
                s.X = this.X;
                s.Y = this.Y;
                s.Z = this.Z;
                s.W = this.W;
                return s;
            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.WebAudioHelper", {
        statics: {
            methods: {
                Init: function () {
                    var script = document.createElement("script");
                    script.innerHTML = "function BufferLoader(context, urlList, callback) {\r\n    this.context = context;\r\n    this.urlList = urlList;\r\n    this.onload = callback;\r\n    this.bufferList = new Array();\r\n    this.loadCount = 0;\r\n}\r\n\r\nBufferLoader.prototype.loadBuffer = function (url, index) {\r\n    // Load buffer asynchronously\r\n    var request = new XMLHttpRequest();\r\n    request.open('GET', url, true);\r\n    request.responseType = 'arraybuffer';\r\n\r\n    var loader = this;\r\n\r\n    request.onload = function () {\r\n        // Asynchronously decode the audio file data in request.response\r\n        loader.context.decodeAudioData(\r\n            request.response,\r\n            function (buffer) {\r\n                if (!buffer) {\r\n                    alert('error decoding file data: ' + url);\r\n                    return;\r\n                }\r\n                loader.bufferList[index] = buffer;\r\n                if (++loader.loadCount == loader.urlList.length)\r\n                    loader.onload(loader.bufferList);\r\n            },\r\n            function (error) {\r\n                console.error('decodeAudioData error', error);\r\n            }\r\n        );\r\n    }\r\n\r\n    request.onerror = function () {\r\n        alert('BufferLoader: XHR error');\r\n    }\r\n\r\n    request.send();\r\n}\r\n\r\nBufferLoader.prototype.load = function () {\r\n    for (var i = 0; i < this.urlList.length; ++i)\r\n        this.loadBuffer(this.urlList[i], i);\r\n}\r\n\r\nfunction AudioContextManager() {\r\n    this.context = null;\r\n    this.bufferLoader = null;\r\n    this.bufferList = null;\r\n    this.loop = false;\r\n}\r\n\r\nAudioContextManager.prototype.load = function (src, callback) {\r\n    window.AudioContext = window.AudioContext || window.webkitAudioContext;\r\n    if (window.AudioContext) {\r\n        this.context = new AudioContext();\r\n        var that = this;\r\n        bufferLoader = new BufferLoader(\r\n            this.context,\r\n            [\r\n                src\r\n            ],\r\n            finishedLoading = function (list) {\r\n                that.bufferList = list;\r\n                callback();\r\n            }\r\n        );\r\n\r\n        bufferLoader.load();\r\n    } else {\r\n        callback();\r\n    }\r\n}\r\n\r\nAudioContextManager.prototype.play = function () {\r\n    if (window.AudioContext) {\r\n        var source = this.context.createBufferSource();\r\n        source.buffer = this.bufferList[0];\r\n        source.loop = this.loop;\r\n        source.connect(this.context.destination);\r\n        source.start(0);\r\n    }\r\n}\r\n\r\nvar audioContexts = [];\r\n\r\nfunction playAllAudios() {\r\n    for (var i = 0; i < audioContexts.length; i++) {\r\n        audioContexts[i].play();\r\n    }\r\n}\r\n\r\nfunction addAudioContext() {\r\n    audioContexts.push(new AudioContextManager());\r\n    return audioContexts.length - 1;\r\n}\r\n\r\nfunction removeAllAudioContexts() {\r\n    audioContexts = [];\r\n}";
                    document.body.appendChild(script);
                },
                Activate: function () {
                    playAllAudios();
                }
            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.Audio.SoundEffect", {
        inherits: [Microsoft.Xna.Framework.Content.Loadable],
        fields: {
            Index: 0,
            Loaded: false
        },
        ctors: {
            init: function () {
                this.Loaded = false;
            },
            ctor: function () {
                this.$initialize();
                Microsoft.Xna.Framework.Content.Loadable.ctor.call(this);
                this.Index = addAudioContext();
            }
        },
        methods: {
            Play: function () {
                var index = this.Index;
                audioContexts[index].play();
            },
            Load: function (src, d) {
                var index = this.Index;
                audioContexts[index].load(src, d);
            }
        }
    });

    /**
     * The collection of the {@link } elements and a part of the {@link } class.
     *
     * @public
     * @class Microsoft.Xna.Framework.CurveKeyCollection
     * @implements  System.Collections.Generic.ICollection$1
     */
    Bridge.define("Microsoft.Xna.Framework.CurveKeyCollection", {
        inherits: [System.Collections.Generic.ICollection$1(Microsoft.Xna.Framework.CurveKey)],
        fields: {
            _keys: null
        },
        props: {
            /**
             * Returns the count of keys in this collection.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.CurveKeyCollection
             * @function Count
             * @type number
             */
            Count: {
                get: function () {
                    return this._keys.Count;
                }
            },
            /**
             * Returns false because it is not a read-only collection.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.CurveKeyCollection
             * @function IsReadOnly
             * @type boolean
             */
            IsReadOnly: {
                get: function () {
                    return false;
                }
            }
        },
        alias: [
            "Count", "System$Collections$Generic$ICollection$1$Microsoft$Xna$Framework$CurveKey$Count",
            "IsReadOnly", "System$Collections$Generic$ICollection$1$Microsoft$Xna$Framework$CurveKey$IsReadOnly",
            "add", "System$Collections$Generic$ICollection$1$Microsoft$Xna$Framework$CurveKey$add",
            "clear", "System$Collections$Generic$ICollection$1$Microsoft$Xna$Framework$CurveKey$clear",
            "contains", "System$Collections$Generic$ICollection$1$Microsoft$Xna$Framework$CurveKey$contains",
            "copyTo", "System$Collections$Generic$ICollection$1$Microsoft$Xna$Framework$CurveKey$copyTo",
            "GetEnumerator", ["System$Collections$Generic$IEnumerable$1$Microsoft$Xna$Framework$CurveKey$GetEnumerator", "System$Collections$Generic$IEnumerable$1$GetEnumerator"],
            "remove", "System$Collections$Generic$ICollection$1$Microsoft$Xna$Framework$CurveKey$remove"
        ],
        ctors: {
            /**
             * Creates a new instance of {@link } class.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.CurveKeyCollection
             * @memberof Microsoft.Xna.Framework.CurveKeyCollection
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                this._keys = new (System.Collections.Generic.List$1(Microsoft.Xna.Framework.CurveKey)).ctor();
            }
        },
        methods: {
            /**
             * Indexer.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.CurveKeyCollection
             * @memberof Microsoft.Xna.Framework.CurveKeyCollection
             * @param   {number}                              index    The index of key in this collection.
             * @return  {Microsoft.Xna.Framework.CurveKey}             {@link } at <b /> position.
             */
            getItem: function (index) {
                return this._keys.getItem(index);
            },
            /**
             * Indexer.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.CurveKeyCollection
             * @memberof Microsoft.Xna.Framework.CurveKeyCollection
             * @param   {number}                              index    The index of key in this collection.
             * @param   {Microsoft.Xna.Framework.CurveKey}    value
             * @return  {void}                                         {@link } at <b /> position.
             */
            setItem: function (index, value) {
                if (Microsoft.Xna.Framework.CurveKey.op_Equality(value, null)) {
                    throw new System.ArgumentNullException.ctor();
                }

                if (index >= this._keys.Count) {
                    throw new System.IndexOutOfRangeException.ctor();
                }

                if (this._keys.getItem(index).Position === value.Position) {
                    this._keys.setItem(index, value);
                } else {
                    this._keys.removeAt(index);
                    this._keys.add(value);
                }
            },
            System$Collections$IEnumerable$GetEnumerator: function () {
                return this._keys.GetEnumerator().$clone();
            },
            /**
             * Returns an enumerator that iterates through the collection.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.CurveKeyCollection
             * @memberof Microsoft.Xna.Framework.CurveKeyCollection
             * @return  {System.Collections.Generic.IEnumerator$1}        An enumerator for the {@link }.
             */
            GetEnumerator: function () {
                return this._keys.GetEnumerator().$clone();
            },
            /**
             * Adds a key to this collection.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.CurveKeyCollection
             * @memberof Microsoft.Xna.Framework.CurveKeyCollection
             * @throws Throws if <b /> is null.
             * @param   {Microsoft.Xna.Framework.CurveKey}    item    New key for the collection.
             * @return  {void}
             */
            add: function (item) {
                if (Microsoft.Xna.Framework.CurveKey.op_Equality(item, null)) {
                    throw new System.ArgumentNullException.$ctor1("item");
                }

                if (this._keys.Count === 0) {
                    this._keys.add(item);
                    return;
                }

                for (var i = 0; i < this._keys.Count; i = (i + 1) | 0) {
                    if (item.Position < this._keys.getItem(i).Position) {
                        this._keys.insert(i, item);
                        return;
                    }
                }

                this._keys.add(item);
            },
            /**
             * Removes all keys from this collection.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.CurveKeyCollection
             * @memberof Microsoft.Xna.Framework.CurveKeyCollection
             * @return  {void}
             */
            clear: function () {
                this._keys.clear();
            },
            /**
             * Creates a copy of this collection.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.CurveKeyCollection
             * @memberof Microsoft.Xna.Framework.CurveKeyCollection
             * @return  {Microsoft.Xna.Framework.CurveKeyCollection}        A copy of this collection.
             */
            Clone: function () {
                var $t;
                var ckc = new Microsoft.Xna.Framework.CurveKeyCollection();
                $t = Bridge.getEnumerator(this._keys);
                try {
                    while ($t.moveNext()) {
                        var key = $t.Current;
                        ckc.add(key);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }return ckc;
            },
            /**
             * Determines whether this collection contains a specific key.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.CurveKeyCollection
             * @memberof Microsoft.Xna.Framework.CurveKeyCollection
             * @param   {Microsoft.Xna.Framework.CurveKey}    item    The key to locate in this collection.
             * @return  {boolean}                                     <pre><code>true</code></pre> if the key is found; <pre><code>false</code></pre> otherwise.
             */
            contains: function (item) {
                return this._keys.contains(item);
            },
            /**
             * Copies the keys of this collection to an array, starting at the array index provided.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.CurveKeyCollection
             * @memberof Microsoft.Xna.Framework.CurveKeyCollection
             * @param   {Array.<Microsoft.Xna.Framework.CurveKey>}    array         Destination array where elements will be copied.
             * @param   {number}                                      arrayIndex    The zero-based index in the array to start copying from.
             * @return  {void}
             */
            copyTo: function (array, arrayIndex) {
                this._keys.copyTo(array, arrayIndex);
            },
            /**
             * Finds element in the collection and returns its index.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.CurveKeyCollection
             * @memberof Microsoft.Xna.Framework.CurveKeyCollection
             * @param   {Microsoft.Xna.Framework.CurveKey}    item    Element for the search.
             * @return  {number}                                      Index of the element; or -1 if item is not found.
             */
            IndexOf: function (item) {
                return this._keys.indexOf(item);
            },
            /**
             * Removes element at the specified index.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.CurveKeyCollection
             * @memberof Microsoft.Xna.Framework.CurveKeyCollection
             * @param   {number}    index    The index which element will be removed.
             * @return  {void}
             */
            RemoveAt: function (index) {
                this._keys.removeAt(index);
            },
            /**
             * Removes specific element.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.CurveKeyCollection
             * @memberof Microsoft.Xna.Framework.CurveKeyCollection
             * @param   {Microsoft.Xna.Framework.CurveKey}    item    The element
             * @return  {boolean}                                     <pre><code>true</code></pre> if item is successfully removed; <pre><code>false</code></pre> otherwise. This method also returns <pre><code>false</code></pre> if item was not found.
             */
            remove: function (item) {
                return this._keys.remove(item);
            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.GameComponent", {
        inherits: function () { return [Microsoft.Xna.Framework.IGameComponent,System.IComparable$1(Microsoft.Xna.Framework.GameComponent),System.IDisposable]; },
        fields: {
            _enabled: false,
            _updateOrder: 0,
            Game: null
        },
        events: {
            EnabledChanged: null,
            UpdateOrderChanged: null
        },
        props: {
            Enabled: {
                get: function () {
                    return this._enabled;
                },
                set: function (value) {
                    if (this._enabled !== value) {
                        this._enabled = value;
                        this.OnEnabledChanged(this, { });
                    }
                }
            },
            UpdateOrder: {
                get: function () {
                    return this._updateOrder;
                },
                set: function (value) {
                    if (this._updateOrder !== value) {
                        this._updateOrder = value;
                        this.OnUpdateOrderChanged(this, { });
                    }
                }
            }
        },
        alias: [
            "Initialize", "Microsoft$Xna$Framework$IGameComponent$Initialize",
            "Dispose", "System$IDisposable$Dispose",
            "compareTo", ["System$IComparable$1$Microsoft$Xna$Framework$GameComponent$compareTo", "System$IComparable$1$compareTo"]
        ],
        ctors: {
            init: function () {
                this._enabled = true;
            },
            ctor: function (game) {
                this.$initialize();
                this.Game = game;
            }
        },
        methods: {
            Initialize: function () { },
            Update: function (gameTime) { },
            OnUpdateOrderChanged: function (sender, args) {
                Microsoft.Xna.Framework.EventHelpers.Raise$1(Bridge.global.System.Object, this, this.UpdateOrderChanged, args);
            },
            OnEnabledChanged: function (sender, args) {
                Microsoft.Xna.Framework.EventHelpers.Raise$1(Bridge.global.System.Object, this, this.EnabledChanged, args);
            },
            /**
             * Shuts down the component.
             *
             * @instance
             * @protected
             * @this Microsoft.Xna.Framework.GameComponent
             * @memberof Microsoft.Xna.Framework.GameComponent
             * @param   {boolean}    disposing
             * @return  {void}
             */
            Dispose$1: function (disposing) { },
            /**
             * Shuts down the component.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.GameComponent
             * @memberof Microsoft.Xna.Framework.GameComponent
             * @return  {void}
             */
            Dispose: function () {
                this.Dispose$1(true);
            },
            compareTo: function (other) {
                return ((other.UpdateOrder - this.UpdateOrder) | 0);
            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.GameComponentCollection", {
        inherits: [System.Collections.ObjectModel.Collection$1(Microsoft.Xna.Framework.IGameComponent)],
        events: {
            /**
             * Event that is triggered when a {@link } is added
             to this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.GameComponentCollection
             * @memberof Microsoft.Xna.Framework.GameComponentCollection
             * @function addComponentAdded
             * @param   {System.EventHandler}    value
             * @return  {void}
             */
            /**
             * Event that is triggered when a {@link } is added
             to this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.GameComponentCollection
             * @memberof Microsoft.Xna.Framework.GameComponentCollection
             * @function removeComponentAdded
             * @param   {System.EventHandler}    value
             * @return  {void}
             */
            ComponentAdded: null,
            /**
             * Event that is triggered when a {@link } is removed
             from this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.GameComponentCollection
             * @memberof Microsoft.Xna.Framework.GameComponentCollection
             * @function addComponentRemoved
             * @param   {System.EventHandler}    value
             * @return  {void}
             */
            /**
             * Event that is triggered when a {@link } is removed
             from this {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.GameComponentCollection
             * @memberof Microsoft.Xna.Framework.GameComponentCollection
             * @function removeComponentRemoved
             * @param   {System.EventHandler}    value
             * @return  {void}
             */
            ComponentRemoved: null
        },
        methods: {
            /**
             * Removes every {@link } from this {@link }.
             Triggers {@link } once for each {@link } removed.
             *
             * @instance
             * @protected
             * @override
             * @this Microsoft.Xna.Framework.GameComponentCollection
             * @memberof Microsoft.Xna.Framework.GameComponentCollection
             * @return  {void}
             */
            ClearItems: function () {
                for (var i = 0; i < this.Count; i = (i + 1) | 0) {
                    this.OnComponentRemoved(new Microsoft.Xna.Framework.GameComponentCollectionEventArgs(this.getItem.call(this, i)));
                }
                System.Collections.ObjectModel.Collection$1(Microsoft.Xna.Framework.IGameComponent).prototype.ClearItems.call(this);
            },
            InsertItem: function (index, item) {
                if (this.indexOf(item) !== -1) {
                    throw new System.ArgumentException.$ctor1("Cannot Add Same Component Multiple Times");
                }
                System.Collections.ObjectModel.Collection$1(Microsoft.Xna.Framework.IGameComponent).prototype.InsertItem.call(this, index, item);
                if (item != null) {
                    this.OnComponentAdded(new Microsoft.Xna.Framework.GameComponentCollectionEventArgs(item));
                }
            },
            OnComponentAdded: function (eventArgs) {
                Microsoft.Xna.Framework.EventHelpers.Raise$1(Bridge.global.Microsoft.Xna.Framework.GameComponentCollectionEventArgs, this, this.ComponentAdded, eventArgs);
            },
            OnComponentRemoved: function (eventArgs) {
                Microsoft.Xna.Framework.EventHelpers.Raise$1(Bridge.global.Microsoft.Xna.Framework.GameComponentCollectionEventArgs, this, this.ComponentRemoved, eventArgs);
            },
            RemoveItem: function (index) {
                var gameComponent = this.getItem.call(this, index);
                System.Collections.ObjectModel.Collection$1(Microsoft.Xna.Framework.IGameComponent).prototype.RemoveItem.call(this, index);
                if (gameComponent != null) {
                    this.OnComponentRemoved(new Microsoft.Xna.Framework.GameComponentCollectionEventArgs(gameComponent));
                }
            },
            SetItem: function (index, item) {
                throw new System.NotSupportedException.ctor();
            }
        }
    });

    /**
     * Built-in effect that supports optional texturing, vertex coloring, fog, and lighting.
     *
     * @public
     * @class Microsoft.Xna.Framework.Graphics.BasicEffect
     * @augments Microsoft.Xna.Framework.Graphics.Effect
     */
    Bridge.define("Microsoft.Xna.Framework.Graphics.BasicEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        fields: {
            VertexColorEnabled: false,
            TextureEnabled: false,
            Texture: null
        },
        ctors: {
            ctor: function (device) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, device);
            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.Graphics.GraphicsResource", {
        inherits: [Microsoft.Xna.Framework.Content.Loadable,System.IDisposable],
        fields: {
            disposed: false,
            graphicsDevice: null,
            Tag: null
        },
        events: {
            Disposing: null
        },
        props: {
            GraphicsDevice: {
                get: function () {
                    return this.graphicsDevice;
                },
                set: function (value) {
                    this.graphicsDevice = value;
                }
            },
            IsDisposed: {
                get: function () {
                    return this.disposed;
                }
            }
        },
        alias: ["Dispose", "System$IDisposable$Dispose"],
        ctors: {
            ctor: function () {
                this.$initialize();
                Microsoft.Xna.Framework.Content.Loadable.ctor.call(this);

            }
        },
        methods: {
            /**
             * Called before the device is reset. Allows graphics resources to 
             invalidate their state so they can be recreated after the device reset.
             Warning: This may be called after a call to Dispose() up until
             the resource is garbage collected.
             *
             * @instance
             * @this Microsoft.Xna.Framework.Graphics.GraphicsResource
             * @memberof Microsoft.Xna.Framework.Graphics.GraphicsResource
             * @return  {void}
             */
            GraphicsDeviceResetting: function () {

            },
            Dispose: function () {
                this.Dispose$1(true);
            },
            /**
             * The method that derived classes should override to implement disposing of managed and native resources.
             *
             * @instance
             * @protected
             * @this Microsoft.Xna.Framework.Graphics.GraphicsResource
             * @memberof Microsoft.Xna.Framework.Graphics.GraphicsResource
             * @param   {boolean}    disposing    True if managed objects should be disposed.
             * @return  {void}
             */
            Dispose$1: function (disposing) { },
            toString: function () {
                return System.String.isNullOrEmpty(this.Name) ? Bridge.toString(this) : this.Name;
            }
        }
    });

    /**
     * Provides state information for a touch screen enabled device.
     *
     * @public
     * @class Microsoft.Xna.Framework.Input.Touch.TouchCollection
     * @implements  System.Collections.Generic.IList$1
     */
    Bridge.define("Microsoft.Xna.Framework.Input.Touch.TouchCollection", {
        inherits: [System.Collections.Generic.IList$1(Microsoft.Xna.Framework.Input.Touch.TouchLocation)],
        $kind: "struct",
        statics: {
            fields: {
                EmptyLocationArray: null,
                Empty: null
            },
            ctors: {
                init: function () {
                    this.Empty = new Microsoft.Xna.Framework.Input.Touch.TouchCollection();
                    this.EmptyLocationArray = System.Array.init(0, function (){
                        return new Microsoft.Xna.Framework.Input.Touch.TouchLocation();
                    }, Microsoft.Xna.Framework.Input.Touch.TouchLocation);
                    this.Empty = new Microsoft.Xna.Framework.Input.Touch.TouchCollection.$ctor1(Microsoft.Xna.Framework.Input.Touch.TouchCollection.EmptyLocationArray);
                }
            },
            methods: {
                getDefaultValue: function () { return new Microsoft.Xna.Framework.Input.Touch.TouchCollection(); }
            }
        },
        fields: {
            _collection: null
        },
        props: {
            Collection: {
                get: function () {
                    return this._collection || Microsoft.Xna.Framework.Input.Touch.TouchCollection.EmptyLocationArray;
                }
            },
            /**
             * States if touch collection is read only.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @function IsReadOnly
             * @type boolean
             */
            IsReadOnly: {
                get: function () {
                    return true;
                }
            },
            /**
             * Returns the number of {@link } items that exist in the collection.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @function Count
             * @type number
             */
            Count: {
                get: function () {
                    return this.Collection.length;
                }
            }
        },
        alias: [
            "IsReadOnly", "System$Collections$Generic$ICollection$1$Microsoft$Xna$Framework$Input$Touch$TouchLocation$IsReadOnly",
            "indexOf", "System$Collections$Generic$IList$1$Microsoft$Xna$Framework$Input$Touch$TouchLocation$indexOf",
            "insert", "System$Collections$Generic$IList$1$Microsoft$Xna$Framework$Input$Touch$TouchLocation$insert",
            "removeAt", "System$Collections$Generic$IList$1$Microsoft$Xna$Framework$Input$Touch$TouchLocation$removeAt",
            "getItem", "System$Collections$Generic$IList$1$Microsoft$Xna$Framework$Input$Touch$TouchLocation$getItem",
            "setItem", "System$Collections$Generic$IList$1$Microsoft$Xna$Framework$Input$Touch$TouchLocation$setItem",
            "add", "System$Collections$Generic$ICollection$1$Microsoft$Xna$Framework$Input$Touch$TouchLocation$add",
            "clear", "System$Collections$Generic$ICollection$1$Microsoft$Xna$Framework$Input$Touch$TouchLocation$clear",
            "contains", "System$Collections$Generic$ICollection$1$Microsoft$Xna$Framework$Input$Touch$TouchLocation$contains",
            "copyTo", "System$Collections$Generic$ICollection$1$Microsoft$Xna$Framework$Input$Touch$TouchLocation$copyTo",
            "Count", "System$Collections$Generic$ICollection$1$Microsoft$Xna$Framework$Input$Touch$TouchLocation$Count",
            "remove", "System$Collections$Generic$ICollection$1$Microsoft$Xna$Framework$Input$Touch$TouchLocation$remove",
            "System$Collections$Generic$IEnumerable$1$Microsoft$Xna$Framework$Input$Touch$TouchLocation$GetEnumerator", "System$Collections$Generic$IEnumerable$1$GetEnumerator"
        ],
        ctors: {
            /**
             * Initializes a new instance of the {@link } with a pre-determined set of touch locations.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @memberof Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @param   {Array.<Microsoft.Xna.Framework.Input.Touch.TouchLocation>}    touches    Array of {@link } items to initialize with.
             * @return  {void}
             */
            $ctor1: function (touches) {
                this.$initialize();
                if (touches == null) {
                    throw new System.ArgumentNullException.$ctor1("touches");
                }

                this._collection = touches;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Gets or sets the item at the specified index of the collection.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @memberof Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @param   {number}                                               index    Position of the item.
             * @return  {Microsoft.Xna.Framework.Input.Touch.TouchLocation}             {@link }
             */
            getItem: function (index) {
                var $t;
                return ($t = this.Collection)[System.Array.index(index, $t)].$clone();
            },
            /**
             * Gets or sets the item at the specified index of the collection.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @memberof Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @param   {number}                                               index    Position of the item.
             * @param   {Microsoft.Xna.Framework.Input.Touch.TouchLocation}    value
             * @return  {void}                                                          {@link }
             */
            setItem: function (index, value) {
                throw new System.NotSupportedException.ctor();
            },
            /**
             * Returns {@link } specified by ID.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @memberof Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @param   {number}                                               id               
             * @param   {Microsoft.Xna.Framework.Input.Touch.TouchLocation}    touchLocation
             * @return  {boolean}
             */
            FindById: function (id, touchLocation) {
                var $t;
                for (var i = 0; i < this.Collection.length; i = (i + 1) | 0) {
                    var location = ($t = this.Collection)[System.Array.index(i, $t)].$clone();
                    if (location.Id === id) {
                        touchLocation.v = location.$clone();
                        return true;
                    }
                }

                touchLocation.v = Bridge.getDefaultValue(Microsoft.Xna.Framework.Input.Touch.TouchLocation);
                return false;
            },
            /**
             * Returns the index of the first occurrence of specified {@link } item in the collection.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @memberof Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @param   {Microsoft.Xna.Framework.Input.Touch.TouchLocation}    item    {@link } to query.
             * @return  {number}
             */
            indexOf: function (item) {
                var $t;
                for (var i = 0; i < this.Collection.length; i = (i + 1) | 0) {
                    if (Microsoft.Xna.Framework.Input.Touch.TouchLocation.op_Equality(item.$clone(), ($t = this.Collection)[System.Array.index(i, $t)].$clone())) {
                        return i;
                    }
                }

                return -1;
            },
            /**
             * Inserts a {@link } item into the indicated position.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @memberof Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @param   {number}                                               index    The position to insert into.
             * @param   {Microsoft.Xna.Framework.Input.Touch.TouchLocation}    item     The {@link } item to insert.
             * @return  {void}
             */
            insert: function (index, item) {
                throw new System.NotSupportedException.ctor();
            },
            /**
             * Removes the {@link } item at specified index.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @memberof Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @param   {number}    index    Index of the item that will be removed from collection.
             * @return  {void}
             */
            removeAt: function (index) {
                throw new System.NotSupportedException.ctor();
            },
            /**
             * Adds a {@link } to the collection.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @memberof Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @param   {Microsoft.Xna.Framework.Input.Touch.TouchLocation}    item    The {@link } item to be added.
             * @return  {void}
             */
            add: function (item) {
                throw new System.NotSupportedException.ctor();
            },
            /**
             * Clears all the items in collection.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @memberof Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @return  {void}
             */
            clear: function () {
                throw new System.NotSupportedException.ctor();
            },
            /**
             * Returns true if specified {@link } item exists in the collection, false otherwise./&gt;
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @memberof Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @param   {Microsoft.Xna.Framework.Input.Touch.TouchLocation}    item    The {@link } item to query for.
             * @return  {boolean}                                                      Returns true if queried item is found, false otherwise.
             */
            contains: function (item) {
                var $t;
                for (var i = 0; i < this.Collection.length; i = (i + 1) | 0) {
                    if (Microsoft.Xna.Framework.Input.Touch.TouchLocation.op_Equality(item.$clone(), ($t = this.Collection)[System.Array.index(i, $t)].$clone())) {
                        return true;
                    }
                }

                return false;
            },
            /**
             * Copies the {@link }collection to specified array starting from the given index.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @memberof Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @param   {Array.<Microsoft.Xna.Framework.Input.Touch.TouchLocation>}    array         The array to copy {@link } items.
             * @param   {number}                                                       arrayIndex    The starting index of the copy operation.
             * @return  {void}
             */
            copyTo: function (array, arrayIndex) {
                var $t;
                ($t = this.Collection, System.Array.copy($t, 0, array, arrayIndex, $t.length));
            },
            /**
             * Removes the specified {@link } item from the collection.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @memberof Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @param   {Microsoft.Xna.Framework.Input.Touch.TouchLocation}    item    The {@link } item to remove.
             * @return  {boolean}
             */
            remove: function (item) {
                throw new System.NotSupportedException.ctor();
            },
            /**
             * Returns an enumerator for the {@link }.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @memberof Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @return  {Microsoft.Xna.Framework.Input.Touch.TouchCollection.Enumerator}        Enumerable list of {@link } objects.
             */
            GetEnumerator: function () {
                return new Microsoft.Xna.Framework.Input.Touch.TouchCollection.Enumerator.$ctor1(this);
            },
            /**
             * Returns an enumerator for the {@link }.
             *
             * @instance
             * @this Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @memberof Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @return  {System.Collections.Generic.IEnumerator$1}        Enumerable list of {@link } objects.
             */
            System$Collections$Generic$IEnumerable$1$Microsoft$Xna$Framework$Input$Touch$TouchLocation$GetEnumerator: function () {
                return new Microsoft.Xna.Framework.Input.Touch.TouchCollection.Enumerator.$ctor1(this).$clone();
            },
            /**
             * Returns an enumerator for the {@link }.
             *
             * @instance
             * @this Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @memberof Microsoft.Xna.Framework.Input.Touch.TouchCollection
             * @return  {System.Collections.IEnumerator}        Enumerable list of objects.
             */
            System$Collections$IEnumerable$GetEnumerator: function () {
                return new Microsoft.Xna.Framework.Input.Touch.TouchCollection.Enumerator.$ctor1(this).$clone();
            },
            getHashCode: function () {
                var h = Bridge.addHash([5447780241, this._collection]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Microsoft.Xna.Framework.Input.Touch.TouchCollection)) {
                    return false;
                }
                return Bridge.equals(this._collection, o._collection);
            },
            $clone: function (to) {
                var s = to || new Microsoft.Xna.Framework.Input.Touch.TouchCollection();
                s._collection = this._collection;
                return s;
            }
        }
    });

    /**
     * Provides the ability to iterate through the TouchLocations in an TouchCollection.
     *
     * @public
     * @class Microsoft.Xna.Framework.Input.Touch.TouchCollection.Enumerator
     * @implements  System.Collections.Generic.IEnumerator$1
     */
    Bridge.define("Microsoft.Xna.Framework.Input.Touch.TouchCollection.Enumerator", {
        inherits: [System.Collections.Generic.IEnumerator$1(Microsoft.Xna.Framework.Input.Touch.TouchLocation)],
        $kind: "nested struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new Microsoft.Xna.Framework.Input.Touch.TouchCollection.Enumerator(); }
            }
        },
        fields: {
            _collection: null,
            _position: 0
        },
        props: {
            /**
             * Gets the current element in the TouchCollection.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Microsoft.Xna.Framework.Input.Touch.TouchCollection.Enumerator
             * @function Current
             * @type Microsoft.Xna.Framework.Input.Touch.TouchLocation
             */
            Current: {
                get: function () {
                    return this._collection.getItem(this._position).$clone();
                }
            },
            System$Collections$IEnumerator$Current: {
                get: function () {
                    return this._collection.getItem(this._position).$clone();
                }
            }
        },
        alias: [
            "Current", ["System$Collections$Generic$IEnumerator$1$Microsoft$Xna$Framework$Input$Touch$TouchLocation$Current$1", "System$Collections$Generic$IEnumerator$1$Current$1"],
            "moveNext", "System$Collections$IEnumerator$moveNext",
            "Dispose", "System$IDisposable$Dispose",
            "reset", "System$Collections$IEnumerator$reset"
        ],
        ctors: {
            init: function () {
                this._collection = new Microsoft.Xna.Framework.Input.Touch.TouchCollection();
            },
            $ctor1: function (collection) {
                this.$initialize();
                this._collection = collection;
                this._position = -1;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Advances the enumerator to the next element of the TouchCollection.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Input.Touch.TouchCollection.Enumerator
             * @memberof Microsoft.Xna.Framework.Input.Touch.TouchCollection.Enumerator
             * @return  {boolean}
             */
            moveNext: function () {
                this._position = (this._position + 1) | 0;
                return (this._position < this._collection.Count);
            },
            /**
             * Immediately releases the unmanaged resources used by this object.
             *
             * @instance
             * @public
             * @this Microsoft.Xna.Framework.Input.Touch.TouchCollection.Enumerator
             * @memberof Microsoft.Xna.Framework.Input.Touch.TouchCollection.Enumerator
             * @return  {void}
             */
            Dispose: function () { },
            reset: function () {
                this._position = -1;
            },
            getHashCode: function () {
                var h = Bridge.addHash([3788985113, this._collection, this._position]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Microsoft.Xna.Framework.Input.Touch.TouchCollection.Enumerator)) {
                    return false;
                }
                return Bridge.equals(this._collection, o._collection) && Bridge.equals(this._position, o._position);
            },
            $clone: function (to) {
                var s = to || new Microsoft.Xna.Framework.Input.Touch.TouchCollection.Enumerator();
                s._collection = this._collection;
                s._position = this._position;
                return s;
            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.DrawableGameComponent", {
        inherits: [Microsoft.Xna.Framework.GameComponent,Microsoft.Xna.Framework.IDrawable],
        fields: {
            _initialized: false,
            _drawOrder: 0,
            _visible: false
        },
        events: {
            DrawOrderChanged: null,
            VisibleChanged: null
        },
        props: {
            GraphicsDevice: {
                get: function () {
                    return this.Game.GraphicsDevice;
                }
            },
            DrawOrder: {
                get: function () {
                    return this._drawOrder;
                },
                set: function (value) {
                    if (this._drawOrder !== value) {
                        this._drawOrder = value;
                        this.OnDrawOrderChanged(this, { });
                    }
                }
            },
            Visible: {
                get: function () {
                    return this._visible;
                },
                set: function (value) {
                    if (this._visible !== value) {
                        this._visible = value;
                        this.OnVisibleChanged(this, { });
                    }
                }
            }
        },
        alias: [
            "DrawOrder", "Microsoft$Xna$Framework$IDrawable$DrawOrder",
            "Visible", "Microsoft$Xna$Framework$IDrawable$Visible",
            "addDrawOrderChanged", "Microsoft$Xna$Framework$IDrawable$addDrawOrderChanged",
            "removeDrawOrderChanged", "Microsoft$Xna$Framework$IDrawable$removeDrawOrderChanged",
            "addVisibleChanged", "Microsoft$Xna$Framework$IDrawable$addVisibleChanged",
            "removeVisibleChanged", "Microsoft$Xna$Framework$IDrawable$removeVisibleChanged",
            "Initialize", "Microsoft$Xna$Framework$IGameComponent$Initialize",
            "Draw", "Microsoft$Xna$Framework$IDrawable$Draw"
        ],
        ctors: {
            init: function () {
                this._visible = true;
            },
            ctor: function (game) {
                this.$initialize();
                Microsoft.Xna.Framework.GameComponent.ctor.call(this, game);
            }
        },
        methods: {
            Initialize: function () {
                if (!this._initialized) {
                    this._initialized = true;
                    this.LoadContent();
                }
            },
            LoadContent: function () { },
            UnloadContent: function () { },
            Draw: function (gameTime) { },
            OnVisibleChanged: function (sender, args) {
                Microsoft.Xna.Framework.EventHelpers.Raise$1(Bridge.global.System.Object, this, this.VisibleChanged, args);
            },
            OnDrawOrderChanged: function (sender, args) {
                Microsoft.Xna.Framework.EventHelpers.Raise$1(Bridge.global.System.Object, this, this.DrawOrderChanged, args);
            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.Graphics.Texture2D", {
        inherits: [Microsoft.Xna.Framework.Graphics.GraphicsResource],
        fields: {
            Width: 0,
            Height: 0,
            image: null
        },
        props: {
            Image: {
                get: function () {
                    return this.image;
                },
                set: function (value) {
                    this.image = value;
                    this.Width = this.image.naturalWidth;
                    this.Height = this.image.naturalHeight;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.GraphicsResource.ctor.call(this);

            },
            $ctor1: function (graphicsDevice, width, height) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.GraphicsResource.ctor.call(this);

            }
        },
        methods: {
            GetData: function (T, data) {

            },
            SetData: function (color) {

            }
        }
    });

    Bridge.define("Microsoft.Xna.Framework.Media.Song", {
        inherits: [Microsoft.Xna.Framework.Audio.SoundEffect],
        methods: {
            SetLoop: function (loop) {
                var index = this.Index;
                audioContexts[index].loop = loop;
            },
            Suspend: function () {
                var index = this.Index;
                audioContexts[index].suspend();
            },
            Resume: function () {
                var index = this.Index;
                audioContexts[index].resume();
            }
        }
    });
});
