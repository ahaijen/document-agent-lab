# Am I allowed to travel?

Fictional policy for the AI Agent Studio 26C demonstration. This is not Oracle travel policy or a travel-safety assessment. All amounts are in EUR. ARR means estimated annual recurring revenue associated with the customer opportunity; it is not guaranteed revenue.

## Required facts

- Destination city
- Estimated total trip amount in EUR
- Customer meeting: Yes or No
- Estimated opportunity ARR in EUR per year

## Rules, in order

1. If any required fact is missing or invalid, return **NEED_INFO** and identify the fields to correct. The amount must be a finite number greater than zero; ARR must be a finite number at least zero; the meeting flag must be a Boolean. Never invent missing facts.
2. With valid inputs, check all three eligibility rules: destination is **Paris, London or Brussels**; customer meeting is **Yes**; estimated ARR is **at least EUR 50,000**. If any fail, return **NOT_ALLOWED** and list the failed checks. Manager review does not override these rules in this demo.
3. If all eligibility checks pass and estimated cost is **at most EUR 1,500**, return **ALLOWED**.
4. If all eligibility checks pass and estimated cost is **above EUR 1,500**, return **MANAGER_REVIEW**. The workflow must wait for the manager's decision before returning final permission.

## Policy output

Return `decision`, `reason`, `missingFields`, and `failedRules`. The decision is one of `NEED_INFO`, `NOT_ALLOWED`, `ALLOWED`, or `MANAGER_REVIEW`. Lists are empty when there are no matching items.

The Policy node evaluates these rules. A Switch routes the output. Human Approval handles manager review. A Return node gives the user an answer; this demo does not book flights, spend money or create a travel booking.

## Examples

| Destination | Amount | Customer meeting | ARR estimate | Policy decision |
|---|---:|---|---:|---|
| Paris | 1,200 | Yes | 100,000 | ALLOWED |
| Paris | 2,200 | Yes | 100,000 | MANAGER_REVIEW |
| Paris | 1,200 | No | 100,000 | NOT_ALLOWED |
| Paris | 1,200 | Yes | 40,000 | NOT_ALLOWED |
| Rome | 1,200 | Yes | 100,000 | NOT_ALLOWED: outside the fictional allowlist |
| Paris | 1,200 | Yes | Missing | NEED_INFO |
| London | 1,500 | Yes | 50,000 | ALLOWED: both thresholds inclusive |
