export function useTransform(object) {
    const props = {
        a: {type: Number, default: 0}
    }
    const emits = ["update"]
    const mounted = (object) => {
        console.log(object)
    }
    return {props, emits, mounted}
}
