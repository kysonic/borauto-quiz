import type { Entity } from 'aframe';
import type * as THREET from 'three';
import { AssertType } from '@/types/common';
import { ARoundedComponent } from './type';

function roundedRect(
    ctx: THREET.Shape,
    x: number,
    y: number,
    width: number,
    height: number,
    topLeftRadius: number,
    topRightRadius: number,
    bottomLeftRadius: number,
    bottomRightRadius: number,
) {
    if (!topLeftRadius) {
        topLeftRadius = 0.00001;
    }
    if (!topRightRadius) {
        topRightRadius = 0.00001;
    }
    if (!bottomLeftRadius) {
        bottomLeftRadius = 0.00001;
    }
    if (!bottomRightRadius) {
        bottomRightRadius = 0.00001;
    }
    ctx.moveTo(x, y + topLeftRadius);
    ctx.lineTo(x, y + height - topLeftRadius);
    ctx.quadraticCurveTo(x, y + height, x + topLeftRadius, y + height);
    ctx.lineTo(x + width - topRightRadius, y + height);
    ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width,
        y + height - topRightRadius,
    );
    ctx.lineTo(x + width, y + bottomRightRadius);
    ctx.quadraticCurveTo(x + width, y, x + width - bottomRightRadius, y);
    ctx.lineTo(x + bottomLeftRadius, y);
    ctx.quadraticCurveTo(x, y, x, y + bottomLeftRadius);
}

AFRAME.registerComponent<ARoundedComponent>('rounded', {
    el: {} as Entity,
    data: {},
    rounded: null,

    schema: {
        enabled: { default: true },
        width: { type: 'number', default: 1 },
        height: { type: 'number', default: 1 },
        radius: { type: 'number', default: 0.3 },
        topLeftRadius: { type: 'number', default: -1 },
        topRightRadius: { type: 'number', default: -1 },
        bottomLeftRadius: { type: 'number', default: -1 },
        bottomRightRadius: { type: 'number', default: -1 },
        color: { type: 'color', default: '#F0F0F0' },
        opacity: { type: 'number', default: 1 },
    },
    init: function () {
        this.rounded = new THREE.Mesh(
            this.draw(),
            new THREE.MeshPhongMaterial({
                color: new THREE.Color(this.data.color),
                side: THREE.DoubleSide,
            }),
        );
        this.updateOpacity();
        this.el.setObject3D('mesh', this.rounded);
    },
    update: function () {
        if (this.data.enabled) {
            if (this.rounded) {
                this.rounded.visible = true;
                this.rounded.geometry = this.draw();
                // For some reason there is no color in material in THREE types (?)
                AssertType<any>(this.rounded.material).color = new THREE.Color(
                    this.data.color,
                );
                this.updateOpacity();
            }
        } else {
            if (this.rounded) {
                this.rounded.visible = false;
            }
        }
    },
    updateOpacity: function () {
        if (this.rounded) {
            if (this.data.opacity < 0) {
                this.data.opacity = 0;
            }
            if (this.data.opacity > 1) {
                this.data.opacity = 1;
            }
            if (this.data.opacity < 1) {
                AssertType<THREET.Material>(this.rounded.material).transparent =
                    true;
            } else {
                AssertType<THREET.Material>(this.rounded.material).transparent =
                    false;
            }
            AssertType<THREET.Material>(this.rounded.material).opacity =
                this.data.opacity;
        }
    },
    remove: function () {
        if (!this.rounded) {
            return;
        }
        this.el.object3D.remove(this.rounded);
        this.rounded = null;
    },
    draw: function () {
        const roundedRectShape = new THREE.Shape();

        const corners = [
            this.data.radius,
            this.data.radius,
            this.data.radius,
            this.data.radius,
        ];
        if (this.data.topLeftRadius != -1) {
            corners[0] = this.data.topLeftRadius;
        }
        if (this.data.topRightRadius != -1) {
            corners[1] = this.data.topRightRadius;
        }
        if (this.data.bottomLeftRadius != -1) {
            corners[2] = this.data.bottomLeftRadius;
        }
        if (this.data.bottomRightRadius != -1) {
            corners[3] = this.data.bottomRightRadius;
        }

        roundedRect(
            roundedRectShape,
            0,
            0,
            this.data.width,
            this.data.height,
            corners[0],
            corners[1],
            corners[2],
            corners[3],
        );

        return new THREE.ShapeGeometry(roundedRectShape);
    },
});

AFRAME.registerPrimitive('a-rounded', {
    defaultComponents: {
        rounded: {},
    },
    mappings: {
        enabled: 'rounded.enabled',
        width: 'rounded.width',
        height: 'rounded.height',
        radius: 'rounded.radius',
        'top-left-radius': 'rounded.topLeftRadius',
        'top-right-radius': 'rounded.topRightRadius',
        'bottom-left-radius': 'rounded.bottomLeftRadius',
        'bottom-right-radius': 'rounded.bottomRightRadius',
        color: 'rounded.color',
        opacity: 'rounded.opacity',
    },
});
