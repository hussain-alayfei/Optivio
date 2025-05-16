// Knowledge base with responses for the medical AI assistant

const knowledgeBase = {
  // General condition information
  condition: {
    general: `
# Facial Nerve Palsy

Facial nerve palsy is a condition that affects the facial nerve (cranial nerve VII), resulting in weakness or paralysis of the facial muscles on the affected side. The condition can be either:

* **Bell's palsy** - The most common form, usually temporary and of unknown cause
* **Traumatic facial palsy** - Resulting from injury
* **Infectious causes** - Including Lyme disease, Ramsay Hunt syndrome, or other infections
* **Neoplastic causes** - Resulting from tumors affecting the facial nerve

## Key Symptoms
* Inability to close the eye on the affected side
* Drooping of the corner of the mouth
* Flattened nasolabial fold (the crease between nose and mouth)
* Decreased or absent blinking
* Potential tearing and dry eye problems

## Associated Complications
Without proper management, patients may experience severe dry eye, corneal ulceration, and even permanent vision loss due to the inability to properly blink and close the affected eye.
`,
    blink: `
# Blinking Function in Facial Nerve Palsy

Blinking is critically important for eye health as it:

1. Distributes tears across the eye surface
2. Removes foreign particles
3. Provides momentary rest for eye muscles
4. Moistens and nourishes the cornea

In facial nerve palsy, the affected eye often cannot blink properly or close completely. This condition, called lagophthalmos, can lead to:

* **Exposure keratopathy** - Corneal damage due to dryness
* **Corneal ulceration** - Painful open sores on the cornea
* **Infection** - Due to compromised protective mechanisms
* **Vision loss** - In severe untreated cases

Traditional treatments include artificial tears, lubricating ointments, moisture chambers, eye patches, or even surgical interventions like tarsorrhaphy (partially suturing the eyelids together).
`
  },
  
  // Device information
  device: {
    overview: `
# Optivio Smart Glasses

Optivio smart glasses are a non-surgical, non-invasive medical device designed specifically for patients with facial nerve palsy. The glasses work by detecting blinking in the healthy eye and then triggering muscle stimulation in the affected eye.

## Key Components
* **IR Sensors** - Track the healthy eye's blinking patterns
* **EMG Electrodes** - Deliver mild electrical stimulation to facial muscles
* **Temperature Sensors** - Monitor the skin surface temperature
* **Heart Rate Monitor** - Tracks pulse for overall monitoring
* **Microprocessor** - Analyzes data and controls stimulation parameters
* **Rechargeable Battery** - Provides up to 12 hours of continuous use

The glasses have a modern, discreet design that resembles standard eyewear, helping patients maintain confidence while receiving treatment.
`,
    mechanism: `
# How Optivio Works

The Optivio smart glasses operate through a sophisticated "detect and stimulate" mechanism:

1. **Detection Phase**:
   - Infrared sensors continuously monitor the healthy eye
   - When a blink is detected, the system registers the pattern and timing
   - The processor analyzes the blink characteristics

2. **Processing Phase**:
   - The onboard processor determines appropriate stimulation parameters
   - System checks skin temperature to ensure safe stimulation
   - Pulse data ensures stimulation is appropriate for current physiological state

3. **Stimulation Phase**:
   - EMG electrodes deliver precisely calibrated electrical pulses
   - These pulses stimulate the orbicularis oculi muscle around the affected eye
   - Stimulation intensity automatically adjusts based on muscle response

4. **Feedback Loop**:
   - The system continuously monitors results
   - Parameters are automatically adjusted for optimal effect
   - Data is stored for physician review

This closed-loop system ensures that stimulation remains comfortable and effective throughout the treatment period.
`,
    usage: `
# Using Your Optivio Device

## Daily Usage Protocol

1. **Morning Setup**:
   - Clean the glasses with the provided antimicrobial wipe
   - Apply conductive gel to the EMG electrode points (if needed)
   - Position the glasses on your face, ensuring sensors align with both eyes
   - Press the power button for 2 seconds to turn on

2. **During Use**:
   - The glasses should be worn for at least 4 hours daily
   - You can perform normal activities while wearing the device
   - A gentle vibration indicates when the battery level is below 20%
   - The companion app will show real-time data and battery status

3. **Evening Routine**:
   - Press the power button for 3 seconds to turn off
   - Clean the device with the provided wipes
   - Place in the charging case overnight

## Optimal Results
For best results, use consistently every day. Most patients report noticeable improvement in blinking function after 2-4 weeks of regular use, with continued improvement over 3-6 months.
`
  },
  
  // Treatment information
  treatment: {
    outcomes: `
# Expected Treatment Outcomes

Clinical studies of the Optivio device have demonstrated the following outcomes for patients with facial nerve palsy:

## Short-term Results (1-3 months)
* 85% of patients show measurable improvement in blink symmetry
* Reduction in dry eye symptoms in 78% of patients
* 90% reduction in artificial tear usage
* Significant improvement in quality of life scores

## Long-term Results (6-12 months)
* 65% of patients develop synchronized natural blinking
* 40% show partial recovery of voluntary muscle control
* Reduced need for other interventions like moisture chambers or tarsorrhaphy
* Sustained improvement in corneal health metrics

## Factors Affecting Outcomes
* Time since onset of facial nerve palsy
* Severity of nerve damage
* Consistency of device usage
* Age and overall health of patient
* Concurrent therapies

Your healthcare provider will monitor your progress and may adjust your treatment plan based on your individual response.
`,
    side_effects: `
# Potential Side Effects and Management

## Common Side Effects
* **Mild skin irritation** at electrode sites (15% of patients)
* **Temporary muscle twitching** after extended use (10%)
* **Minor headache** during initial adjustment period (8%)
* **Slight discomfort** when stimulation begins (20%)

## Management Strategies
1. **For skin irritation**:
   - Apply the provided hypoallergenic barrier cream
   - Slightly reposition the device to change contact points
   - Take a 12-hour break if irritation persists

2. **For muscle twitching**:
   - Reduce daily usage time temporarily
   - Use the app to decrease stimulation intensity
   - Ensure proper hydration

3. **For headaches**:
   - Start with shorter periods of use (1-2 hours)
   - Gradually increase usage time over 1-2 weeks
   - Consult your physician if headaches persist

## When to Contact Your Healthcare Provider
* Persistent discomfort lasting more than 3 days
* Increased eye dryness or irritation
* Any vision changes
* Severe skin reaction at electrode sites
* Unusual facial muscle movements

Most side effects are temporary and resolve within the first 2 weeks of treatment.
`,
    comparison: `
# Optivio vs. Surgical Alternatives

## Tarsorrhaphy Comparison

| Factor | Optivio | Tarsorrhaphy |
|--------|---------|--------------|
| Invasiveness | Non-invasive | Surgical procedure |
| Reversibility | Fully reversible | May leave scarring |
| Eye closure | Dynamic, natural blink | Static, partial closure |
| Vision impact | No vision obstruction | Partial vision obstruction |
| Cosmetic effect | Minimal | Noticeable |
| Adjustment | Parameters adjustable | Requires reoperation |
| Maintenance | Regular charging | None |
| Duration | Long-term use possible | Often temporary |

## Gold Weight Implant Comparison

| Factor | Optivio | Gold Weight |
|--------|---------|------------|
| Placement | External | Surgical implant in eyelid |
| Mechanism | Active stimulation | Passive gravity assistance |
| Naturality | Active blinking | Passive drooping |
| Complications | Minimal | Potential migration, extrusion |
| MRI compatibility | Fully compatible | May require removal |
| Cosmetic effect | Glasses only | Potential eyelid bulge |
| Cost over time | Higher initial, lower long-term | Lower initial, higher if revision needed |

Your healthcare provider can help determine which option is best for your specific situation based on the severity and prognosis of your facial nerve palsy.
`
  },
  
  // Insurance and access information
  access: {
    insurance: `
# Insurance Coverage and Access

## Insurance Coverage
Many major insurance providers now cover the Optivio device as a medical necessity for patients with facial nerve palsy, particularly when:

* The condition has persisted for more than 3 months
* There is documented risk to ocular health
* Conservative treatments have failed to provide adequate protection
* The patient wishes to avoid surgical intervention

Currently, insurance approval rates are approximately:
* Medicare: 85% approval
* Medicaid: Varies by state (60-80%)
* Private insurance: 75% approval with prior authorization

## Coverage Requirements
Most insurers require:
1. Diagnosis confirmation from a neurologist or ENT specialist
2. Documentation of dry eye or corneal issues from an ophthalmologist
3. Evidence of failed conservative treatment
4. A prescription specifically for the Optivio device

## Patient Assistance Program
For patients without adequate insurance coverage, Optivio offers:
* Co-pay assistance programs
* Income-based sliding scale pricing
* Monthly payment plans
* Rental options before purchase

## Obtaining the Device
The Optivio device is available through:
1. Specialty medical equipment providers
2. Major academic medical centers
3. Direct from manufacturer with prescription
4. Select neuro-ophthalmology practices

Your healthcare provider can initiate the insurance authorization process and help you navigate coverage options.
`
  }
};

