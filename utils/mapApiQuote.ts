import { ApiQuote } from '../types/ApiQuote';
import { Quote } from '../types/Quote';

export function mapApiQuote(apiQuote: ApiQuote): Quote {
    return {
        id: apiQuote.id.toString(),
        text: apiQuote.quote,
        author: apiQuote.author,
    };
}