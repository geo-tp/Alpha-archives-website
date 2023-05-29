import ui1 from "./assets/ui1.webp";
import ui2 from "./assets/ui2.webp";
import ui3 from "./assets/ui3.webp";
import ui4 from "./assets/ui4.webp";
import ui5 from "./assets/ui5.webp";
import ui6 from "./assets/ui6.webp";
import ui7 from "./assets/ui7.webp";

import charFrame1 from "./assets/charframe1.webp";
import charFrame2 from "./assets/charframe2.webp";
import charFrame3 from "./assets/charframe3.webp";
import raidFrame1 from "./assets/radframe.webp";

import chat1 from "./assets/chat1.webp";
import chat2 from "./assets/chat2.webp";
import chat3 from "./assets/chat3.webp";
import chat4 from "./assets/chat4.webp";

import chat6 from "./assets/chat6.webp";
import chat7 from "./assets/chat7.webp";
import chat8 from "./assets/chat8.webp";
import chat9 from "./assets/chat9.webp";

import druid from "./assets/druid-icon.webp";
import hunter from "./assets/hunter-icon.webp";
import rogue from "./assets/rogue-icon.webp";
import shaman from "./assets/shaman-icon.webp";

export const ScreenshotArticle = () => {
  return (
    <div className="screenshot-article" id="screenshot-identification">
      <h2>Screenshot Identification</h2>
      {/* <p>
        Identifying screenshots is quite easy if you know where to look. Some
        detective work and general knowledge about WoW is needed to be sure.
        That is why I've decided to share my knowledge in this guide. Though
        still not perfect, it allows for efficient screenshot identification at
        a first few glances and I hope it can help more people become involved
        in the Project. The guide consists of step-by-step description of every
        screenshot element that can be used to identify a screenshot and some
        difficult, hand-picked example of the logic used to determine the patch
        of a screenshot.
      </p> */}
      <div className="screenshot-article__methodology">
        <h3>The icon tray</h3>
        <p className="screenshot-article__methodology__description">
          <span>NOTE : </span>The first thing to look is the icon tray located
          on the bottom right side of the UI, next to the bags. Though it cannot
          tell the specific patch of this screenshot, it narrows down the search
          to a particular timeframe right from the start.
        </p>
        <p className="articles-card__versions"></p>
        <div className="screenshot-article__methodology__elements">
          <div className="article-card">
            <h4>a) The Ancient Era</h4>
            <img src={ui1} alt="menu frame for older than 0.5.3 screenshots" />
            <p>
              Screenshots with five, misalligned (with some room in the left)
              icons in the tray have mostly archeological value. They are from
              alpha versions much earlier than 0.5.3 and little (if any) value
              is present in them. These screenshots automatically get the
              "version older than 0-5-3" tag in the archive.
            </p>
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">earlier than 0.5.3</span>
            </p>
          </div>
          <div className="article-card">
            <h4>b) The Green Bug Era</h4>
            <img src={ui2} alt="menu frame for 0.5.3 to 0.5.4 screenshots" />
            <p>
              This is the good stuff. Screenshots with the green bug icon are
              the most valuable for the Alpha Project as they were taken shortly
              before, during or shortly after the 0.5.3 patch. This icon tray
              covers the following patches:
            </p>
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.5.3</span>
              <span className="chip">0.5.4</span>
            </p>
          </div>
          <div className="article-card">
            <h4>c) The Question Mark Era</h4>
            <img src={ui3} alt="menu frame 0.5.5 to 0.6 screenshots" />
            <p>
              With the launch of 0.5.5 the green bug icon was changed to a
              question mark. Though these patches three patches span many
              months, other UI elements give enough information to accurately
              distinguish between them with ease.
            </p>
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.5.5</span>
              <span className="chip">0.6</span>
              <span className="chip">0.7</span>
            </p>
          </div>
          <div className="article-card">
            <h4>d) The Pink Talent Era</h4>
            <img src={ui4} alt="menu frame 0.8 to 0.9 screenshots" />
            <p>
              0.8 Was the start of the new talent tree system (for warriors and
              mages first) that could be accesed with the pink icon between the
              spellbook and the quest log. A word of advice - to my knowledge
              this icon appears when reaching lvl 10, so 0.8 screenshots without
              this icon can happen as the character will be underlvled. This
              tray covers the following patches:
            </p>
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>

              <span className="chip">0.8</span>
              <span className="chip">0.9</span>
            </p>
          </div>
          <div className="article-card">
            <h4>e) The Arrow Talent Era</h4>
            <img src={ui5} alt="menu frame 0.10 to 0.12 screenshots" />
            <p>
              As of 0.10 the designated talent button was changed to the arrow
              talent icon people may recognize from retail versions of WoW. This
              Tray covers the following patches:
            </p>
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>

              <span className="chip">0.10</span>
              <span className="chip">0.11</span>
              <span className="chip">0.12</span>
            </p>
          </div>
          <div className="article-card">
            <h4>x) The doppleganger</h4>
            <img src={ui6} alt="menu frame appears in 0.5.5" />
            <p>
              This tray has two book icons. This was an addon estimating mobs'
              health. The earliest screenshots I have encountered appear in
              0.5.5. What patch it is exacly must be deducted from other parts
              of the screenshot.
            </p>
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.5.5</span>
            </p>{" "}
          </div>

          <div className="article-card">
            <h4>z) The pinkster</h4>
            <img src={ui7} alt="menu frame earlier than 0.5.3" />
            <p>
              The second tray has both the pink talent and the green bug icons.
              It neither means that it's from 0.8-0.9 or 0.5.3-0.5.4 era. It is
              from patches before 0.5.3 and should automatically get "version
              older than 0-5-3" tag.
            </p>
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">earlier than 0.5.3</span>
            </p>
          </div>
        </div>
      </div>
      <div className="screenshot-article__methodology">
        <h3>Character Frames</h3>
        <p className="screenshot-article__methodology__description">
          <span>NOTE : </span>After quickly establishing a timeframe it's time
          to get into the details
        </p>
        <div className="screenshot-article__methodology__elements">
          <div className="article-card">
            <p>If any of the party member's frame shows only the health bar.</p>
            <img src={charFrame2} alt="character frame from 0.12" />
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">earlier than 0.5.3</span>
            </p>
          </div>

          <div className="article-card">
            <p>
              If an alliance/horde symbol is seen next to any party member's
              portrait.
            </p>
            <img src={charFrame3} alt="character frame from 0.7" />
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.7 or later</span>
            </p>
          </div>
          <div className="article-card">
            <p>If party members are in a raid group.</p>
            <img src={raidFrame1} alt="raid group frames" />
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.10 or later</span>
            </p>
          </div>
          <div className="article-card">
            <p>
              If the character has crossed swords instead of a lvl when in
              combat.
            </p>
            <img src={charFrame1} alt="character frame from 0.12" />
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.12 or later</span>
            </p>
          </div>
        </div>
      </div>
      <div className="screenshot-article__methodology">
        <h3> Classes</h3>
        <p className="screenshot-article__methodology__description">
          <span>NOTE : </span>There were cases of Blizzard allowing some gaming
          press sites access to classes, that weren't available yet. Caution is
          required when determining patches from classes alone, especially from
          screenshots with watermarks.
        </p>
        <div className="screenshot-article__methodology__elements">
          <div className="article-card">
            <p>
              {" "}
              <img src={shaman} alt="wow shaman icon" />
              If shamans are present
            </p>
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.5.4 or later</span>
            </p>
          </div>
          <div className="article-card">
            <p>
              {" "}
              <img src={rogue} alt="wow rogue icon" />
              If rogues are present{" "}
            </p>

            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.5.5 or later</span>
            </p>
          </div>
          <div className="article-card">
            <p>
              {" "}
              <img src={druid} alt="wow druid icon" />
              If druids are present
            </p>
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.6 or later</span>
            </p>
          </div>
          <div className="article-card">
            <p>
              {" "}
              <img src={hunter} alt="wow hunter icon" />
              If hunters are present
            </p>
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.9 or later</span>
            </p>
          </div>
        </div>
      </div>
      <div className="screenshot-article__methodology">
        <h3>Level</h3>
        <p className="screenshot-article__methodology__description">
          <span>NOTE : </span>Just like classes, levels of players in the
          screenshots can give clues, as the cap was gradually increased with
          each patch.
        </p>
        <div className="screenshot-article__methodology__elements">
          <div className="article-card">
            <p>Level 25 Cap</p>
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.5.3</span>
            </p>
          </div>
          <div className="article-card">
            <p>Level 30 Cap</p>
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.5.4</span>
            </p>
          </div>
          <div className="article-card">
            <p>Level 30 Cap</p>
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.5.5</span>
            </p>
          </div>
          <div className="article-card">
            <p>Level 39 Cap</p>
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.6</span>
            </p>
          </div>
          <div className="article-card">
            <p>Level 45 Cap</p>
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.7</span>
            </p>
          </div>
          <div className="article-card">
            <p>Level 50 Cap</p>
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.8</span>
            </p>
          </div>
          <div className="article-card">
            <p>Level 55 Cap</p>
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.9</span>
            </p>
          </div>
          <div className="article-card">
            <p>Level 60 Cap</p>
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.10</span>
            </p>
          </div>
        </div>
      </div>
      <div className="screenshot-article__methodology">
        <h3>Chat & Combat Log</h3>
        <p className="screenshot-article__methodology__description">
          <span>NOTE : </span>As I understand it, the first possibility to use
          the advanced chat system (and new item links) were originally a toggle
          function before it became a standard. Therefore there may be some 0.6
          screenshots, where this function hadn't been toggled. From my
          experience this happens for the first 2-3 weeks of 0.6 and shouldn't
          cause much disruption. Other method of veryfing it is being developed
          to make it simpler to recognize.
        </p>
        <p className="screenshot-article__methodology__source">
          <a href="https://github.com/GizzleBizzle">
            {" "}
            Article writted by GizzleBizzle
          </a>
        </p>
        <div className="screenshot-article__methodology__elements">
          <div className="article-card article-card--large">
            <h4>Colorless item links</h4>

            <p>
              These are the colorless old item links. They were present since
              patches not uncovered yet to 0.5.5.
            </p>
            <img src={chat1} alt="chat with colorless items links" />
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.5.3</span>
              <span className="chip">0.5.4</span>
              <span className="chip">0.5.5</span>
            </p>
          </div>
          <div className="article-card article-card">
            <h4>Spirit healer</h4>

            <p>
              There was also an option to retrieve a corpse at a spirit healer
              for a bit of experience loss. It was also introduced in 0.5.5.
            </p>
            <img src={chat8} alt="chat with experience lost" />
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.5.5 and later</span>
            </p>
          </div>
          <div className="article-card article-card--large">
            <h4>Colored item links</h4>

            <p>
              These, colored item links were first introduced in 0.6 as a part
              of "Advanced Chat System".
            </p>
            <img src={chat2} alt="chat with colored items links" />
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.6 and later</span>
            </p>
          </div>
          <div className="article-card">
            <h4>Skillpoints</h4>

            <p>
              It means this screenshot is either from patch 0.6 or onwards.
              Patch 0.6 changed the skillpoint system so that characters could
              earn skillpoints about every ~450 exp.
            </p>
            <img src={chat3} alt="chat with skillpoint gain" />
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.6 and later</span>
            </p>
          </div>
          <div className="article-card">
            <h4>Rested system</h4>

            <p>
              This is the information from the Rested System introduced in 0.6.
              There were 5 levels, each changing the colour of filled experience
              bars : Exhausted, Fatigued, Normal, Rested, Well Rested.
            </p>
            <img src={chat4} alt="chat with rested system" />
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.5.5</span>
              <span className="chip">0.6</span>
              <span className="chip">0.7</span>
            </p>
          </div>
          <div className="article-card article-card--large">
            <h4>Green party members</h4>

            <p>
              Starting with 0.7 a different style of combat logs can be seen
              where all party members' actions can be seen in green.
            </p>
            <img src={chat6} alt="combat log with green party members" />
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.7</span>
            </p>
          </div>
          <div className="article-card article-card--large">
            <h4>Blue party members</h4>

            <p>
              Starting with 0.8 there are also combat logs with different
              colours where party member's actions are seen in blue.
            </p>
            <img src={chat7} alt="combat log with blue party members" />
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.8 and later</span>
            </p>
          </div>
          <div className="article-card article-card">
            <h4>Falling damage</h4>

            <p>
              Falling damage was introduced in 0.5.5 and carries over to all
              subsequent patches until retail launch. Every time falling damage
              is taken, it is registered in the combat log.
            </p>
            <img src={chat9} alt="chat with falling damage" />
            <p className="article-card__versions">
              <span className="chip chip--no-border">Version : </span>
              <span className="chip">0.5.5 and later</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