// Function to determine which knowledge base response to return based on user query
export function getAssistantResponse(query: string): string {
  const normalizedQuery = query.toLowerCase();
  
  // Check for condition-related queries
  if (normalizedQuery.includes('what is facial') || 
      normalizedQuery.includes('about facial nerve') ||
      normalizedQuery.includes('condition')) {
    return knowledgeBase.condition.general;
  }
  
  if (normalizedQuery.includes('blink') && 
      (normalizedQuery.includes('function') || normalizedQuery.includes('importance'))) {
    return knowledgeBase.condition.blink;
  }
  
  // Check for device-related queries
  if (normalizedQuery.includes('how do') || 
      normalizedQuery.includes('how does') ||
      normalizedQuery.includes('work')) {
    return knowledgeBase.device.mechanism;
  }
  
  if (normalizedQuery.includes('what is optivio') || 
      normalizedQuery.includes('about optivio') ||
      normalizedQuery.includes('smart glasses')) {
    return knowledgeBase.device.overview;
  }
  
  if (normalizedQuery.includes('use') || 
      normalizedQuery.includes('wearing') ||
      normalizedQuery.includes('how to')) {
    return knowledgeBase.device.usage;
  }
  
  // Check for treatment-related queries
  if (normalizedQuery.includes('outcome') || 
      normalizedQuery.includes('results') ||
      normalizedQuery.includes('efficacy')) {
    return knowledgeBase.treatment.outcomes;
  }
  
  if (normalizedQuery.includes('side effect') || 
      normalizedQuery.includes('adverse') ||
      normalizedQuery.includes('complication')) {
    return knowledgeBase.treatment.side_effects;
  }
  
  if (normalizedQuery.includes('surgery') || 
      normalizedQuery.includes('compare') ||
      normalizedQuery.includes('tarsorrhaphy') ||
      normalizedQuery.includes('gold weight')) {
    return knowledgeBase.treatment.comparison;
  }
  
  // Check for insurance/access queries
  if (normalizedQuery.includes('insurance') || 
      normalizedQuery.includes('cost') ||
      normalizedQuery.includes('coverage') ||
      normalizedQuery.includes('pay')) {
    return knowledgeBase.access.insurance;
  }
  
  // Default response for unrecognized queries
  return `
# I'm here to help

I don't have specific information about "${query}", but I can provide information about:

* Facial nerve palsy condition and symptoms
* How the Optivio smart glasses work
* Treatment protocols and expected outcomes
* Side effects and their management
* Comparison to surgical alternatives
* Insurance coverage and access

Please feel free to ask about any of these topics, and I'll be happy to provide more detailed information.
`;
}