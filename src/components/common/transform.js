export function useTransform() {
    let object, vueProps, vueEmits
    const props = {
        a: {type: Number, default: 0}
    }
    const emits = ["update"]
    const onStart = (obj, props, emits) => {
        object = obj
        vueProps = props
        vueEmits = emits
        console.log()
    }

    const onMounted = () => {
        console.log(object, vueProps, vueEmits)
        vueEmits("update")
    }
    return {props, emits, onStart}
}

export const transform = {
    props: {a: {type: Number, default: 0}},
    emits: ["update"],
    onStart() {
        console.log(this.emits)
    }
}
