import OpenAI from "openai";

interface Options {
    threadId: string;
    assistanId?: string;
}

export const createRunUseCase = async (openai: OpenAI, options: Options) => {
    const { threadId, assistanId = 'asst_XQtRD13aeyfH8XyK45IX7WKe' } = options;
    const run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: assistanId,
        //instructions: // OJO! Sobre escribe el asistente
    });

    console.log({ run });
    return run;
}