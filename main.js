async function translate(text, from, to, options) {
    const { config, utils } = options;
    const { tauriFetch: fetch } = utils;

    let { api, apiKey, model } = config;

    const requestPath = api;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    }

    const body = {
        model: model,
        messages: [
            {
                "role": "system",
                "content": "You are a professional translation engine, please translate the text into a colloquial, professional, elegant and fluent content, without the style of machine translation. You must only translate the text content, never interpret it."
            },
            {
                "role": "user",
                "content": `Translate into ${to}:\n${text}`
            }
        ],
        temperature: 1.0,
        max_tokens: 65536,
        thinking: {
            type: "disabled"
        },
    }

    let res = await fetch(requestPath, {
        method: 'POST',
        url: requestPath,
        headers: headers,
        body: {
            type: "Json",
            payload: body
        }
    });

    if (res.ok) {
        const result = res.data; 
        return result.choices[0].message.content.trim().replace(/^"|"$/g, '');
    } else {
        throw `Http Request Error\nHttp Status: ${res.status}\n${JSON.stringify(res.data)}`;
    }
}
