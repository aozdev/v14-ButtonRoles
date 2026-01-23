const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits
} = require("discord.js");

const config = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Send the button role panel"),

  async execute(interaction) {
    const member = interaction.member;

    if (!member.roles.cache.has(config.setupRole)) {
      return interaction.reply({
        content: "❌ You are not authorized to use this command.",
        ephemeral: true
      });
    }

    const channel = interaction.guild.channels.cache.get(
      config.panelChannel
    );

    if (!channel) {
      return interaction.reply({
        content: "❌ Panel channel not found.",
        ephemeral: true
      });
    }

    const embed = new EmbedBuilder()
      .setTitle(config.panel.title)
      .setDescription(config.panel.description)
      .setColor(config.panel.color);

    const row = new ActionRowBuilder();

    config.panel.buttons.slice(0, 4).forEach((btn, index) => {
      row.addComponents(
        new ButtonBuilder()
          .setCustomId(`role_${btn.roleId}`)
          .setLabel(btn.label)
          .setEmoji(btn.emoji)
          .setStyle(ButtonStyle[btn.style])
      );
    });

    await channel.send({
      embeds: [embed],
      components: [row]
    });

    await interaction.reply({
      content: "✅ Role panel has been sent.",
      ephemeral: true
    });
  }
};
