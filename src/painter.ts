import Point from '@mapbox/point-geometry'
import { Zxy } from './tilecache'
import { PaintData } from './view'
import { LabelData } from './labeler'
import { PaintSymbolizer } from './symbolizer'

export interface Rule {
   dataLayer: string
   symbolizer: PaintSymbolizer
   filter?(properties:any): boolean
}

// make this not depend on element?
export function painter(state,key,paint_data:PaintData,label_data:LabelData,rules:Rule[],debug) {
    let start = performance.now()
    let ctx
    if (!state.ctx) {
        ctx = state.element.getContext('2d')
        state.ctx = ctx
    } else {
        ctx = state.ctx
    }
    // the element might not match the coordinate anymore...
    if (state.element && state.element.key != key) {
        return
    }
    ctx.setTransform(state.tile_size/256,0,0,state.tile_size/256,0,0)
    ctx.clearRect(0,0,256,256)
    ctx.miterLimit = 2

    for (var rule of rules) {
        if (rule.minzoom && paint_data.z < rule.minzoom) continue
        if (rule.maxzoom && paint_data.z > rule.maxzoom) continue
        var layer = paint_data.data[rule.dataLayer]
        if (layer === undefined) continue
        rule.symbolizer.before(ctx,paint_data.z)
        for (var feature of layer) {
            var fbox = feature.bbox
            var vbox = paint_data.bbox
            if (fbox[2] < vbox[0] || fbox[0] > vbox[2] || fbox[1] > vbox[3] || fbox[3] < vbox[1]) {
                continue
            }
            if (rule.filter) {
                if (!rule.filter(feature.properties)) continue
            }
            rule.symbolizer.draw(ctx,feature,paint_data.transform)
        }
    }

    let matches = label_data.data.search(label_data.bbox)
    for (var label of matches) {
        label.draw(ctx,label.anchor.clone().mult(label_data.transform.scale).add(label_data.transform.translate))
        if (debug) {
            ctx.lineWidth = 0.5
            ctx.strokeStyle = debug
            ctx.fillStyle = debug
            ctx.globalAlpha = 1
            let tl = new Point(label.minX,label.minY).mult(label_data.transform.scale).add(label_data.transform.translate)
            let br = new Point(label.maxX,label.maxY).mult(label_data.transform.scale).add(label_data.transform.translate)
            let anchor = label.anchor.clone().mult(label_data.transform.scale).add(label_data.transform.translate)
            ctx.strokeRect(tl.x,tl.y,br.x-tl.x,br.y-tl.y)
            ctx.fillRect(anchor.x-2,anchor.y-2,4,4)
        }
    }
    return performance.now() - start
}