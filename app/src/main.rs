use leptos::*;
use leptos::wasm_bindgen::JsCast;
use leptos::logging::log;

#[component]
fn Home() -> impl IntoView {

    view! {
        <div>
            <h1>hello world </h1>
        </div>
    }
}


fn main() {

    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    let app_element = document
        .query_selector("#app")
        .expect("should be able to query #app")
        .expect("element #app should exist")
        .dyn_into::<web_sys::HtmlElement>()
        .expect("#app should be an HtmlElement");


    mount_to(app_element, || view! { <Home /> })
}